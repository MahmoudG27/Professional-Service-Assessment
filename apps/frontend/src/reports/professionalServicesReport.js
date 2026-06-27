// ================================================================
// Next Steps Generator (template-based, no AI)
// ================================================================
export function generateNextSteps(report) {
    const steps = [];
    // Always first: discovery workshop
    steps.push(`Schedule a discovery workshop with KlayyTech to validate the ${report.complexity.level.toLowerCase()} assessment and confirm scope.`);
    // Prerequisites become early action items
    for (const prereq of report.prerequisites) {
        steps.push(`Complete prerequisite: ${prereq.title} — ${prereq.description}`);
    }
    // Critical findings get explicit call-outs
    const criticalFindings = report.scenarioResult.findings.filter((f) => f.severity === "critical");
    for (const finding of criticalFindings.slice(0, 2)) {
        steps.push(`Address critical finding: ${finding.title}.`);
    }
    // Closing step — always last
    steps.push(`Review the proposed engagement scope and indicative pricing with the KlayyTech team to confirm the statement of work.`);
    return steps;
}
// ================================================================
// Report Builder (pure function — no AI)
// ================================================================
export function buildProfessionalServicesReport(params) {
    const { reportId, companyProfile, commonAnswers, scenarioResult } = params;
    const effortLabel = scenarioResult.mandayMax
        ? `${scenarioResult.mandayMin}–${scenarioResult.mandayMax} Mandays`
        : `${scenarioResult.mandayMin}+ Mandays (custom scope)`;
    const priceLabel = scenarioResult.servicePriceMax
        ? `$${scenarioResult.servicePriceMin}–$${scenarioResult.servicePriceMax}`
        : `Starting from $${scenarioResult.servicePriceMin} (custom quote)`;
    const report = {
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
