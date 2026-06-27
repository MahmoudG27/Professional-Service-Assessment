import { azureMigrationScenario } from "./azure-migration";
import { modernizationScenario } from "./modernization";
import { disasterRecoveryScenario } from "./disaster-recovery";
import { securityAssessmentScenario } from "./security-assessment";
import { subscriptionOptimizationScenario } from "./subscription-optimization";
import { subscriptionMigrationScenario } from "./subscription-migration";
// ================================================================
// All Scenario Definitions — keyed by id
// ================================================================
export const scenarioRegistry = {
    [azureMigrationScenario.id]: azureMigrationScenario,
    [modernizationScenario.id]: modernizationScenario,
    [disasterRecoveryScenario.id]: disasterRecoveryScenario,
    [securityAssessmentScenario.id]: securityAssessmentScenario,
    [subscriptionOptimizationScenario.id]: subscriptionOptimizationScenario,
    [subscriptionMigrationScenario.id]: subscriptionMigrationScenario,
};
// ================================================================
// Catalog for "Choose Service" step (Step 2)
// Lightweight — only what's needed for selection UI
// ================================================================
export const scenarioCatalog = Object.values(scenarioRegistry).map((s) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    icon: s.icon,
}));
// ================================================================
// Helper — get full scenario definition by id
// ================================================================
export function getScenarioById(id) {
    return scenarioRegistry[id];
}
