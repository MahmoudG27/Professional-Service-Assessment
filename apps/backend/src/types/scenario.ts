// ===== Answer Types =====
export type AnswerValue = string | number | string[];
export type AssessmentAnswers = Record<string, AnswerValue>;

// ===== Question Types =====
export type QuestionType = "singleChoice" | "multiChoice" | "number" | "text";

export interface QuestionOption {
  value: string;
  label: string;
  driverLabel?: string;
}

export interface QuestionDefinition {
  id: string;
  text: string;
  type: QuestionType;
  options?: QuestionOption[];
  required: boolean;
  helpText?: string;
  criticalForConfidence?: boolean;
}

// ===== Scoring Rules =====
export interface NumericRangeScore {
  min: number;
  max: number;
  points: number;
}

export interface ScoringRule {
  questionId: string;
  values?: Record<string, number>;
  ranges?: NumericRangeScore[];
  multiSelect?: {
    perItem: number;
    maxPoints?: number;
  };
  weightedMultiSelect?: {
    values: Record<string, number>;
    maxPoints?: number;
  };
}

export type ScoringRules = ScoringRule[];

// ===== Condition Engine =====
export type ConditionOperator =
  | "equals"
  | "notEquals"
  | "includes"
  | "containsAny"
  | "containsAll"
  | "contains"
  | "greaterThan"
  | "lessThan"
  | "greaterThanOrEqual"
  | "lessThanOrEqual"
  | "exists";

export interface FindingCondition {
  questionId: string;
  operator: ConditionOperator;
  value: string | number | string[];
}

export type ConditionExpression =
  | FindingCondition
  | { and: ConditionExpression[] }
  | { or: ConditionExpression[] };

// ===== Complexity Range (with dynamic pricing) =====
export type ComplexityLevel =
  | "Low Complexity"
  | "Medium Complexity"
  | "High Complexity"
  | "Enterprise Complexity";

export interface ComplexityRange {
  label: ComplexityLevel;
  min: number;
  max: number;
  mandayMin: number;
  mandayMax: number | null;
  servicePriceMin: number;
  servicePriceMax: number | null;
}

// ===== Pricing Config =====
export interface PricingConfig {
  currency: string;
  note?: string;
}

// ===== Finding Rules =====
export type FindingSeverity = "critical" | "warning" | "info" | "strength";
export type EffortLevel = "low" | "medium" | "high";
export type RecommendationPriority = "critical" | "high" | "medium" | "low";

export interface FindingRule {
  id: string;
  condition: ConditionExpression;
  finding: {
    id: string;
    severity: FindingSeverity;
    title: string;
    description: string;
    businessImpact?: string;
  };
}

// ===== Recommendation Rules =====
export interface RecommendationRule {
  id: string;
  condition: ConditionExpression;
  recommendation: {
    service: string;
    outcome: string;
    whyItFits: string;
    priority: RecommendationPriority;
  };
}

// ===== Prerequisite Rules =====
export interface PrerequisiteRule {
  id: string;
  condition: ConditionExpression;
  prerequisite: {
    title: string;
    description: string;
    effort: EffortLevel;
  };
}

// ===== Deliverables =====
export interface BaseDeliverable {
  title: string;
  description: string;
}

export interface ConditionalDeliverable {
  id: string;
  condition: ConditionExpression;
  deliverable: BaseDeliverable;
}

// ===== Scenario Definition =====
export interface ScenarioDefinition {
  id: string;
  version: string;
  name: string;
  description: string;
  icon: string;
  pricing: PricingConfig;
  questions: QuestionDefinition[];
  scoringRules: ScoringRules;
  complexityRanges: ComplexityRange[];
  findingRules: FindingRule[];
  recommendationRules: RecommendationRule[];
  prerequisiteRules: PrerequisiteRule[];
  baseDeliverables: BaseDeliverable[];
  conditionalDeliverables: ConditionalDeliverable[];
}

// ===== Assessment Result =====
export interface ScenarioAssessmentResult {
  scenarioId: string;
  scenarioVersion: string;
  scenarioName: string;
  answers: AssessmentAnswers;
  complexityScore: number;
  complexityLevel: ComplexityLevel;
  mandayMin: number;
  mandayMax: number | null;
  servicePriceMin: number;
  servicePriceMax: number | null;
  currency: string;
  confidenceScore: number;
  completionRate: number;
  executiveSummary: {
    complexity: ComplexityLevel;
    effort: string;
    priceIndication: string;
    confidence: number;
    keyMessage: string;
  };
  findings: {
    id: string;
    severity: FindingSeverity;
    title: string;
    description: string;
    businessImpact?: string;
  }[];
  recommendations: {
    service: string;
    outcome: string;
    whyItFits: string;
    priority: RecommendationPriority;
  }[];
  prerequisites: {
    title: string;
    description: string;
    effort: EffortLevel;
  }[];
  deliverables: BaseDeliverable[];
}

// ===== Scenario Catalog Entry =====
// Used for the "Choose Service" step — shown BEFORE scenario
// questions are answered.
export interface ScenarioCatalogEntry {
  id: string;
  name: string;
  description: string;
  icon: string;
}