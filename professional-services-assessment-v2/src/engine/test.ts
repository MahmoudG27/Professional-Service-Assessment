import { evaluateScenario } from "../engine/scenarioEngine";
import { azureMigrationScenario } from "../scenarios/azure-migration";
import { AssessmentAnswers } from "../types/scenario";

// ================================================================
// Test 1 — Low Complexity
// Small company, few servers, simple setup
// ================================================================
const test1Common: AssessmentAnswers = {
  workloadsLocation: "fully-onpremise",
  infrastructureAge: "2-5",
  sensitiveData: "none",
  compliance: "no",
  accessControl: "rbac",
  backupDR: "yes-full",
};

const test1Scenario: AssessmentAnswers = {
  serverCount: "1-5",
  dataSize: "less-1tb",
  locations: "single",
  workloads: ["web-apps"],
  databasePlatform: "sql-server",
  activeDirectory: "yes-full",
  networkConnectivity: "yes",
  downtimeTolerance: "flexible",
  previousCloudExperience: "partial",
  migrationApproach: "phased",
  downtimeCriticality: "low",
};

// ================================================================
// Test 2 — Medium Complexity
// Mid-size, multiple workloads, some challenges
// ================================================================
const test2Common: AssessmentAnswers = {
  workloadsLocation: "fully-onpremise",
  infrastructureAge: "more-5",
  sensitiveData: "pii",
  compliance: "yes",
  accessControl: "passwords",
  backupDR: "partial",
};

