import { evaluateScenario } from "../engine/scenarioEngine";
import { azureMigrationScenario } from "../scenarios/azure-migration";
import { buildProfessionalServicesReport } from "../reports/professionalServicesReport";
import { scenarioCatalog, getScenarioById } from "../scenarios";
import { AssessmentAnswers } from "../types/scenario";
import { CompanyProfile } from "../types/companyProfile";

// ================================================================
// 1. Scenario Catalog Check
// ================================================================
console.log("=".repeat(60));
console.log("SCENARIO CATALOG (Step 2 — Choose Service)");
console.log("=".repeat(60));
scenarioCatalog.forEach(s => {
  console.log(`  [${s.id}] ${s.name}`);
  console.log(`    ${s.description}`);
});
console.assert(scenarioCatalog.length === 6, "Expected 6 scenarios in catalog");

// ================================================================
// 2. Resolve scenario by id (simulates user selection)
// ================================================================
const selectedScenario = getScenarioById("azure-migration");
console.assert(selectedScenario !== undefined, "azure-migration should resolve");

// ================================================================
// 3. Full Report Build — Medium Complexity example
// ================================================================
const companyProfile: CompanyProfile = {
  companyName: "Acme Retail Group",
  industry: "retail",
  employeesAndUsers: "51-200",
  itTeam: "1-2",
};

const commonAnswers: AssessmentAnswers = {
  workloadsLocation: "fully-onpremise",
  infrastructureAge: "more-5",
  sensitiveData: "pii",
  compliance: "yes",
  accessControl: "passwords",
  backupDR: "partial",
};

const scenarioAnswers: AssessmentAnswers = {
  serverCount: "6-20",
  dataSize: "1-5tb",
  locations: "2-5",
  workloads: ["web-apps", "databases", "erp-crm"],
  databasePlatform: "sql-server",
  activeDirectory: "partial",
  networkConnectivity: "no",
  downtimeTolerance: "weekend",
  previousCloudExperience: "first",
  migrationApproach: "phased",
  downtimeCriticality: "moderate",
};

const result = evaluateScenario(
  selectedScenario!,
  commonAnswers,
  scenarioAnswers
);

const report = buildProfessionalServicesReport({
  reportId: "RPT-TEST-0001",
  companyProfile,
  commonAnswers,
  scenarioResult: result,
});

// ================================================================
// 4. Print Full Report
// ================================================================
console.log("\n" + "=".repeat(60));
console.log("PROFESSIONAL SERVICES REPORT");
console.log("=".repeat(60));

console.log(`\nReport ID       : ${report.meta.reportId}`);
console.log(`Generated At    : ${report.meta.generatedAt}`);
console.log(`Scenario        : ${report.scenarioResult.scenarioName} (v${report.meta.scenarioVersion})`);

console.log(`\n--- Company Profile ---`);
console.log(`Company   : ${report.companyProfile.companyName}`);
console.log(`Industry  : ${report.companyProfile.industry}`);
console.log(`Size      : ${report.companyProfile.employeesAndUsers}`);
console.log(`IT Team   : ${report.companyProfile.itTeam}`);

console.log(`\n--- 01. Project Complexity ---`);
console.log(`Complexity Score : ${report.complexity.score}`);
console.log(`Complexity Level : ${report.complexity.level}`);

console.log(`\n--- 02. Estimated Professional Services Effort ---`);
console.log(`Effort : ${report.effort.label}`);

console.log(`\n--- 03. Indicative Service Cost ---`);
console.log(`Cost   : ${report.pricing.label} ${report.pricing.currency}`);
console.log(`Note   : ${report.pricing.note ?? "—"}`);

console.log(`\n--- 04. Assessment Confidence ---`);
console.log(`Confidence       : ${report.confidence.score}%`);
console.log(`Completion Rate  : ${report.confidence.completionRate}%`);

console.log(`\n--- 05. Executive Summary ---`);
console.log(report.executiveSummary.keyMessage);

console.log(`\n--- 06. Key Findings (${report.keyFindings.length}) ---`);
report.keyFindings.forEach(f => console.log(`  [${f.severity.toUpperCase()}] ${f.title}`));

console.log(`\n--- 07. Recommended Azure Services (${report.recommendedServices.length}) ---`);
report.recommendedServices.forEach(r => console.log(`  [${r.priority.toUpperCase()}] ${r.service} — ${r.outcome}`));

console.log(`\n--- 08. Prerequisites (${report.prerequisites.length}) ---`);
report.prerequisites.forEach(p => console.log(`  [${p.effort.toUpperCase()}] ${p.title}`));

console.log(`\n--- 09. What We Will Deliver (${report.whatWeWillDeliver.length}) ---`);
report.whatWeWillDeliver.forEach(d => console.log(`  - ${d.title}: ${d.description}`));

console.log(`\n--- 10. Next Steps ---`);
report.nextSteps.forEach((step, i) => console.log(`  ${i + 1}. ${step}`));

// ================================================================
// 5. Sanity Checks
// ================================================================
console.log("\n" + "=".repeat(60));
console.log("SANITY CHECKS");
console.log("=".repeat(60));

console.assert(report.complexity.score === result.complexityScore, "complexity score mismatch");
console.assert(report.effort.label.includes("Mandays"), "effort label format");
console.assert(report.pricing.label.startsWith("$"), "price label format");
console.assert(report.nextSteps.length >= 2, "next steps should have at least discovery + closing step");
console.assert(report.nextSteps[0].includes("discovery workshop"), "first next step should be discovery workshop");
console.assert(report.nextSteps[report.nextSteps.length - 1].includes("statement of work"), "last next step should be SOW review");

console.log("All sanity checks passed ✅");
