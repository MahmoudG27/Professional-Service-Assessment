import { CompanyProfile } from "../types/companyProfile";
import {
  ScenarioAssessmentResult,
  ComplexityLevel,
  AssessmentAnswers,
} from "../types/scenario";

// ================================================================
// Report Metadata
// ================================================================
export interface ReportMeta {
  reportId: string;
  generatedAt: string;
  scenarioId: string;
  scenarioVersion: string;
  reportVersion: string; // version of THIS report template, independent of scenario
}

// ================================================================
// Professional Services Report
// The single object that drives both the on-screen report and the
// PDF. Combines company profile + common environment answers +
// scenario assessment result.
// ================================================================
export interface ProfessionalServicesReport {
  meta: ReportMeta;

  companyProfile: CompanyProfile;

  // Raw answers — common environment + scenario-specific
  // (also available pre-merged inside scenarioResult.answers)
  commonAnswers: AssessmentAnswers;

  scenarioResult: ScenarioAssessmentResult;

  // ============================================================
  // Top-level convenience fields (mirrors scenarioResult for
  // easy access in PDF/UI templates without deep nesting)
  // ============================================================
  complexity: {
    score: number;
    level: ComplexityLevel;
  };

  effort: {
    mandayMin: number;
    mandayMax: number | null;
    label: string; // e.g. "6–9 Mandays"
  };

  pricing: {
    currency: string;
    min: number;
    max: number | null;
    label: string; // e.g. "$320–$420" or "Starting from $500 (custom quote)"
    note?: string;
  };

  confidence: {
    score: number;       // 50-100
    completionRate: number; // 0-100
  };

  executiveSummary: {
    complexity: ComplexityLevel;
    effort: string;
    priceIndication: string;
    confidence: number;
    keyMessage: string;
  };

  // ============================================================
  // Report Sections (in display order)
  // ============================================================
  keyFindings: ScenarioAssessmentResult["findings"];

  recommendedServices: ScenarioAssessmentResult["recommendations"];

  prerequisites: ScenarioAssessmentResult["prerequisites"];

  whatWeWillDeliver: ScenarioAssessmentResult["deliverables"];

  nextSteps: string[];
}

// ================================================================
// Next Steps Generator (template-based, no AI)
// ================================================================
export function generateNextSteps(report: Pick<
  ProfessionalServicesReport,
  "scenarioResult" | "complexity" | "prerequisites"
>): string[] {
  const steps: string[] = [];

  // Always first: discovery workshop
  steps.push(
    `Schedule a discovery workshop with KlayyTech to validate the ${report.complexity.level.toLowerCase()} assessment and confirm scope.`
  );

  // Prerequisites become early action items
  for (const prereq of report.prerequisites) {
    steps.push(`Complete prerequisite: ${prereq.title} — ${prereq.description}`);
  }

  // Critical findings get explicit call-outs
  const criticalFindings = report.scenarioResult.findings.filter(
    (f: ScenarioAssessmentResult["findings"][number]) => f.severity === "critical"
  );
  for (const finding of criticalFindings.slice(0, 2)) {
    steps.push(`Address critical finding: ${finding.title}.`);
  }

  // Closing step — always last
  steps.push(
    `Review the proposed engagement scope and indicative pricing with the KlayyTech team to confirm the statement of work.`
  );

  return steps;
}

// ================================================================
// Report Builder (pure function — no AI)
// ================================================================
export function buildProfessionalServicesReport(params: {
  reportId: string;
  companyProfile: CompanyProfile;
  commonAnswers: AssessmentAnswers;
  scenarioResult: ScenarioAssessmentResult;
}): ProfessionalServicesReport {
  const { reportId, companyProfile, commonAnswers, scenarioResult } = params;

  const effortLabel = scenarioResult.mandayMax
    ? `${scenarioResult.mandayMin}–${scenarioResult.mandayMax} Mandays`
    : `${scenarioResult.mandayMin}+ Mandays (custom scope)`;

  const priceLabel = scenarioResult.servicePriceMax
    ? `$${scenarioResult.servicePriceMin}–$${scenarioResult.servicePriceMax}`
    : `Starting from $${scenarioResult.servicePriceMin} (custom quote)`;

  const report: ProfessionalServicesReport = {
    meta: {
      reportId,
      generatedAt: new Date().toISOString(),
      scenarioId: scenarioResult.scenarioId,
      scenarioVersion: scenarioResult.scenarioVersion,
      reportVersion: "1.0.0",
    },

    companyProfile,
    commonAnswers,
    scenarioResult,

    complexity: {
      score: scenarioResult.complexityScore,
      level: scenarioResult.complexityLevel,
    },

    effort: {
      mandayMin: scenarioResult.mandayMin,
      mandayMax: scenarioResult.mandayMax,
      label: effortLabel,
    },

    pricing: {
      currency: scenarioResult.currency,
      min: scenarioResult.servicePriceMin,
      max: scenarioResult.servicePriceMax,
      label: priceLabel,
    },

    confidence: {
      score: scenarioResult.confidenceScore,
      completionRate: scenarioResult.completionRate,
    },

    executiveSummary: scenarioResult.executiveSummary,

    keyFindings: scenarioResult.findings,
    recommendedServices: scenarioResult.recommendations,
    prerequisites: scenarioResult.prerequisites,
    whatWeWillDeliver: scenarioResult.deliverables,

    nextSteps: generateNextSteps({
      scenarioResult,
      complexity: {
        score: scenarioResult.complexityScore,
        level: scenarioResult.complexityLevel,
      },
      prerequisites: scenarioResult.prerequisites,
    }),
  };

  return report;
}
