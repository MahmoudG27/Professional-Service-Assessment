import {
  ScenarioDefinition,
  ScenarioAssessmentResult,
  AssessmentAnswers,
  ConditionExpression,
  FindingCondition,
  BaseDeliverable,
  QuestionDefinition,
} from "../types/scenario";

// Shared constant for "no upper bound" complexity ranges
export const ENTERPRISE_MAX = Number.MAX_SAFE_INTEGER;

// ================================================================
// Condition Evaluator
// ================================================================
function evaluateCondition(
  condition: ConditionExpression,
  answers: AssessmentAnswers
): boolean {
  if ("and" in condition) {
    return condition.and.every(c => evaluateCondition(c, answers));
  }
  if ("or" in condition) {
    return condition.or.some(c => evaluateCondition(c, answers));
  }

  const c = condition as FindingCondition;
  const answer = answers[c.questionId];

  // exists operator — check before empty guard
  if (c.operator === "exists") {
    return (
      answer !== undefined &&
      answer !== null &&
      answer !== "" &&
      (!Array.isArray(answer) || answer.length > 0)
    );
  }

  // Empty answer — no match for other operators
  if (answer === undefined || answer === null || answer === "") return false;

  switch (c.operator) {
    case "equals":
      return String(answer) === String(c.value);

    case "notEquals":
      return String(answer) !== String(c.value);

    case "includes":
      return Array.isArray(answer)
        ? answer.includes(c.value as string)
        : String(answer).includes(String(c.value));

    case "containsAny":
      return Array.isArray(answer) && Array.isArray(c.value)
        ? (c.value as string[]).some(v => answer.includes(v))
        : false;

    case "containsAll":
      return Array.isArray(answer) && Array.isArray(c.value)
        ? (c.value as string[]).every(v => answer.includes(v))
        : false;

    case "contains":
      // For multiChoice arrays — check if answer includes the value
      return Array.isArray(answer)
        ? answer.includes(c.value as string)
        : String(answer) === String(c.value);

    case "greaterThan":
      return Number(answer) > Number(c.value);

    case "lessThan":
      return Number(answer) < Number(c.value);

    case "greaterThanOrEqual":
      return Number(answer) >= Number(c.value);

    case "lessThanOrEqual":
      return Number(answer) <= Number(c.value);

    default:
      return false;
  }
}

// ================================================================
// Complexity Score Calculator
// ================================================================
function calculateComplexityScore(
  scenario: ScenarioDefinition,
  answers: AssessmentAnswers
): number {
  let total = 0;

  for (const rule of scenario.scoringRules) {
    const answer = answers[rule.questionId];
    if (answer === undefined || answer === null || answer === "") continue;

    // Multi-select (equal weight per item)
    if (rule.multiSelect) {
      if (!Array.isArray(answer)) continue;
      const raw = answer.length * rule.multiSelect.perItem;
      total += rule.multiSelect.maxPoints
        ? Math.min(raw, rule.multiSelect.maxPoints)
        : raw;
      continue;
    }

    // Weighted multi-select (different weight per option)
    if (rule.weightedMultiSelect) {
      if (!Array.isArray(answer)) continue;
      let raw = 0;
      for (const item of answer) {
        raw += rule.weightedMultiSelect.values[item] ?? 0;
      }
      total += rule.weightedMultiSelect.maxPoints
        ? Math.min(raw, rule.weightedMultiSelect.maxPoints)
        : raw;
      continue;
    }

    // Numeric range
    if (rule.ranges) {
      const num = Number(answer);
      const match = rule.ranges.find(r => num >= r.min && num <= r.max);
      if (match) total += match.points;
      continue;
    }

    // Single-choice lookup
    if (rule.values) {
      total += rule.values[String(answer)] ?? 0;
    }
  }

  return total;
}

// ================================================================
// Confidence & Completion Calculator
// ================================================================
function calculateConfidenceAndCompletion(
  scenario: ScenarioDefinition,
  commonAnswers: AssessmentAnswers,
  scenarioAnswers: AssessmentAnswers,
  commonQuestions: QuestionDefinition[]
): { confidence: number; completionRate: number } {
  const NOT_SURE = ["Not sure", "not-sure", "Prefer not to say"];
  const allAnswers = { ...commonAnswers, ...scenarioAnswers };

  // Confidence and completion must consider BOTH common questions
  // and scenario-specific questions — a "Not Sure" on a common
  // critical question (e.g. backupDR, sensitiveData) matters just
  // as much as one on a scenario question.
  const allQuestions = [...commonQuestions, ...scenario.questions];

  let confidence = 100;
  let answered = 0;
  const total = allQuestions.length;

  for (const question of allQuestions) {
    const answer = allAnswers[question.id];
    const isEmpty = !answer || answer === "" ||
      (Array.isArray(answer) && answer.length === 0);

    if (isEmpty) {
      if (question.required) confidence -= 10;
      continue;
    }

    answered++;

    if (!Array.isArray(answer) && NOT_SURE.includes(String(answer))) {
      confidence -= question.criticalForConfidence ? 15 : 8;
    }
  }

  return {
    confidence: Math.max(50, confidence),
    completionRate: total > 0 ? Math.round((answered / total) * 100) : 100,
  };
}

