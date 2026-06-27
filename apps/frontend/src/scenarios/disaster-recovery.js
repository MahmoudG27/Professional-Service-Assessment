import { ENTERPRISE_MAX } from "../engine/scenarioEngine";
export const disasterRecoveryScenario = {
    id: "disaster-recovery",
    version: "1.0.0",
    name: "Disaster Recovery on Azure",
    description: "Protect business-critical workloads and enable failover to Azure in the event of an outage.",
    icon: "shield-check",
    pricing: {
        currency: "USD",
        note: "Indicative only — final pricing subject to discovery workshop",
    },
    questions: [
        {
            id: "workloadType",
            text: "What workloads require DR protection?",
            type: "singleChoice",
            required: true,
            criticalForConfidence: true,
            options: [
                { value: "azure-vm", label: "Azure Virtual Machines" },
                { value: "vmware", label: "VMware Virtual Machines" },
                { value: "hyper-v", label: "Hyper-V Virtual Machines" },
                { value: "physical", label: "Physical Servers" },
                { value: "sql", label: "SQL Databases" },
                { value: "mixed", label: "Mixed Environment" }
            ]
        },
        {
            id: "systemsToProtect",
            text: "What systems need disaster recovery protection? (select all that apply)",
            type: "multiChoice",
            required: true,
            options: [
                { value: "critical-apps", label: "Business-critical applications" },
                { value: "databases", label: "Databases" },
                { value: "file-servers", label: "File servers" },
                { value: "email", label: "Email and communication systems" },
            ],
        },
        {
            id: "drStrategy",
            text: "What DR model are you targeting?",
            type: "singleChoice",
            required: true,
            criticalForConfidence: true,
            options: [
                { value: "backup", label: "Backup & Restore" },
                { value: "pilot-light", label: "Pilot Light" },
                { value: "warm", label: "Warm Standby" },
                { value: "hot", label: "Hot Standby" },
                { value: "not-sure", label: "Not Sure" }
            ]
        },
        {
            id: "rto",
            text: "What is your current Recovery Time Objective (RTO)?",
            type: "singleChoice",
            required: true,
            criticalForConfidence: true,
            options: [
                { value: "less-1h", label: "Less than 1 hour", driverLabel: "RTO < 1 Hour" },
                { value: "1-4h", label: "1–4 hours", driverLabel: "RTO 1–4 Hours" },
                { value: "4-24h", label: "4–24 hours" },
                { value: "no-rto", label: "More than 24 hours / No defined RTO" },
            ],
        },
        {
            id: "rpo",
            text: "What is your current Recovery Point Objective (RPO)?",
            type: "singleChoice",
            required: true,
            criticalForConfidence: true,
            options: [
                { value: "near-zero", label: "Near zero (real-time replication)", driverLabel: "Near-Zero RPO" },
                { value: "less-1h", label: "Less than 1 hour", driverLabel: "RPO < 1 Hour" },
                { value: "1-24h", label: "1–24 hours", driverLabel: "RPO 1–24 Hours" },
                { value: "no-rpo", label: "More than 24 hours / No defined RPO" },
            ],
        },
        {
            id: "dataVolume",
            text: "What is your estimated data volume for replication?",
            type: "singleChoice",
            required: true,
            criticalForConfidence: true,
            options: [
                { value: "less-1tb", label: "Less than 1 TB" },
                { value: "1-10tb", label: "1–10 TB" },
                { value: "10-50tb", label: "10–50 TB", driverLabel: "10–50TB Data Volume" },
                { value: "50tb+", label: "More than 50 TB", driverLabel: "50TB+ Data Volume" },
            ],
        },
        {
            id: "existingDR",
            text: "Do you have an existing DR solution?",
            type: "singleChoice",
            required: true,
            options: [
                { value: "yes-full", label: "Yes, fully implemented" },
                { value: "partial", label: "Partial solution in place" },
                { value: "no", label: "No DR solution currently" },
            ],
        },
        {
            id: "drTesting",
            text: "How often do you test your DR plan?",
            type: "singleChoice",
            required: true,
            options: [
                { value: "quarterly", label: "Quarterly" },
                { value: "annually", label: "Annually" },
                { value: "rarely", label: "Rarely" },
                { value: "never", label: "Never", driverLabel: "No DR Testing History" },
            ],
        },
        {
            id: "failoverType",
            text: "Do you require automatic failover or manual failover?",
            type: "singleChoice",
            required: false,
            options: [
                { value: "automatic", label: "Automatic failover required" },
                { value: "manual", label: "Manual failover acceptable" },
                { value: "not-sure", label: "Not sure" },
            ],
        },
        {
            id: "previousOutage",
            text: "Have you experienced an unplanned outage in the past 2 years?",
            type: "singleChoice",
            required: false,
            options: [
                { value: "multiple", label: "Yes, multiple times" },
                { value: "once", label: "Yes, once" },
                { value: "no", label: "No" },
            ],
        },
        {
            id: "primaryDRSite",
            text: "What is your primary DR site currently?",
            type: "singleChoice",
            required: false,
            options: [
                { value: "secondary-onprem", label: "Secondary on-premises datacenter" },
                { value: "colocation", label: "Co-location facility" },
                { value: "other-cloud", label: "Another cloud provider" },
                { value: "none", label: "No secondary site" },
            ],
        },
        {
            id: "workloadsLocation",
            text: "Where are your workloads currently hosted?",
            type: "singleChoice",
            required: true,
            options: [
                { value: "fully-onpremise", label: "Fully on-premise" },
                { value: "hybrid", label: "Hybrid (on-prem + cloud)" },
                { value: "fully-cloud", label: "Fully cloud" },
                { value: "no-infrastructure", label: "No structured infrastructure" },
            ],
        },
        {
            id: "systemAvailability",
            text: "How is your system availability today?",
            type: "singleChoice",
            required: false,
            options: [
                { value: "frequent-downtime", label: "Frequent downtime" },
                { value: "occasional-issues", label: "Occasional issues" },
                { value: "stable", label: "Stable" },
                { value: "highly-available", label: "Highly available" },
            ],
        },
        {
            id: "sensitiveData",
            text: "What type of sensitive data do you handle?",
            type: "singleChoice",
            required: true,
            criticalForConfidence: true,
            options: [
                { value: "none", label: "None" },
                { value: "pii", label: "Personal data (PII)" },
                { value: "financial", label: "Financial data" },
                { value: "health", label: "Health data — patient records, medical information" },
            ],
        },
        {
            id: "complianceRequirements",
            text: "Do you have regulatory or compliance requirements?",
            type: "singleChoice",
            required: true,
            options: [
                { value: "yes", label: "Yes (e.g. GDPR, ISO 22301)" },
                { value: "no", label: "No" },
                { value: "not-sure", label: "Not sure" },
            ],
        },
        {
            id: "securityIncidents",
            text: "Have you experienced any security incidents or outages in the past 2 years?",
            type: "singleChoice",
            required: false,
            options: [
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
                { value: "prefer-not-to-say", label: "Prefer not to say" },
            ],
        },
    ],
    scoringRules: [
        {
            questionId: "systemsToProtect",
            multiSelect: { perItem: 8, maxPoints: 40 },
        },
        {
            questionId: "workloadType",
            values: { "azure-vm": 5, "sql": 10, "vmware": 15, "hyper-v": 15, "physical": 25, "mixed": 30 },
        },
        {
            questionId: "drStrategy",
            values: { "backup": 5, "pilot-light": 15, "warm": 30, "hot": 45, "not-sure": 20 },
        },
        {
            questionId: "rto",
            values: { "less-1h": 30, "1-4h": 20, "4-24h": 10, "no-rto": 5 },
        },
        {
            questionId: "rpo",
            values: { "near-zero": 40, "less-1h": 35, "1-24h": 10, "no-rpo": 5 },
        },
        {
            questionId: "dataVolume",
            values: { "less-1tb": 5, "1-10tb": 15, "10-50tb": 25, "50tb+": 40 },
        },
        {
            questionId: "existingDR",
            values: { "yes-full": 0, "partial": 15, "no": 25 },
        },
        {
            questionId: "drTesting",
            values: { "quarterly": 0, "annually": 8, "rarely": 15, "never": 25 },
        },
        {
            questionId: "failoverType",
            values: { "automatic": 20, "manual": 8, "not-sure": 12 },
        },
        {
            questionId: "previousOutage",
            values: { "multiple": 10, "once": 5, "no": 0 },
        },
        {
            questionId: "workloadsLocation",
            values: { "fully-onpremise": 10, "hybrid": 15, "fully-cloud": 0, "no-infrastructure": 15 },
        },
        {
            questionId: "primaryDRSite",
            values: { "secondary-onprem": 10, "colocation": 8, "other-cloud": 12, "none": 15 },
        },
        {
            questionId: "systemAvailability",
            values: { "frequent-downtime": 15, "occasional-issues": 8, "stable": 0, "highly-available": 0 },
        },
        {
            questionId: "sensitiveData",
            values: { "none": 0, "pii": 8, "financial": 12, "health": 18 },
        },
        {
            questionId: "complianceRequirements",
            values: { "yes": 12, "no": 0, "not-sure": 5 },
        },
        {
            questionId: "securityIncidents",
            values: { "yes": 10, "no": 0, "prefer-not-to-say": 8 },
        },
    ],
    complexityRanges: [
        {
            label: "Low Complexity",
            min: 0, max: 90,
            mandayMin: 3, mandayMax: 4,
            servicePriceMin: 200, servicePriceMax: 260,
        },
        {
            label: "Medium Complexity",
            min: 91, max: 170,
            mandayMin: 5, mandayMax: 7,
            servicePriceMin: 260, servicePriceMax: 330,
        },
        {
            label: "High Complexity",
            min: 171, max: 260,
            mandayMin: 8, mandayMax: 11,
            servicePriceMin: 330, servicePriceMax: 400,
        },
        {
            label: "Enterprise Complexity",
            min: 261, max: ENTERPRISE_MAX,
            mandayMin: 11, mandayMax: null,
            servicePriceMin: 400, servicePriceMax: null,
        },
    ],
    findingRules: [
        {
            id: "no-dr-solution",
            condition: { questionId: "existingDR", operator: "equals", value: "no" },
            finding: {
                id: "no-dr-solution",
                severity: "critical",
                title: "No Existing DR Solution",
                description: "No disaster recovery solution currently protects the environment. A full DR design and implementation is required.",
                businessImpact: "Any outage could result in extended downtime and permanent data loss.",
            },
        },
        {
            id: "near-zero-rpo",
            condition: { questionId: "rpo", operator: "equals", value: "near-zero" },
            finding: {
                id: "near-zero-rpo",
                severity: "critical",
                title: "Near-Zero RPO Requirement",
                description: "Near real-time replication requires continuous data replication via Azure Site Recovery with frequent recovery points.",
                businessImpact: "Higher infrastructure cost for continuous replication, but minimises data loss in a failover event.",
            },
        },
        {
            id: "no-dr-testing",
            condition: { questionId: "drTesting", operator: "equals", value: "never" },
            finding: {
                id: "no-dr-testing",
                severity: "critical",
                title: "DR Plan Never Tested",
                description: "Without regular DR testing, failover procedures cannot be relied upon during an actual incident.",
                businessImpact: "Untested DR plans frequently fail when actually needed — testing must be built into the engagement.",
            },
        },
        {
            id: "rarely-tested",
            condition: { questionId: "drTesting", operator: "equals", value: "rarely" },
            finding: {
                id: "rarely-tested",
                severity: "warning",
                title: "Infrequent DR Testing",
                description: "Infrequent DR testing increases the risk that failover procedures are outdated or non-functional.",
            },
        },
        {
            id: "recurring-outages",
            condition: { questionId: "previousOutage", operator: "equals", value: "multiple" },
            finding: {
                id: "recurring-outages",
                severity: "warning",
                title: "History of Recurring Outages",
                description: "Multiple unplanned outages in the past 2 years indicate underlying infrastructure reliability issues.",
                businessImpact: "DR is critical to mitigate the business impact of recurring outages.",
            },
        },
        {
            id: "large-replication-volume",
            condition: { questionId: "dataVolume", operator: "equals", value: "50tb+" },
            finding: {
                id: "large-replication-volume",
                severity: "warning",
                title: "Large Data Volume for Replication",
                description: "Replicating more than 50 TB requires careful bandwidth planning and possibly Azure Data Box for initial seed.",
            },
        },
        {
            id: "hot-standby",
            condition: { questionId: "drStrategy", operator: "equals", value: "hot" },
            finding: {
                id: "hot-standby",
                severity: "warning",
                title: "Hot Standby Environment Required",
                description: "Hot standby requires continuously running infrastructure in the recovery site.",
                businessImpact: "Provides the lowest recovery times but significantly increases infrastructure and operational costs."
            }
        },
        {
            id: "automatic-failover-required",
            condition: { questionId: "failoverType", operator: "equals", value: "automatic" },
            finding: {
                id: "automatic-failover-required",
                severity: "info",
                title: "Automatic Failover Required",
                description: "Automatic failover requires Azure Site Recovery recovery plans with scripted automation and health monitoring.",
            },
        },
        {
            id: "no-secondary-site",
            condition: { questionId: "primaryDRSite", operator: "equals", value: "none" },
            finding: {
                id: "no-secondary-site",
                severity: "warning",
                title: "No Secondary Recovery Site",
                description: "No alternate recovery location currently exists.",
                businessImpact: "A disaster affecting the primary environment could result in extended service outage."
            },
        },
        {
            id: "cross-cloud-dr",
            condition: { questionId: "primaryDRSite", operator: "equals", value: "other-cloud" },
            finding: {
                id: "cross-cloud-dr",
                severity: "info",
                title: "Existing DR Site in Another Cloud",
                description: "Current DR capability relies on a different cloud platform.",
                businessImpact: "Migration and failover processes must be validated across providers."
            },
        },
        {
            id: "partial-dr",
            condition: { questionId: "existingDR", operator: "equals", value: "partial" },
            finding: {
                id: "partial-dr",
                severity: "warning",
                title: "Partial DR Solution",
                description: "An existing partial DR solution will be assessed and extended to cover all in-scope systems.",
            },
        },
        {
            id: "sensitive-data-dr",
            condition: { questionId: "sensitiveData", operator: "equals", value: "health" },
            finding: {
                id: "sensitive-data-dr",
                severity: "critical",
                title: "Health Data Requires Compliant DR Design",
                description: "DR for health data must maintain encryption and compliance controls at the secondary site.",
                businessImpact: "Non-compliant DR design for healthcare data carries regulatory risk.",
            },
        },
        {
            id: "frequent-downtime-dr",
            condition: { questionId: "systemAvailability", operator: "equals", value: "frequent-downtime" },
            finding: {
                id: "frequent-downtime-dr",
                severity: "warning",
                title: "Current Environment Has Reliability Issues",
                description: "Frequent downtime indicates underlying infrastructure problems — DR will protect against outages but root causes should also be addressed.",
                businessImpact: "Without addressing root causes, failover events will be more frequent and DR costs higher.",
            },
        },
        {
            id: "compliance-dr",
            condition: { questionId: "complianceRequirements", operator: "equals", value: "yes" },
            finding: {
                id: "compliance-dr",
                severity: "info",
                title: "Compliance Requirements Apply to DR Design",
                description: "Regulatory frameworks (e.g. ISO 22301, GDPR) impose requirements on DR documentation, testing frequency, and data residency.",
            },
        },
        {
            id: "security-incident-dr",
            condition: { questionId: "securityIncidents", operator: "equals", value: "yes" },
            finding: {
                id: "security-incident-dr",
                severity: "warning",
                title: "Previous Security Incident Detected",
                description: "DR design must account for ransomware and malicious attack scenarios — immutable backups and isolated recovery environments are recommended.",
                businessImpact: "Ransomware can encrypt backup data — offline or immutable backups are essential.",
            },
        },
    ],
    recommendationRules: [
        {
            id: "azure-site-recovery",
            condition: { questionId: "systemsToProtect", operator: "exists", value: "" },
            recommendation: {
                service: "Azure Site Recovery",
                outcome: "Replication and orchestrated failover/failback for VMs and physical servers.",
                whyItFits: "Core service for DR — provides continuous replication and automated recovery plans.",
                priority: "critical",
            },
        },
        {
            id: "azure-backup-dr",
            condition: {
                or: [
                    { questionId: "existingDR", operator: "equals", value: "no" },
                    { questionId: "existingDR", operator: "equals", value: "partial" },
                ],
            },
            recommendation: {
                service: "Azure Backup",
                outcome: "Application-consistent backups for VMs, databases, and file shares.",
                whyItFits: "Provides a recovery baseline independent of replication — protects against ransomware and corruption.",
                priority: "high",
            },
        },
        {
            id: "data-box-dr",
            condition: { questionId: "dataVolume", operator: "equals", value: "50tb+" },
            recommendation: {
                service: "Azure Data Box",
                outcome: "Offline seeding of large replication datasets to avoid prolonged initial sync over the network.",
                whyItFits: "Initial replication of 50TB+ over a WAN link can take weeks — Data Box accelerates the seed phase.",
                priority: "medium",
            },
        },
        {
            id: "near-zero-rpo-services",
            condition: { questionId: "rpo", operator: "equals", value: "near-zero" },
            recommendation: {
                service: "Azure Site Recovery + Geo-Replication",
                outcome: "Continuous replication with minimal data loss.",
                whyItFits: "Supports near-zero RPO requirements through continuous replication and automated recovery.",
                priority: "critical"
            }
        },
        {
            id: "key-vault-financial",
            condition: {
                or: [
                    { questionId: "sensitiveData", operator: "equals", value: "financial" },
                    { questionId: "sensitiveData", operator: "equals", value: "health" },
                ]
            },
            recommendation: {
                service: "Azure Key Vault",
                outcome: "Secure management of encryption keys and secrets.",
                whyItFits: "Protects regulated data in both primary and DR environments.",
                priority: "high"
            }
        },
        {
            id: "recovery-plans",
            condition: { questionId: "failoverType", operator: "equals", value: "automatic" },
            recommendation: {
                service: "Azure Site Recovery Recovery Plans",
                outcome: "Scripted, ordered failover automation across multiple VMs and tiers.",
                whyItFits: "Automatic failover requires defined sequencing (e.g. database before app tier) — Recovery Plans automate this.",
                priority: "high",
            },
        },
        {
            id: "log-analytics-dr",
            condition: { questionId: "drTesting", operator: "equals", value: "never" },
            recommendation: {
                service: "Azure Monitor + Log Analytics",
                outcome: "Health monitoring and alerting for replicated workloads and DR readiness.",
                whyItFits: "Provides visibility into replication health — essential before establishing a regular DR testing cadence.",
                priority: "medium",
            },
        },
        {
            id: "defender-dr",
            condition: { questionId: "sensitiveData", operator: "equals", value: "health" },
            recommendation: {
                service: "Microsoft Defender for Cloud",
                outcome: "Continuous compliance and security posture monitoring across primary and DR environments.",
                whyItFits: "Ensures the DR site maintains the same compliance posture as production for regulated data.",
                priority: "high",
            },
        },
        {
            id: "recovery-vault",
            condition: { questionId: "primaryDRSite", operator: "equals", value: "none" },
            recommendation: {
                service: "Azure Site Recovery Vault",
                outcome: "Establish a dedicated recovery location in Azure.",
                whyItFits: "Provides a secondary recovery site without maintaining additional datacenter infrastructure.",
                priority: "high"
            },
        },
    ],
    prerequisiteRules: [
        {
            id: "bandwidth-assessment",
            condition: { questionId: "dataVolume", operator: "equals", value: "50tb+" },
            prerequisite: {
                title: "Network Bandwidth Assessment",
                description: "Assess WAN bandwidth to determine replication throughput and whether Data Box seeding is required.",
                effort: "low",
            },
        },
        {
            id: "rto-rpo-workshop",
            condition: {
                or: [
                    { questionId: "rto", operator: "equals", value: "no-rto" },
                    { questionId: "rpo", operator: "equals", value: "no-rpo" },
                ],
            },
            prerequisite: {
                title: "RTO/RPO Definition Workshop",
                description: "Define formal RTO and RPO targets per system before designing the DR solution.",
                effort: "medium",
            },
        },
        {
            id: "dr-runbook-baseline",
            condition: { questionId: "drTesting", operator: "equals", value: "never" },
            prerequisite: {
                title: "DR Runbook Baseline",
                description: "Document current recovery procedures (if any) as a starting point for the new DR design.",
                effort: "low",
            },
        },
    ],
    baseDeliverables: [
        {
            title: "DR Assessment Report",
            description: "Assessment of current DR posture, RTO/RPO gaps, and recommended Azure DR architecture.",
        },
        {
            title: "Azure Site Recovery Setup",
            description: "Configuration of replication policies, recovery vaults, and network mapping to Azure.",
        },
        {
            title: "DR Runbook",
            description: "Documented step-by-step failover and failback procedures for all in-scope systems.",
        },
        {
            title: "DR Test Execution",
            description: "Controlled failover test to validate recovery procedures meet defined RTO/RPO targets.",
        },
    ],
    conditionalDeliverables: [
        {
            id: "automated-recovery-plans",
            condition: { questionId: "failoverType", operator: "equals", value: "automatic" },
            deliverable: {
                title: "Automated Recovery Plans",
                description: "Scripted, multi-tier failover orchestration with dependency sequencing and post-failover scripts.",
            },
        },
        {
            id: "data-seeding",
            condition: { questionId: "dataVolume", operator: "equals", value: "50tb+" },
            deliverable: {
                title: "Offline Data Seeding (Azure Data Box)",
                description: "Initial bulk data transfer to Azure to accelerate replication setup for large datasets.",
            },
        },
        {
            id: "compliance-dr-report",
            condition: { questionId: "complianceRequirements", operator: "equals", value: "yes" },
            deliverable: {
                title: "DR Compliance Report",
                description: "Documentation showing DR environment meets the same compliance controls as production.",
            },
        },
    ],
};
