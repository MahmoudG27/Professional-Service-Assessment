import { ENTERPRISE_MAX } from "../engine/scenarioEngine";
export const azureMigrationScenario = {
    id: "azure-migration",
    version: "1.0.0",
    name: "Azure Migration from On-Premises",
    description: "Move servers, databases and applications from on-premises infrastructure to Azure.",
    icon: "cloud-upload",
    pricing: {
        currency: "USD",
        note: "Indicative only — final pricing subject to discovery workshop",
    },
    // ================================================================
    // QUESTIONS
    // ================================================================
    questions: [
        {
            id: "serverCount",
            text: "How many servers or VMs are currently on-premises?",
            type: "singleChoice",
            required: true,
            criticalForConfidence: true,
            options: [
                { value: "1-5", label: "1–5 servers" },
                { value: "6-20", label: "6–20 servers" },
                { value: "21-50", label: "21–50 servers", driverLabel: "21–50 Servers" },
                { value: "50+", label: "More than 50 servers", driverLabel: "50+ Servers" },
            ],
        },
        {
            id: "dataSize",
            text: "What is the estimated total data size to be migrated?",
            type: "singleChoice",
            required: true,
            criticalForConfidence: true,
            options: [
                { value: "less-1tb", label: "Less than 1 TB" },
                { value: "1-5tb", label: "1–5 TB" },
                { value: "5-20tb", label: "5–20 TB", driverLabel: "5–20TB Data Volume" },
                { value: "20tb+", label: "More than 20 TB", driverLabel: "20TB+ Data Volume" },
            ],
        },
        {
            id: "locations",
            text: "How many sites or branches will be connected to Azure?",
            type: "singleChoice",
            required: true,
            options: [
                { value: "single", label: "Single site" },
                { value: "2-5", label: "2–5 sites", driverLabel: "Multiple Sites (2–5)" },
                { value: "5+", label: "More than 5 sites", driverLabel: "Multi-Site Architecture" },
            ],
        },
        {
            id: "workloads",
            text: "What workloads do you want to migrate? (select all that apply)",
            type: "multiChoice",
            required: true,
            options: [
                { value: "web-apps", label: "Web applications" },
                { value: "databases", label: "Databases" },
                { value: "file-servers", label: "File servers" },
                { value: "email", label: "Email server" },
                { value: "erp-crm", label: "ERP / CRM systems" },
                { value: "custom-apps", label: "Custom applications" },
            ],
        },
        {
            id: "databasePlatform",
            text: "What is your current database platform?",
            type: "singleChoice",
            required: true,
            options: [
                { value: "sql-server", label: "Microsoft SQL Server" },
                { value: "mysql-pg", label: "MySQL / PostgreSQL" },
                { value: "oracle", label: "Oracle", driverLabel: "Oracle Database Migration" },
                { value: "none", label: "No database / Not sure" },
            ],
        },
        {
            id: "activeDirectory",
            text: "Do you have Active Directory (on-premises)?",
            type: "singleChoice",
            required: true,
            options: [
                { value: "yes-full", label: "Yes, fully implemented" },
                { value: "partial", label: "Partial / outdated" },
                { value: "no", label: "No" },
            ],
        },
        {
            id: "networkConnectivity",
            text: "Do you have existing network connectivity to Azure? (VPN / ExpressRoute)",
            type: "singleChoice",
            required: true,
            options: [
                { value: "yes", label: "Yes, already connected" },
                { value: "no", label: "No, need to set up" },
                { value: "not-sure", label: "Not sure" },
            ],
        },
        {
            id: "downtimeTolerance",
            text: "What is your expected downtime tolerance during migration?",
            type: "singleChoice",
            required: true,
            criticalForConfidence: true,
            options: [
                { value: "zero", label: "Zero downtime (live migration required)", driverLabel: "Zero Downtime Requirement" },
                { value: "weekend", label: "Weekend maintenance window acceptable" },
                { value: "flexible", label: "Flexible — no strict requirement" },
            ],
        },
        {
            id: "previousCloudExperience",
            text: "Have you done any cloud migration before?",
            type: "singleChoice",
            required: false,
            options: [
                { value: "partial", label: "Yes, partial migration done" },
                { value: "yes-cloud", label: "Yes, we already have cloud services" },
                { value: "first", label: "No, this is our first migration" },
            ],
        },
        {
            id: "migrationApproach",
            text: "Do you require a phased migration or full cutover?",
            type: "singleChoice",
            required: false,
            options: [
                { value: "phased", label: "Phased — workload by workload" },
                { value: "cutover", label: "Full cutover at once" },
                { value: "not-sure", label: "Not sure" },
            ],
        },
        {
            id: "downtimeCriticality",
            text: "How critical is application downtime to your business?",
            type: "singleChoice",
            required: true,
            options: [
                { value: "mission-critical", label: "Mission-critical (no downtime acceptable)" },
                { value: "moderate", label: "Moderate (a few hours acceptable)" },
                { value: "low", label: "Low impact" },
            ],
        },
        {
            id: "workloadsLocation",
            text: "Where are your workloads currently hosted?",
            type: "singleChoice",
            required: true,
            criticalForConfidence: true,
            options: [
                { value: "fully-onpremise", label: "Fully on-premise" },
                { value: "hybrid", label: "Hybrid (on-prem + cloud)" },
                { value: "fully-cloud", label: "Fully cloud" },
                { value: "no-infrastructure", label: "No structured infrastructure" },
            ],
        },
        {
            id: "infrastructureAge",
            text: "How would you describe the age of your infrastructure?",
            type: "singleChoice",
            required: true,
            options: [
                { value: "less-2", label: "Less than 2 years" },
                { value: "2-5", label: "2–5 years" },
                { value: "more-5", label: "More than 5 years" },
                { value: "not-sure", label: "Not sure" },
            ],
        },
        {
            id: "infrastructureType",
            text: "What type of infrastructure do you use?",
            type: "singleChoice",
            required: false,
            options: [
                { value: "vms", label: "Virtual machines" },
                { value: "containers", label: "Containers (Docker/Kubernetes)" },
                { value: "serverless", label: "Serverless" },
                { value: "not-sure", label: "Not sure" },
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
            id: "microsoftTech",
            text: "Which Microsoft technologies are you currently using?",
            type: "multiChoice",
            required: false,
            options: [
                { value: "m365", label: "Microsoft 365" },
                { value: "windows-server", label: "Windows Server" },
                { value: "sql-server", label: "SQL Server" },
                { value: "exchange", label: "Exchange Server" },
                { value: "sharepoint", label: "SharePoint" },
                { value: "none", label: "None" },
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
                { value: "health", label: "Health data — patient records, medical information", driverLabel: "Health Data" },
                { value: "financial", label: "Financial data", driverLabel: "Financial Data" },
            ],
        },
        {
            id: "complianceRequirements",
            text: "Do you have regulatory or compliance requirements?",
            type: "singleChoice",
            required: true,
            options: [
                { value: "yes", label: "Yes (e.g. GDPR, ISO)" },
                { value: "no", label: "No" },
                { value: "not-sure", label: "Not sure" },
            ],
        },
        {
            id: "backupSolution",
            text: "Do you have a backup or disaster recovery solution?",
            type: "singleChoice",
            required: true,
            options: [
                { value: "yes-full", label: "Yes, fully implemented" },
                { value: "partial", label: "Partial solution" },
                { value: "no", label: "No" },
                { value: "not-sure", label: "Not sure" },
            ],
        },
    ],
    // ================================================================
    // SCORING RULES
    // ================================================================
    scoringRules: [
        {
            questionId: "serverCount",
            values: { "1-5": 5, "6-20": 15, "21-50": 25, "50+": 40 },
        },
        {
            questionId: "dataSize",
            values: { "less-1tb": 5, "1-5tb": 15, "5-20tb": 25, "20tb+": 40 },
        },
        {
            questionId: "locations",
            values: { "single": 0, "2-5": 15, "5+": 30 },
        },
        {
            questionId: "workloads",
            weightedMultiSelect: {
                values: {
                    "web-apps": 5,
                    "databases": 10,
                    "file-servers": 5,
                    "email": 6,
                    "erp-crm": 12,
                    "custom-apps": 12,
                },
                maxPoints: 45,
            },
        },
        {
            questionId: "databasePlatform",
            values: { "sql-server": 5, "mysql-pg": 8, "oracle": 20, "none": 0 },
        },
        {
            questionId: "activeDirectory",
            values: { "yes-full": 5, "partial": 15, "no": 0 },
        },
        {
            questionId: "networkConnectivity",
            values: { "yes": 0, "no": 10, "not-sure": 5 },
        },
        {
            questionId: "downtimeTolerance",
            values: { "zero": 20, "weekend": 8, "flexible": 0 },
        },
        {
            questionId: "previousCloudExperience",
            values: { "partial": 0, "yes-cloud": 0, "first": 10 },
        },
        {
            questionId: "migrationApproach",
            values: { "phased": 10, "cutover": 5, "not-sure": 8 },
        },
        {
            questionId: "downtimeCriticality",
            values: { "mission-critical": 15, "moderate": 8, "low": 0 },
        },
        {
            questionId: "workloadsLocation",
            values: { "fully-onpremise": 5, "hybrid": 8, "fully-cloud": 0, "no-infrastructure": 15 },
        },
        {
            questionId: "infrastructureAge",
            values: { "less-2": 0, "2-5": 5, "more-5": 15, "not-sure": 8 },
        },
        {
            questionId: "infrastructureType",
            values: { "vms": 5, "containers": 10, "serverless": 0, "not-sure": 8 },
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
            questionId: "backupSolution",
            values: { "yes-full": 0, "partial": 8, "no": 15, "not-sure": 8 },
        },
    ],
    // ================================================================
    // COMPLEXITY RANGES
    // ================================================================
    complexityRanges: [
        {
            label: "Low Complexity",
            min: 0, max: 90,
            mandayMin: 3, mandayMax: 5,
            servicePriceMin: 250, servicePriceMax: 320,
        },
        {
            label: "Medium Complexity",
            min: 91, max: 180,
            mandayMin: 6, mandayMax: 9,
            servicePriceMin: 320, servicePriceMax: 420,
        },
        {
            label: "High Complexity",
            min: 181, max: 270,
            mandayMin: 10, mandayMax: 15,
            servicePriceMin: 420, servicePriceMax: 500,
        },
        {
            label: "Enterprise Complexity",
            min: 271, max: ENTERPRISE_MAX,
            mandayMin: 15, mandayMax: null,
            servicePriceMin: 500, servicePriceMax: null,
        },
    ],
    // ================================================================
    // FINDING RULES
    // ================================================================
    findingRules: [
        {
            id: "oracle-database",
            condition: { questionId: "databasePlatform", operator: "equals", value: "oracle" },
            finding: {
                id: "oracle-database",
                severity: "critical",
                title: "Oracle Database Migration — High Complexity",
                description: "Oracle migrations to Azure require specialized planning and licensing assessment.",
                businessImpact: "Significant effort and potential licensing costs for Oracle-to-Azure migration.",
            },
        },
        {
            id: "zero-downtime",
            condition: { questionId: "downtimeTolerance", operator: "equals", value: "zero" },
            finding: {
                id: "zero-downtime",
                severity: "critical",
                title: "Zero Downtime Requirement",
                description: "Live migration required — Azure Site Recovery or Azure Migrate with continuous replication needed.",
                businessImpact: "Higher effort and cost to ensure business continuity during migration.",
            },
        },
        {
            id: "no-network",
            condition: { questionId: "networkConnectivity", operator: "equals", value: "no" },
            finding: {
                id: "no-network",
                severity: "warning",
                title: "No Azure Network Connectivity",
                description: "VPN Gateway or ExpressRoute must be set up before migration can begin.",
                businessImpact: "Additional lead time and cost for network setup phase.",
            },
        },
        {
            id: "partial-ad",
            condition: { questionId: "activeDirectory", operator: "equals", value: "partial" },
            finding: {
                id: "partial-ad",
                severity: "warning",
                title: "Active Directory Requires Remediation",
                description: "Outdated or partial Active Directory must be cleaned up and synced to Azure AD before migration.",
                businessImpact: "Identity issues can block workload migration and increase security risk.",
            },
        },
        {
            id: "no-ad",
            condition: { questionId: "activeDirectory", operator: "equals", value: "no" },
            finding: {
                id: "no-ad",
                severity: "warning",
                title: "No Active Directory — Identity Setup Required",
                description: "Azure AD must be set up and populated before migrating workloads.",
            },
        },
        {
            id: "large-data",
            condition: { questionId: "dataSize", operator: "equals", value: "20tb+" },
            finding: {
                id: "large-data",
                severity: "warning",
                title: "Large Data Volume",
                description: "Datasets over 20 TB may require Azure Data Box for offline transfer to avoid long network upload times.",
                businessImpact: "Migration timeline may be extended. Physical data transfer should be planned.",
            },
        },
        {
            id: "multi-site",
            condition: { questionId: "locations", operator: "equals", value: "5+" },
            finding: {
                id: "multi-site",
                severity: "warning",
                title: "Multi-Site Connectivity Complexity",
                description: "More than 5 sites require Azure Virtual WAN or Hub-and-Spoke network design.",
            },
        },
        {
            id: "no-backup",
            condition: { questionId: "backupSolution", operator: "equals", value: "no" },
            finding: {
                id: "no-backup",
                severity: "critical",
                title: "No Backup or DR Solution",
                description: "No backup solution detected. Data loss risk is high during migration without pre-migration backups.",
                businessImpact: "Risk of unrecoverable data loss if migration fails without a backup baseline.",
            },
        },
        {
            id: "first-migration",
            condition: { questionId: "previousCloudExperience", operator: "equals", value: "first" },
            finding: {
                id: "first-migration",
                severity: "info",
                title: "First Cloud Migration",
                description: "This is the organisation's first cloud migration. A discovery workshop and Azure Landing Zone setup are strongly recommended.",
            },
        },
        {
            id: "no-compliance",
            condition: { questionId: "complianceRequirements", operator: "equals", value: "no" },
            finding: {
                id: "no-compliance",
                severity: "strength",
                title: "No Compliance Constraints",
                description: "No regulatory requirements detected — simplifies architecture decisions and reduces timeline.",
            },
        },
        {
            id: "sensitive-financial",
            condition: { questionId: "sensitiveData", operator: "equals", value: "financial" },
            finding: {
                id: "sensitive-financial",
                severity: "warning",
                title: "Financial Data — Security Controls Required",
                description: "Financial data migration requires Azure Key Vault, encryption at rest/transit, and audit logging.",
                businessImpact: "Non-compliance with financial data regulations can result in legal penalties.",
            },
        },
        {
            id: "sensitive-health",
            condition: { questionId: "sensitiveData", operator: "equals", value: "health" },
            finding: {
                id: "sensitive-health",
                severity: "critical",
                title: "Health Data — Compliance Controls Mandatory",
                description: "Health data requires strict compliance controls — Microsoft Defender for Cloud and Azure Policy must be configured.",
                businessImpact: "Healthcare data breaches carry severe regulatory and reputational consequences.",
            },
        },
        {
            id: "legacy-infrastructure",
            condition: { questionId: "infrastructureAge", operator: "equals", value: "more-5" },
            finding: {
                id: "legacy-infrastructure",
                severity: "warning",
                title: "Ageing Infrastructure",
                description: "Infrastructure older than 5 years may have compatibility issues with Azure-native services and require additional remediation before migration.",
                businessImpact: "Older systems often require more effort to assess and prepare — extending the migration timeline.",
            },
        },
        {
            id: "frequent-downtime",
            condition: { questionId: "systemAvailability", operator: "equals", value: "frequent-downtime" },
            finding: {
                id: "frequent-downtime",
                severity: "warning",
                title: "Current Environment Has Frequent Downtime",
                description: "Existing availability issues should be addressed in the migration design to avoid carrying instability into Azure.",
                businessImpact: "Migrating an unstable environment without remediation will reproduce the same issues in the cloud.",
            },
        },
        {
            id: "compliance-required",
            condition: { questionId: "complianceRequirements", operator: "equals", value: "yes" },
            finding: {
                id: "compliance-required",
                severity: "info",
                title: "Compliance Requirements Apply",
                description: "Regulatory requirements must be mapped to Azure controls before migration — Azure Policy and Microsoft Defender for Cloud will be configured accordingly.",
            },
        },
        {
            id: "hybrid-benefit-opportunity",
            condition: {
                questionId: "microsoftTech", operator: "contains", value: "windows-server",
            },
            finding: {
                id: "hybrid-benefit-opportunity",
                severity: "strength",
                title: "Azure Hybrid Benefit Eligible",
                description: "Existing Windows Server licenses can be applied to Azure VMs via Hybrid Benefit, reducing compute costs by up to 40%.",
            },
        },
        {
            id: "already-cloud",
            condition: { questionId: "workloadsLocation", operator: "equals", value: "fully-cloud" },
            finding: {
                id: "already-cloud",
                severity: "info",
                title: "Workloads Already Hosted in Cloud",
                description: "Workloads are already hosted in a cloud environment. A cloud-to-cloud migration assessment may be more appropriate.",
            },
        },
    ],
    // ================================================================
    // RECOMMENDATION RULES
    // ================================================================
    recommendationRules: [
        {
            id: "azure-migrate",
            condition: { questionId: "serverCount", operator: "exists", value: "" },
            recommendation: {
                service: "Azure Migrate",
                outcome: "Automated discovery, assessment, and migration of on-premises servers.",
                whyItFits: "Core tool for lift-and-shift migrations — provides dependency mapping and readiness reports.",
                priority: "critical",
            },
        },
        {
            id: "azure-site-recovery",
            condition: { questionId: "downtimeTolerance", operator: "equals", value: "zero" },
            recommendation: {
                service: "Azure Site Recovery",
                outcome: "Continuous replication enabling near-zero downtime cutover.",
                whyItFits: "Required when zero downtime is mandatory — replicates VMs in real-time to Azure.",
                priority: "critical",
            },
        },
        {
            id: "cloud-adoption-framework",
            condition: {
                or: [
                    { questionId: "serverCount", operator: "equals", value: "50+" },
                    { questionId: "previousCloudExperience", operator: "equals", value: "first" },
                ],
            },
            recommendation: {
                service: "Azure Cloud Adoption Framework",
                outcome: "Structured governance, migration planning, and operating model for large-scale Azure adoption.",
                whyItFits: "Large or first-time migrations benefit from Microsoft's proven adoption framework and landing zone guidance.",
                priority: "medium",
            },
        },
        {
            id: "azure-database-migration",
            condition: {
                or: [
                    { questionId: "databasePlatform", operator: "equals", value: "sql-server" },
                    { questionId: "databasePlatform", operator: "equals", value: "mysql-pg" },
                    { questionId: "databasePlatform", operator: "equals", value: "oracle" },
                ],
            },
            recommendation: {
                service: "Azure Database Migration Service",
                outcome: "Automated schema and data migration to Azure-managed databases.",
                whyItFits: "Reduces manual migration effort and minimises downtime for database cutover.",
                priority: "critical",
            },
        },
        {
            id: "azure-ad",
            condition: {
                or: [
                    { questionId: "activeDirectory", operator: "equals", value: "partial" },
                    { questionId: "activeDirectory", operator: "equals", value: "no" },
                ],
            },
            recommendation: {
                service: "Microsoft Entra ID (Azure AD)",
                outcome: "Centralised identity and access management for all migrated workloads.",
                whyItFits: "Identity must be in place before workloads migrate — enables SSO and Zero Trust.",
                priority: "critical",
            },
        },
        {
            id: "vpn-gateway",
            condition: { questionId: "networkConnectivity", operator: "equals", value: "no" },
            recommendation: {
                service: "Azure VPN Gateway",
                outcome: "Secure encrypted connection between on-premises network and Azure.",
                whyItFits: "Required before any workload migration — enables private, secure data transfer.",
                priority: "high",
            },
        },
        {
            id: "azure-backup",
            condition: {
                or: [
                    { questionId: "backupSolution", operator: "equals", value: "no" },
                    { questionId: "backupSolution", operator: "equals", value: "partial" },
                ],
            },
            recommendation: {
                service: "Azure Backup",
                outcome: "Automated, policy-driven backup for all migrated workloads.",
                whyItFits: "Essential before and after migration — protects against data loss during cutover.",
                priority: "high",
            },
        },
        {
            id: "azure-data-box",
            condition: { questionId: "dataSize", operator: "equals", value: "20tb+" },
            recommendation: {
                service: "Azure Data Box",
                outcome: "Offline bulk data transfer — avoid weeks of network upload for large datasets.",
                whyItFits: "Datasets over 20 TB are impractical to transfer over internet — Data Box ships physical appliance.",
                priority: "high",
            },
        },
        {
            id: "key-vault",
            condition: {
                or: [
                    { questionId: "sensitiveData", operator: "equals", value: "financial" },
                    { questionId: "sensitiveData", operator: "equals", value: "health" },
                    { questionId: "sensitiveData", operator: "equals", value: "pii" },
                ],
            },
            recommendation: {
                service: "Azure Key Vault",
                outcome: "Centralised secrets, keys, and certificate management.",
                whyItFits: "Required for handling sensitive data securely — encrypts credentials and connection strings.",
                priority: "high",
            },
        },
        {
            id: "virtual-wan",
            condition: { questionId: "locations", operator: "equals", value: "5+" },
            recommendation: {
                service: "Azure Virtual WAN",
                outcome: "Unified network connectivity across all sites and Azure regions.",
                whyItFits: "Multi-site environments require centralised routing — Virtual WAN simplifies Hub-and-Spoke design.",
                priority: "medium",
            },
        },
        {
            id: "defender-for-cloud",
            condition: {
                or: [
                    { questionId: "sensitiveData", operator: "equals", value: "health" },
                    { questionId: "sensitiveData", operator: "equals", value: "financial" },
                    { questionId: "complianceRequirements", operator: "equals", value: "yes" },
                ],
            },
            recommendation: {
                service: "Microsoft Defender for Cloud",
                outcome: "Continuous security posture management and threat protection.",
                whyItFits: "Mandatory for regulated environments — provides compliance dashboard and threat detection.",
                priority: "medium",
            },
        },
        {
            id: "landing-zone",
            condition: { questionId: "previousCloudExperience", operator: "equals", value: "first" },
            recommendation: {
                service: "Azure Landing Zone",
                outcome: "Pre-configured, governance-ready Azure environment.",
                whyItFits: "First-time migrations need a solid foundation — Landing Zone sets up governance, networking, and security from day one.",
                priority: "high",
            },
        },
        {
            id: "hybrid-benefit-rec",
            condition: {
                questionId: "microsoftTech", operator: "contains", value: "windows-server",
            },
            recommendation: {
                service: "Azure Hybrid Benefit",
                outcome: "Apply existing Windows Server licenses to Azure VMs — up to 40% cost reduction.",
                whyItFits: "You already own the licenses — Hybrid Benefit activates the discount immediately with no architecture change.",
                priority: "medium",
            },
        },
        {
            id: "sql-managed-instance",
            condition: {
                questionId: "microsoftTech", operator: "contains", value: "sql-server",
            },
            recommendation: {
                service: "Azure SQL Managed Instance",
                outcome: "Managed SQL platform with near-full SQL Server compatibility.",
                whyItFits: "Existing SQL Server workloads can be migrated with minimal application changes.",
                priority: "high",
            },
        },
        {
            id: "azure-policy",
            condition: { questionId: "complianceRequirements", operator: "equals", value: "yes" },
            recommendation: {
                service: "Azure Policy",
                outcome: "Automated enforcement of compliance controls across all migrated resources.",
                whyItFits: "Regulatory requirements must be enforced at the platform level — Azure Policy prevents non-compliant deployments.",
                priority: "medium",
            },
        },
    ],
    // ================================================================
    // PREREQUISITE RULES
    // ================================================================
    prerequisiteRules: [
        {
            id: "ad-cleanup",
            condition: { questionId: "activeDirectory", operator: "equals", value: "partial" },
            prerequisite: {
                title: "Active Directory Cleanup",
                description: "Remove stale accounts, fix group policies, and prepare AD for Azure AD Connect sync.",
                effort: "medium",
            },
        },
        {
            id: "network-setup",
            condition: { questionId: "networkConnectivity", operator: "equals", value: "no" },
            prerequisite: {
                title: "Network Connectivity Setup",
                description: "VPN Gateway or ExpressRoute must be provisioned and tested before migration begins.",
                effort: "medium",
            },
        },
        {
            id: "backup-baseline",
            condition: { questionId: "backupSolution", operator: "equals", value: "no" },
            prerequisite: {
                title: "Pre-Migration Backup",
                description: "Full backup of all systems must be taken and verified before any migration activity.",
                effort: "low",
            },
        },
        {
            id: "oracle-licensing",
            condition: { questionId: "databasePlatform", operator: "equals", value: "oracle" },
            prerequisite: {
                title: "Oracle Licensing Assessment",
                description: "Oracle licensing on Azure must be reviewed with Oracle and Microsoft before migration.",
                effort: "high",
            },
        },
        {
            id: "stakeholder-alignment",
            condition: { questionId: "previousCloudExperience", operator: "equals", value: "first" },
            prerequisite: {
                title: "Stakeholder Alignment Workshop",
                description: "All key stakeholders must be aligned on migration objectives, timeline, and responsibilities.",
                effort: "low",
            },
        },
    ],
    // ================================================================
    // BASE DELIVERABLES (always included)
    // ================================================================
    baseDeliverables: [
        {
            title: "Discovery & Assessment Report",
            description: "Detailed inventory of all on-premises workloads with Azure readiness assessment.",
        },
        {
            title: "Migration Plan",
            description: "Wave-based migration plan with sequencing, timelines, and rollback procedures.",
        },
        {
            title: "Azure Landing Zone Setup",
            description: "Governance-ready Azure environment with networking, IAM, and policy baseline.",
        },
        {
            title: "Post-Migration Validation Report",
            description: "Verification that all migrated workloads are functioning correctly in Azure.",
        },
    ],
    // ================================================================
    // CONDITIONAL DELIVERABLES
    // ================================================================
    conditionalDeliverables: [
        {
            id: "network-design",
            condition: { questionId: "locations", operator: "equals", value: "5+" },
            deliverable: {
                title: "Multi-Site Network Design",
                description: "Hub-and-Spoke or Virtual WAN architecture design for multi-branch connectivity.",
            },
        },
        {
            id: "dr-runbook",
            condition: { questionId: "downtimeTolerance", operator: "equals", value: "zero" },
            deliverable: {
                title: "DR Runbook & Failover Testing",
                description: "Documented failover procedures and tested cutover runbook for zero-downtime migration.",
            },
        },
        {
            id: "database-migration-plan",
            condition: {
                or: [
                    { questionId: "databasePlatform", operator: "equals", value: "sql-server" },
                    { questionId: "databasePlatform", operator: "equals", value: "oracle" },
                    { questionId: "databasePlatform", operator: "equals", value: "mysql-pg" },
                ],
            },
            deliverable: {
                title: "Database Migration & Validation",
                description: "Schema migration, data transfer, and post-migration data integrity validation.",
            },
        },
        {
            id: "compliance-report",
            condition: { questionId: "complianceRequirements", operator: "equals", value: "yes" },
            deliverable: {
                title: "Compliance Baseline Report",
                description: "Azure Policy assignments and compliance posture report against required frameworks.",
            },
        },
        {
            id: "security-baseline",
            condition: {
                or: [
                    { questionId: "sensitiveData", operator: "equals", value: "health" },
                    { questionId: "sensitiveData", operator: "equals", value: "financial" },
                ],
            },
            deliverable: {
                title: "Security Baseline Configuration",
                description: "Defender for Cloud setup, Key Vault configuration, and encryption policy for sensitive data.",
            },
        },
    ],
};