// ================================================================
// Main Engine
//
// NOTE: findingRules / recommendationRules / prerequisiteRules /
// conditionalDeliverables in a ScenarioDefinition may reference
// EITHER common questions (commonQuestions.ts) OR scenario-specific
// questions — both are merged into `allAnswers` before evaluation.
// ================================================================
export function evaluateScenario(
  scenario: ScenarioDefinition,
  commonAnswers: AssessmentAnswers,
  scenarioAnswers: AssessmentAnswers,
  commonQuestions: QuestionDefinition[] = []
): ScenarioAssessmentResult {
  const allAnswers = { ...commonAnswers, ...scenarioAnswers };

  const complexityScore = calculateComplexityScore(scenario, allAnswers);
  const { confidence, completionRate } = calculateConfidenceAndCompletion(
    scenario, commonAnswers, scenarioAnswers, commonQuestions
  );


  // Find complexity range
  const range =
    scenario.complexityRanges.find(
      r => complexityScore >= r.min && complexityScore <= r.max
    ) ?? scenario.complexityRanges[scenario.complexityRanges.length - 1];

  // Findings — deduplicated by id, sorted by severity
  const findingMap = new Map<string, ScenarioAssessmentResult["findings"][0]>();
  for (const rule of scenario.findingRules) {
    if (evaluateCondition(rule.condition, allAnswers)) {
      findingMap.set(rule.finding.id, rule.finding);
    }
  }
  const severityOrder: Record<string, number> = {
    critical: 0, warning: 1, info: 2, strength: 3
  };
  const findings = Array.from(findingMap.values()).sort(
    (a, b) => (severityOrder[a.severity] ?? 9) - (severityOrder[b.severity] ?? 9)
  );

  // Recommendations — sorted by priority
  const priorityOrder: Record<string, number> = {
    critical: 0, high: 1, medium: 2, low: 3
  };
  const recommendations = scenario.recommendationRules
    .filter(rule => evaluateCondition(rule.condition, allAnswers))
    .map(rule => rule.recommendation)
    .sort((a, b) => (priorityOrder[a.priority] ?? 9) - (priorityOrder[b.priority] ?? 9));

  // Prerequisites
  const prerequisites = scenario.prerequisiteRules
    .filter(rule => evaluateCondition(rule.condition, allAnswers))
    .map(rule => rule.prerequisite);

  // Deliverables — base + conditional, deduplicated by title
  const deliverableMap = new Map<string, BaseDeliverable>();
  for (const d of scenario.baseDeliverables) {
    deliverableMap.set(d.title, d);
  }
  for (const cd of scenario.conditionalDeliverables) {
    if (evaluateCondition(cd.condition, allAnswers)) {
      deliverableMap.set(cd.deliverable.title, cd.deliverable);
    }
  }
  const deliverables = Array.from(deliverableMap.values());

  // Executive Summary — template-generated, no AI needed
  const effortStr = range.mandayMax
    ? `${range.mandayMin}–${range.mandayMax} Mandays`
    : `${range.mandayMin}+ Mandays (custom scope)`;

  const priceStr = range.servicePriceMax
    ? `$${range.servicePriceMin}–$${range.servicePriceMax}`
    : `Starting from $${range.servicePriceMin} (custom quote)`;

  const executiveSummary = {
    complexity: range.label,
    effort: effortStr,
    priceIndication: priceStr,
    confidence,
    keyMessage:
      `Based on the assessment, this ${scenario.name.toLowerCase()} engagement ` +
      `is rated as ${range.label.toLowerCase()}, with an estimated effort of ` +
      `${effortStr} and an indicative professional services cost of ${priceStr}.`,
  };

  return {
    scenarioId: scenario.id,
    scenarioVersion: scenario.version,
    scenarioName: scenario.name,
    answers: allAnswers,
    complexityScore,
    complexityLevel: range.label,
    mandayMin: range.mandayMin,
    mandayMax: range.mandayMax,
    servicePriceMin: range.servicePriceMin,
    servicePriceMax: range.servicePriceMax,
    currency: scenario.pricing.currency,
    confidenceScore: confidence,
    completionRate,
    executiveSummary,
    findings,
    recommendations,
    prerequisites,
    deliverables,
  };
}

export interface ComplexityDriver {
  label: string;
  points: number;
  questionId: string;
}

function getImpactLabel(points: number): string {
  if (points >= 30) return "High Impact";
  if (points >= 15) return "Medium Impact";
  return "Low Impact";
}

export function getTopComplexityDrivers(
  scenario: ScenarioDefinition,
  answers: AssessmentAnswers,
  topN = 5
): ComplexityDriver[] {
  const driverMap = new Map<string, ComplexityDriver>();

  for (const rule of scenario.scoringRules) {
    const answer = answers[rule.questionId];
    if (!answer || answer === "") continue;

    const question = scenario.questions.find(q => q.id === rule.questionId);
    if (!question) continue;

    function addDriver(value: string, points: number) {
      if (points === 0) return;
      const option = question!.options?.find(o => o.value === value);
      const label = option?.driverLabel ?? option?.label;
      if (!label) return;
      const existing = driverMap.get(label);
      if (existing) {
        existing.points += points;
      } else {
        driverMap.set(label, { label, points, questionId: rule.questionId });
      }
    }

    // Single choice
    if (rule.values && !Array.isArray(answer)) {
      const points = rule.values[String(answer)] ?? 0;
      addDriver(String(answer), points);
    }

    // weightedMultiSelect
    if (rule.weightedMultiSelect && Array.isArray(answer)) {
      for (const item of answer) {
        const points = rule.weightedMultiSelect.values[item] ?? 0;
        addDriver(item, points);
      }
    }

    // multiSelect (equal weight)
    if (rule.multiSelect && Array.isArray(answer)) {
      for (const item of answer) {
        addDriver(item, rule.multiSelect.perItem);
      }
    }
  }

  return Array.from(driverMap.values())
    .sort((a, b) => b.points - a.points)
    .slice(0, topN);
}