const test2Scenario: AssessmentAnswers = {
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

// ================================================================
// Test 3 — High Complexity
// Large environment, zero downtime, Oracle
// ================================================================
const test3Common: AssessmentAnswers = {
  workloadsLocation: "fully-onpremise",
  infrastructureAge: "more-5",
  sensitiveData: "financial",
  compliance: "yes",
  accessControl: "none",
  backupDR: "no",
};

const test3Scenario: AssessmentAnswers = {
  serverCount: "21-50",
  dataSize: "5-20tb",
  locations: "2-5",
  workloads: ["web-apps", "databases", "erp-crm", "custom-apps", "file-servers"],
  databasePlatform: "oracle",
  activeDirectory: "partial",
  networkConnectivity: "no",
  downtimeTolerance: "zero",
  previousCloudExperience: "first",
  migrationApproach: "phased",
  downtimeCriticality: "mission-critical",
};

// ================================================================
// Test 4 — Enterprise Complexity
// 50+ servers, Oracle, multi-site, zero downtime, health data
// ================================================================
const test4Common: AssessmentAnswers = {
  workloadsLocation: "fully-onpremise",
  infrastructureAge: "more-5",
  sensitiveData: "health",
  compliance: "yes",
  accessControl: "none",
  backupDR: "no",
};

const test4Scenario: AssessmentAnswers = {
  serverCount: "50+",
  dataSize: "20tb+",
  locations: "5+",
  workloads: ["web-apps", "databases", "erp-crm", "custom-apps", "file-servers", "email"],
  databasePlatform: "oracle",
  activeDirectory: "no",
  networkConnectivity: "no",
  downtimeTolerance: "zero",
  previousCloudExperience: "first",
  migrationApproach: "not-sure",
  downtimeCriticality: "mission-critical",
};

// ================================================================
// Test 5 — Medium, already has cloud
// ================================================================
const test5Common: AssessmentAnswers = {
  workloadsLocation: "hybrid",
  infrastructureAge: "2-5",
  sensitiveData: "pii",
  compliance: "no",
  accessControl: "rbac",
  backupDR: "yes-full",
};

const test5Scenario: AssessmentAnswers = {
  serverCount: "6-20",
  dataSize: "1-5tb",
  locations: "single",
  workloads: ["web-apps", "databases"],
  databasePlatform: "mysql-pg",
  activeDirectory: "yes-full",
  networkConnectivity: "yes",
  downtimeTolerance: "weekend",
  previousCloudExperience: "yes-cloud",
  migrationApproach: "cutover",
  downtimeCriticality: "moderate",
};

// ================================================================
// Run Tests
// ================================================================
function runTest(name: string, common: AssessmentAnswers, scenario: AssessmentAnswers) {
  const result = evaluateScenario(azureMigrationScenario, common, scenario,);
  console.log(`\n${"=".repeat(60)}`);
  console.log(`TEST: ${name}`);
  console.log("=".repeat(60));
  console.log(`Complexity Score : ${result.complexityScore}`);
  console.log(`Complexity Level : ${result.complexityLevel}`);
  console.log(`Mandays          : ${result.mandayMin}–${result.mandayMax ?? "Custom"}`);
  console.log(`Price            : $${result.servicePriceMin}–${result.servicePriceMax ? "$" + result.servicePriceMax : "Custom Quote"}`);
  console.log(`Confidence       : ${result.confidenceScore}%`);
  console.log(`Completion Rate  : ${result.completionRate}%`);
  console.log(`\nExecutive Summary:`);
  console.log(`  ${result.executiveSummary.keyMessage}`);
  console.log(`\nFindings (${result.findings.length}):`);
  result.findings.forEach(f => console.log(`  [${f.severity.toUpperCase()}] ${f.title}`));
  console.log(`\nRecommendations (${result.recommendations.length}):`);
  result.recommendations.forEach(r => console.log(`  [${r.priority.toUpperCase()}] ${r.service}`));
  console.log(`\nPrerequisites (${result.prerequisites.length}):`);
  result.prerequisites.forEach(p => console.log(`  [${p.effort.toUpperCase()}] ${p.title}`));
  console.log(`\nDeliverables (${result.deliverables.length}):`);
  result.deliverables.forEach(d => console.log(`  - ${d.title}`));
}

runTest("1 — Low Complexity",        test1Common, test1Scenario);
runTest("2 — Medium Complexity",     test2Common, test2Scenario);
runTest("3 — High Complexity",       test3Common, test3Scenario);
runTest("4 — Enterprise Complexity", test4Common, test4Scenario);
runTest("5 — Medium (has cloud)",    test5Common, test5Scenario);

// ================================================================
// Test 6 — All "Not Sure" answers
// Confidence should floor at 50%
// ================================================================
const test6Common: AssessmentAnswers = {
  workloadsLocation: "fully-onpremise",
  infrastructureAge: "not-sure",
  sensitiveData: "none",
  compliance: "not-sure",
  accessControl: "rbac",
  backupDR: "not-sure",
};

const test6Scenario: AssessmentAnswers = {
  serverCount: "6-20",
  dataSize: "not-sure",
  locations: "single",
  workloads: ["web-apps"],
  databasePlatform: "none",
  activeDirectory: "yes-full",
  networkConnectivity: "not-sure",
  downtimeTolerance: "not-sure",
  previousCloudExperience: "not-sure",
  migrationApproach: "not-sure",
  downtimeCriticality: "moderate",
};

// ================================================================
// Test 7 — Multi-select cap test
// 10 workloads × 8 = 80 → should be capped at 40
// ================================================================
const test7Common: AssessmentAnswers = {
  workloadsLocation: "fully-onpremise",
  infrastructureAge: "2-5",
  sensitiveData: "none",
  compliance: "no",
  accessControl: "rbac",
  backupDR: "yes-full",
};

const test7Scenario: AssessmentAnswers = {
  serverCount: "1-5",
  dataSize: "less-1tb",
  locations: "single",
  // 6 workloads × 8 = 48 → capped at 40
  workloads: ["web-apps", "databases", "file-servers", "email", "erp-crm", "custom-apps"],
  databasePlatform: "none",
  activeDirectory: "yes-full",
  networkConnectivity: "yes",
  downtimeTolerance: "flexible",
  previousCloudExperience: "partial",
  migrationApproach: "phased",
  downtimeCriticality: "low",
};

runTest("6 — All Not Sure (confidence floor)", test6Common, test6Scenario);
runTest("7 — Multi-select cap (max 40)",       test7Common, test7Scenario);

// ================================================================
// Verify caps explicitly
// ================================================================
console.log("\n" + "=".repeat(60));
console.log("VERIFICATION");
console.log("=".repeat(60));

const r6 = evaluateScenario(azureMigrationScenario, test6Common, test6Scenario);
console.log(`Test 6 confidence = ${r6.confidenceScore} (expected ≥ 50)`);
console.assert(r6.confidenceScore >= 50, "FAIL: confidence below floor");

const r7 = evaluateScenario(azureMigrationScenario, test7Common, test7Scenario);
const workloadRule = azureMigrationScenario.scoringRules.find(r => r.questionId === "workloads");
const workloadScore = Math.min(
  (test7Scenario.workloads as string[]).length * (workloadRule?.multiSelect?.perItem ?? 0),
  workloadRule?.multiSelect?.maxPoints ?? 999
);
console.log(`Test 7 workload score = ${workloadScore} (expected 40)`);
console.assert(workloadScore === 40, "FAIL: cap not applied");
console.log("All verifications passed ✅");
