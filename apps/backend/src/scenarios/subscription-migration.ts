import { ScenarioDefinition } from "../types/scenario";
import { ENTERPRISE_MAX } from "../engine/scenarioEngine";

export const subscriptionMigrationScenario: ScenarioDefinition = {
  id: "subscription-migration",
  version: "1.0.0",
  name: "Subscription Migration",
  description: "Move resources between Azure subscriptions or tenants.",
  icon: "shuffle",
  pricing: {
    currency: "USD",
    note: "Indicative only — final pricing subject to discovery workshop",
  },

  questions: [
    {
      id: "migrationReason",
      text: "Why are you migrating to a new subscription?",
      type: "singleChoice",
      required: true,
      options: [
        { value: "restructuring",   label: "Company restructuring / acquisition" },
        { value: "billing",         label: "Billing consolidation" },
        { value: "csp-to-ea",       label: "Moving from CSP to direct / EA" },
        { value: "separating-envs", label: "Separating environments (dev/prod)" },
        { value: "other",           label: "Other" },
      ],
    },
    {
      id: "crossTenant",
      text: "Is this migration across Azure tenants?",
      type: "singleChoice",
      required: true,
      criticalForConfidence: true,
      options: [
        { value: "yes",    label: "Yes",                    driverLabel: "Cross-Tenant Migration" },
        { value: "no",       label: "No" },
        { value: "not-sure", label: "Not sure" },
      ],
    },
    {
      id: "resourcesToMigrate",
      text: "What resources need to be migrated? (select all that apply)",
      type: "multiChoice",
      required: true,
      helpText: "Select every resource type that applies — overall scale is captured separately in the next question.",
      options: [
        { value: "vms",       label: "Virtual Machines" },
        { value: "databases", label: "Databases" },
        { value: "storage",   label: "Storage accounts" },
        { value: "app-services", label: "App Services" },
        { value: "networking", label: "Networking (VNets, NSGs)" },
      ],
    },
    {
      id: "resourceCountMigration",
      text: "What is the estimated number of resources to migrate?",
      type: "singleChoice",
      required: true,
      criticalForConfidence: true,
      options: [
        { value: "less-20", label: "Less than 20 resources" },
        { value: "20-100",  label: "20–100 resources" },
        { value: "100+",   label: "More than 100 resources", driverLabel: "100+ Resources to Migrate" },
      ],
    },
    {
      id: "dependencies",
      text: "Do you have dependencies between resources?",
      type: "singleChoice",
      required: true,
      options: [
        { value: "complex", label: "Yes, complex dependencies", driverLabel: "Complex Resource Dependencies" },
        { value: "some",        label: "Some dependencies" },
        { value: "independent", label: "Mostly independent resources" },
      ],
    },
    {
      id: "downtimeToleranceMigration",
      text: "Do you require zero downtime during migration?",
      type: "singleChoice",
      required: true,
      options: [
        { value: "zero",     label: "Yes, business-critical systems" },
        { value: "window",   label: "Short maintenance window acceptable" },
        { value: "flexible", label: "Flexible" },
      ],
    },
    {
      id: "azurePolicyRBAC",
      text: "Do you use Azure Policy or RBAC configurations that need to be replicated?",
      type: "singleChoice",
      required: false,
      options: [
        { value: "extensive", label: "Yes, extensive policies" },
        { value: "basic",     label: "Basic RBAC only" },
        { value: "none",      label: "None" },
      ],
    },
    {
      id: "customDomains",
      text: "Do you have custom domain names or SSL certificates to migrate?",
      type: "singleChoice",
      required: false,
      options: [
        { value: "yes", label: "Yes" },
        { value: "no",  label: "No" },
      ],
    },
    {
      id: "targetTimelineMigration",
      text: "What is your target completion timeline?",
      type: "singleChoice",
      required: false,
      options: [
        { value: "less-1week", label: "Less than 1 week" },
        { value: "1-4weeks",   label: "1–4 weeks" },
        { value: "1-3months",  label: "1–3 months" },
      ],
    },
    {
      id: "unsupportedResources",
      text: "Do you have resources that cannot be moved directly and require redeployment?",
      type: "singleChoice",
      required: true,
      options: [
        { value: "yes",    label: "Yes",                    driverLabel: "Resources Requiring Redeployment" },
        { value: "no",       label: "No" },
        { value: "not-sure", label: "Not sure" },
      ],
    },
    {
      id: "sourceSubscriptionActive",
      text: "Will the source subscription remain active after migration?",
      type: "singleChoice",
      required: true,
      options: [
        { value: "yes",      label: "Yes" },
        { value: "no",       label: "No" },
        { value: "not-sure", label: "Not sure" },
      ],
    },
  ],

  scoringRules: [
    {
      questionId: "crossTenant",
      values: { "yes": 30, "no": 5, "not-sure": 15 },
    },
    {
      questionId: "resourcesToMigrate",
      multiSelect: { perItem: 4, maxPoints: 20 },
    },
    {
      questionId: "resourceCountMigration",
      values: { "less-20": 5, "20-100": 15, "100+": 30 },
    },
    {
      questionId: "dependencies",
      values: { "complex": 30, "some": 15, "independent": 5 },
    },
    {
      questionId: "downtimeToleranceMigration",
      values: { "zero": 25, "window": 10, "flexible": 0 },
    },
    {
      questionId: "azurePolicyRBAC",
      values: { "extensive": 20, "basic": 8, "none": 0 },
    },
    {
      questionId: "customDomains",
      values: { "yes": 10, "no": 0 },
    },
    { 
      questionId: "unsupportedResources",
      values: { "yes": 20, "no": 0, "not-sure": 10 }
    },
    { 
      questionId: "sourceSubscriptionActive",
      values: { "yes": 5, "no": 0, "not-sure": 2 }
    },

    {
      questionId: "migrationReason",
      values: {
        "restructuring": 8,
        "billing": 2,
        "csp-to-ea": 5,
        "separating-envs": 4,
        "other": 4,
      },
    },
    {
      questionId: "targetTimelineMigration",
      values: { "less-1week": 20, "1-4weeks": 10, "1-3months": 0 },
    },
  ],

  complexityRanges: [
    {
      label: "Low Complexity",
      min: 0, max: 60,
      mandayMin: 1, mandayMax: 3,
      servicePriceMin: 100, servicePriceMax: 180,
    },
    {
      label: "Medium Complexity",
      min: 61, max: 120,
      mandayMin: 4, mandayMax: 6,
      servicePriceMin: 180, servicePriceMax: 260,
    },
    {
      label: "High Complexity",
      min: 121, max: 180,
      mandayMin: 7, mandayMax: 9,
      servicePriceMin: 260, servicePriceMax: 350,
    },
    {
      label: "Enterprise Complexity",
      min: 181, max: ENTERPRISE_MAX,
      mandayMin: 10, mandayMax: null,
      servicePriceMin: 350, servicePriceMax: null,
    },
  ],

  findingRules: [
    {
      id: "cross-tenant-migration",
      condition: { questionId: "crossTenant", operator: "equals", value: "yes" },
      finding: {
        id: "cross-tenant-migration",
        severity: "critical",
        title: "Cross-Tenant Migration",
        description: "Migrating across Azure tenants requires resource recreation in many cases (resources cannot simply move tenants) — significantly increases effort.",
        businessImpact: "Cross-tenant migrations often require redeployment rather than move operations, extending timeline and risk.",
      },
    },
    {
      id: "cross-tenant-unclear",
      condition: { questionId: "crossTenant", operator: "equals", value: "not-sure" },
      finding: {
        id: "cross-tenant-unclear",
        severity: "warning",
        title: "Tenant Scope Unclear",
        description: "Whether this is a cross-tenant migration must be clarified early — it fundamentally changes the migration approach.",
        businessImpact: "Cross-tenant vs. same-tenant migrations use entirely different tooling and effort levels.",
      },
    },
    {
      id: "complex-dependencies",
      condition: { questionId: "dependencies", operator: "equals", value: "complex" },
      finding: {
        id: "complex-dependencies",
        severity: "warning",
        title: "Complex Resource Dependencies",
        description: "Complex inter-resource dependencies require careful migration sequencing to avoid breaking connectivity or access.",
        businessImpact: "Incorrect sequencing can cause extended outages for dependent systems.",
      },
    },
    {
      id: "databases-in-scope",
      condition: { questionId: "resourcesToMigrate", operator: "includes", value: "databases" },
      finding: {
        id: "databases-in-scope",
        severity: "info",
        title: "Databases In Migration Scope",
        description: "Database migration requires connection string updates, firewall rule recreation, and a brief failover window even within the same tenant.",
      },
    },
    {
      id: "zero-downtime-migration",
      condition: { questionId: "downtimeToleranceMigration", operator: "equals", value: "zero" },
      finding: {
        id: "zero-downtime-migration",
        severity: "critical",
        title: "Zero Downtime Required",
        description: "Zero-downtime subscription migration requires parallel environment setup and traffic cutover strategy (e.g. Traffic Manager / DNS).",
        businessImpact: "Higher effort to design and test a no-downtime cutover approach.",
      },
    },
    {
      id: "large-resource-count-migration",
      condition: { questionId: "resourceCountMigration", operator: "equals", value: "100+" },
      finding: {
        id: "large-resource-count-migration",
        severity: "warning",
        title: "Large Number of Resources to Migrate",
        description: "Migrating 100+ resources requires scripted/automated migration (e.g. Azure Resource Mover, ARM templates) rather than manual moves.",
      },
    },
    {
      id: "extensive-rbac",
      condition: { questionId: "azurePolicyRBAC", operator: "equals", value: "extensive" },
      finding: {
        id: "extensive-rbac",
        severity: "warning",
        title: "Extensive Policy/RBAC to Replicate",
        description: "Existing Azure Policy assignments and RBAC roles must be documented and recreated in the target subscription/tenant.",
      },
    },
    {
      id: "custom-domains-present",
      condition: { questionId: "customDomains", operator: "equals", value: "yes" },
      finding: {
        id: "custom-domains-present",
        severity: "info",
        title: "Custom Domains and SSL Certificates",
        description: "Custom domains and SSL certificates require DNS cutover planning and certificate reissuance/binding in the target environment.",
      },
    },
    {
      id: "tight-timeline",
      condition: { questionId: "targetTimelineMigration", operator: "equals", value: "less-1week" },
      finding: {
        id: "tight-timeline",
        severity: "warning",
        title: "Tight Migration Timeline",
        description: "A sub-1-week timeline significantly limits options for phased migration and thorough testing.",
        businessImpact: "Increased risk of issues post-migration due to compressed testing window.",
      },
    },
    {
      id: "unsupported-resources",
      condition: { questionId: "unsupportedResources", operator: "equals", value: "yes" },
      finding: {
        id: "unsupported-resources",
        severity: "critical",
        title: "Resources Requiring Redeployment Detected",
        description: "Some resources cannot be moved directly — they must be redeployed in the target subscription, which requires careful planning and may cause downtime.",
        businessImpact: "Redeployment increases migration time and risk compared to a direct move.",
      },
    },
    {
      id: "unsupported-resources-unclear",
      condition: { questionId: "unsupportedResources", operator: "equals", value: "not-sure" },
      finding: {
        id: "unsupported-resources-unclear",
        severity: "warning",
        title: "Resource Compatibility Unknown",
        description: "A resource inventory check is needed to identify any resources that cannot be moved directly via Azure Resource Mover.",
      },
    },
    {
      id: "direct-move-eligible",
      condition: {
        and: [
          { questionId: "crossTenant", operator: "equals", value: "no" },
          { questionId: "unsupportedResources", operator: "equals", value: "no" },
          { questionId: "dependencies", operator: "equals", value: "independent" },
        ],
      },
      finding: {
        id: "direct-move-eligible",
        severity: "strength",
        title: "Direct Move Eligible",
        description:
          "Same-tenant migration with independent resources and no redeployment blockers — Azure Resource Mover can handle most of this migration directly.",
        businessImpact:
          "Reduces migration complexity, minimizes downtime risk, and avoids costly resource redeployment activities.",
      },
    },
    {
      id: "source-subscription-active",
      condition: { questionId: "sourceSubscriptionActive", operator: "equals", value: "yes" },
      finding: {
        id: "source-subscription-active",
        severity: "info",
        title: "Source Subscription Will Remain Active",
        description: "Running both subscriptions in parallel requires careful DNS/traffic cutover planning and temporary dual-management overhead.",
      },
    },
  ],

  recommendationRules: [
    {
      id: "resource-mover",
      condition: { questionId: "crossTenant", operator: "equals", value: "no" },
      recommendation: {
        service: "Azure Resource Mover",
        outcome: "Orchestrated move of resources between subscriptions within the same tenant, with dependency validation.",
        whyItFits: "Native Azure tooling for same-tenant subscription migrations — handles most common resource types.",
        priority: "critical",
      },
    },
    {
      id: "arm-templates",
      condition: { questionId: "crossTenant", operator: "equals", value: "yes" },
      recommendation: {
        service: "ARM Templates / Bicep — Redeployment",
        outcome: "Infrastructure-as-code redeployment of resources into the target tenant.",
        whyItFits: "Cross-tenant migrations typically require recreating resources via IaC rather than moving them directly.",
        priority: "critical",
      },
    },
    {
      id: "azure-migrate-resource-mover",
      condition: { questionId: "resourceCountMigration", operator: "equals", value: "100+" },
      recommendation: {
        service: "Azure Migrate (Resource Discovery)",
        outcome: "Automated discovery and dependency mapping for large-scale resource migrations.",
        whyItFits: "At 100+ resources, manual dependency mapping is impractical — Azure Migrate automates discovery.",
        priority: "high",
      },
    },
    {
      id: "traffic-manager",
      condition: { questionId: "downtimeToleranceMigration", operator: "equals", value: "zero" },
      recommendation: {
        service: "Azure Traffic Manager / Front Door",
        outcome: "Traffic routing layer enabling gradual cutover from source to target environment without downtime.",
        whyItFits: "Enables blue-green style cutover for zero-downtime migration requirements.",
        priority: "high",
      },
    },
    {
      id: "rbac-documentation",
      condition: { questionId: "azurePolicyRBAC", operator: "equals", value: "extensive" },
      recommendation: {
        service: "Azure Policy + RBAC Recreation",
        outcome: "Documented and recreated governance baseline (policies, role assignments) in the target environment.",
        whyItFits: "Ensures governance and access control are not lost during migration.",
        priority: "medium",
      },
    },
    {
      id: "dns-ssl-cutover",
      condition: { questionId: "customDomains", operator: "equals", value: "yes" },
      recommendation: {
        service: "Azure DNS + Key Vault (Certificates)",
        outcome: "Managed DNS cutover and certificate reissuance/storage for custom domains.",
        whyItFits: "Centralises domain and certificate management during the migration cutover.",
        priority: "medium",
      },
    },
  ],

  prerequisiteRules: [
    {
      id: "tenant-clarification",
      condition: { questionId: "crossTenant", operator: "equals", value: "not-sure" },
      prerequisite: {
        title: "Tenant Scope Clarification",
        description: "Confirm with stakeholders whether source and target subscriptions belong to the same Azure AD tenant.",
        effort: "low",
      },
    },
    {
      id: "dependency-mapping-migration",
      condition: { questionId: "dependencies", operator: "equals", value: "complex" },
      prerequisite: {
        title: "Dependency Mapping",
        description: "Map all inter-resource dependencies to define a safe migration sequence.",
        effort: "medium",
      },
    },
    {
      id: "resource-inventory-migration",
      condition: { questionId: "resourceCountMigration", operator: "equals", value: "100+" },
      prerequisite: {
        title: "Full Resource Inventory Export",
        description: "Export complete resource inventory with configurations from the source subscription.",
        effort: "low",
      },
    },
    {
      id: "target-subscription-ready",
      condition: { questionId: "crossTenant", operator: "equals", value: "yes" },
      prerequisite: {
        title: "Target Tenant/Subscription Provisioning",
        description: "Ensure target tenant and subscription are provisioned with appropriate quotas before migration begins.",
        effort: "low",
      },
    },
  ],

  baseDeliverables: [
    {
      title: "Migration Assessment Report",
      description: "Inventory of resources to migrate with dependency mapping and migration approach per resource type.",
    },
    {
      title: "Migration Plan",
      description: "Sequenced migration plan with rollback procedures and validation checkpoints.",
    },
    {
      title: "Post-Migration Validation Report",
      description: "Verification that all migrated resources are functioning correctly in the target subscription/tenant.",
    },
  ],

  conditionalDeliverables: [
    {
      id: "iac-redeployment-package",
      condition: { questionId: "crossTenant", operator: "equals", value: "yes" },
      deliverable: {
        title: "IaC Redeployment Package",
        description: "ARM/Bicep templates for recreating resources in the target tenant.",
      },
    },
    {
      id: "cutover-runbook-migration",
      condition: { questionId: "downtimeToleranceMigration", operator: "equals", value: "zero" },
      deliverable: {
        title: "Zero-Downtime Cutover Runbook",
        description: "Step-by-step traffic cutover plan using Traffic Manager/Front Door with rollback triggers.",
      },
    },
    {
      id: "governance-recreation",
      condition: { questionId: "azurePolicyRBAC", operator: "equals", value: "extensive" },
      deliverable: {
        title: "Governance Baseline Recreation",
        description: "Recreated Azure Policy assignments and RBAC role definitions in the target environment.",
      },
    },
  ],
};