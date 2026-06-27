import { ENTERPRISE_MAX } from "../engine/scenarioEngine";
export const modernizationScenario = {
    id: "modernization",
    version: "1.0.0",
    name: "Modernization for Applications and Databases",
    description: "Transform legacy applications and databases into cloud-native solutions on Azure.",
    icon: "code",
    pricing: {
        currency: "USD",
        note: "Indicative only — final pricing subject to discovery workshop",
    },
    questions: [
        {
            id: "appCount",
            text: "How many applications are in scope for modernization?",
            type: "singleChoice",
            required: true,
            criticalForConfidence: true,
            options: [
                { value: "1", label: "1 application" },
                { value: "2-5", label: "2–5 applications" },
                { value: "6-10", label: "6–10 applications", driverLabel: "6–10 Applications" },
                { value: "10+", label: "More than 10 applications", driverLabel: "10+ Applications in Scope" },
            ],
        },
        {
            id: "currentHosting",
            text: "Where are the applications currently hosted?",
            type: "singleChoice",
            required: true,
            criticalForConfidence: true,
            options: [
                { value: "onprem", label: "On-premises" },
                { value: "azure-vm", label: "Azure Virtual Machines" },
                { value: "other-cloud", label: "Other cloud provider" },
                { value: "mixed", label: "Mixed environment" }
            ]
        },
        {
            id: "appAge",
            text: "What is the age of the applications you want to modernize?",
            type: "singleChoice",
            required: true,
            options: [
                { value: "less-3", label: "Less than 3 years" },
                { value: "3-7", label: "3–7 years" },
                { value: "more-7", label: "More than 7 years" },
            ],
        },
        {
            id: "sourceCodeAccess",
            text: "Do you have access to the source code of all applications?",
            type: "singleChoice",
            required: true,
            criticalForConfidence: true,
            options: [
                { value: "full", label: "Yes, full access" },
                { value: "partial", label: "Partial access" },
                { value: "none", label: "No access (third-party vendor)", driverLabel: "No Source Code Access" },
            ],
        },
        {
            id: "techStack",
            text: "What technology stack are your applications built on?",
            type: "singleChoice",
            required: true,
            options: [
                { value: "dotnet", label: ".NET / ASP.NET" },
                { value: "java", label: "Java" },
                { value: "php", label: "PHP" },
                { value: "node-py", label: "Node.js / Python" },
                { value: "mixed", label: "Mixed / Not sure" },
            ],
        },
        {
            id: "modernizationApproach",
            text: "What is your target modernization approach?",
            type: "singleChoice",
            required: true,
            criticalForConfidence: true,
            options: [
                { value: "rehost", label: "Rehost — lift & shift with minimal changes" },
                { value: "replatform", label: "Replatform — minor optimizations for cloud" },
                { value: "refactor", label: "Refactor — redesign for cloud-native", driverLabel: "Full Refactoring Required" },
                { value: "not-sure", label: "Not sure — need guidance" },
            ],
        },
        {
            id: "cicd",
            text: "Do you currently use CI/CD pipelines?",
            type: "singleChoice",
            required: true,
            options: [
                { value: "yes-full", label: "Yes, fully automated" },
                { value: "partial", label: "Partial / manual deployments" },
                { value: "no", label: "No" },
            ],
        },
        {
            id: "automatedTesting",
            text: "Do you have automated testing in place?",
            type: "singleChoice",
            required: true,
            options: [
                { value: "comprehensive", label: "Yes, comprehensive test coverage" },
                { value: "some", label: "Some tests exist" },
                { value: "none", label: "No automated testing" },
            ],
        },
        {
            id: "databaseMigration",
            text: "What database modernization do you need?",
            type: "singleChoice",
            required: true,
            criticalForConfidence: true,
            options: [
                { value: "azure-sql", label: "Migrate to Azure SQL Database" },
                { value: "cosmos", label: "Migrate to Azure Cosmos DB" },
                { value: "pg-mysql", label: "Migrate to Azure Database for PostgreSQL / MySQL" },
                { value: "none", label: "No database migration needed" },
            ],
        },
        {
            id: "highAvailability",
            text: "Do you require high availability for modernized applications?",
            type: "singleChoice",
            required: true,
            options: [
                { value: "yes", label: "Yes, 99.9%+ uptime required" },
                { value: "standard", label: "Standard availability is fine" },
                { value: "not-sure", label: "Not sure" },
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
            text: "What type of infrastructure do you currently use?",
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
            id: "currentSystems",
            text: "Which systems are in scope for modernization? (select all that apply)",
            type: "multiChoice",
            required: false,
            options: [
                { value: "erp", label: "ERP system" },
                { value: "crm", label: "CRM system" },
                { value: "web", label: "Company website" },
                { value: "email", label: "Email server" },
                { value: "files", label: "File storage" },
                { value: "custom", label: "Custom-built applications" },
            ],
        },
        {
            id: "peakUsage",
            text: "What is your peak usage pattern?",
            type: "singleChoice",
            required: false,
            options: [
                { value: "consistent", label: "Consistent — steady throughout the year" },
                { value: "seasonal", label: "Seasonal — spikes at specific times" },
                { value: "unpredictable", label: "Unpredictable spikes" },
                { value: "not-sure", label: "Not sure" },
            ],
        },
        {
            id: "sensitiveData",
            text: "What type of sensitive data do your applications handle?",
            type: "singleChoice",
            required: true,
            criticalForConfidence: true,
            options: [
                { value: "pii", label: "Personal data (PII)" },
                { value: "financial", label: "Financial data" },
                { value: "health", label: "Health data — patient records, medical information" },
                { value: "none", label: "None" },
            ],
        },
        {
            id: "complianceRequirements",
            text: "Which compliance frameworks apply? (select all that apply)",
            type: "multiChoice",
            required: false,
            options: [
                { value: "gdpr", label: "GDPR" },
                { value: "iso27001", label: "ISO 27001" },
                { value: "pci-dss", label: "PCI-DSS" },
                { value: "hipaa", label: "HIPAA" },
                { value: "nca", label: "NCA (Saudi)" },
                { value: "none", label: "None" }
            ]
        },
    ],
    scoringRules: [
        {
            questionId: "appCount",
            values: { "1": 10, "2-5": 25, "6-10": 45, "10+": 65 },
        },
        {
            questionId: "currentHosting",
            values: { "onprem": 20, "azure-vm": 5, "other-cloud": 15, "mixed": 25 },
        },
        {
            questionId: "appAge",
            values: { "less-3": 5, "3-7": 15, "more-7": 30 },
        },
        {
            questionId: "sourceCodeAccess",
            values: { "full": 0, "partial": 15, "none": 45 },
        },
        {
            questionId: "techStack",
            values: { "dotnet": 5, "java": 10, "php": 10, "node-py": 5, "mixed": 20 },
        },
        {
            questionId: "modernizationApproach",
            values: { "rehost": 5, "replatform": 15, "refactor": 40, "not-sure": 20 },
        },
        {
            questionId: "cicd",
            values: { "yes-full": 0, "partial": 5, "no": 15 },
        },
        {
            questionId: "automatedTesting",
            values: { "comprehensive": 0, "some": 8, "none": 20 },
        },
        {
            questionId: "databaseMigration",
            values: { "azure-sql": 10, "cosmos": 20, "pg-mysql": 12, "none": 0 },
        },
        {
            questionId: "highAvailability",
            values: { "yes": 15, "standard": 5, "not-sure": 8 },
        },
        {
            questionId: "infrastructureAge",
            values: { "less-2": 0, "2-5": 5, "more-5": 15, "not-sure": 8 },
        },
        {
            questionId: "infrastructureType",
            values: { "vms": 10, "containers": 0, "serverless": 0, "not-sure": 5 },
        },
        {
            questionId: "currentSystems",
            multiSelect: { perItem: 3, maxPoints: 15 },
        },
        {
            questionId: "peakUsage",
            values: { "consistent": 0, "seasonal": 3, "unpredictable": 5, "not-sure": 5 },
        },
        {
            questionId: "sensitiveData",
            values: { "none": 0, "pii": 8, "financial": 12, "health": 18 },
        },
        {
            questionId: "complianceRequirements",
            multiSelect: { perItem: 5, maxPoints: 20 },
        },
    ],
    complexityRanges: [
        {
            label: "Low Complexity",
            min: 0, max: 70,
            mandayMin: 3, mandayMax: 5,
            servicePriceMin: 220, servicePriceMax: 290,
        },
        {
            label: "Medium Complexity",
            min: 71, max: 130,
            mandayMin: 6, mandayMax: 9,
            servicePriceMin: 290, servicePriceMax: 350,
        },
        {
            label: "High Complexity",
            min: 131, max: 200,
            mandayMin: 10, mandayMax: 14,
            servicePriceMin: 350, servicePriceMax: 410,
        },
        {
            label: "Enterprise Complexity",
            min: 201, max: ENTERPRISE_MAX,
            mandayMin: 14, mandayMax: null,
            servicePriceMin: 410, servicePriceMax: null,
        },
    ],
    findingRules: [
        {
            id: "no-source-code",
            condition: { questionId: "sourceCodeAccess", operator: "equals", value: "none" },
            finding: {
                id: "no-source-code",
                severity: "critical",
                title: "No Source Code Access",
                description: "Modernization without source code access requires reverse engineering or vendor engagement — significantly increases effort and risk.",
                businessImpact: "Project may require a discovery phase before any modernization work can begin.",
            },
        },
        {
            id: "refactor-complexity",
            condition: { questionId: "modernizationApproach", operator: "equals", value: "refactor" },
            finding: {
                id: "refactor-complexity",
                severity: "warning",
                title: "Full Refactoring — High Effort",
                description: "Refactoring to cloud-native architecture is the most complex modernization approach and requires significant development effort.",
                businessImpact: "Longer timeline and higher cost — but delivers greatest long-term cloud benefit.",
            },
        },
        {
            id: "legacy-apps",
            condition: { questionId: "appAge", operator: "equals", value: "more-7" },
            finding: {
                id: "legacy-apps",
                severity: "warning",
                title: "Legacy Applications",
                description: "Applications older than 7 years may have undocumented dependencies and outdated frameworks that complicate migration.",
                businessImpact: "Additional discovery effort required to map dependencies before modernization.",
            },
        },
        {
            id: "no-cicd",
            condition: { questionId: "cicd", operator: "equals", value: "no" },
            finding: {
                id: "no-cicd",
                severity: "warning",
                title: "No CI/CD Pipeline",
                description: "Manual deployments increase risk during modernization. A CI/CD pipeline should be established early in the engagement.",
            },
        },
        {
            id: "no-testing",
            condition: { questionId: "automatedTesting", operator: "equals", value: "none" },
            finding: {
                id: "no-testing",
                severity: "warning",
                title: "No Automated Testing",
                description: "Without automated tests, validating modernized applications is manual and error-prone.",
                businessImpact: "Higher risk of regressions and quality issues after modernization.",
            },
        },
        {
            id: "cosmos-complexity",
            condition: { questionId: "databaseMigration", operator: "equals", value: "cosmos" },
            finding: {
                id: "cosmos-complexity",
                severity: "info",
                title: "Cosmos DB Migration",
                description: "Migrating to Cosmos DB requires data model redesign for NoSQL — not a simple lift-and-shift.",
            },
        },
        {
            id: "partial-source-code",
            condition: { questionId: "sourceCodeAccess", operator: "equals", value: "partial" },
            finding: {
                id: "partial-source-code",
                severity: "warning",
                title: "Partial Source Code Access",
                description: "Not all application components are available for modification."
            },
        },
        {
            id: "high-app-count",
            condition: { questionId: "appCount", operator: "equals", value: "10+" },
            finding: {
                id: "high-app-count",
                severity: "warning",
                title: "Large Application Portfolio",
                description: "More than 10 applications require a portfolio prioritisation exercise before modernization begins.",
                businessImpact: "Not all applications may have equal business value — focus on high-impact ones first.",
            },
        },
        {
            id: "ha-required",
            condition: { questionId: "highAvailability", operator: "equals", value: "yes" },
            finding: {
                id: "ha-required",
                severity: "info",
                title: "High Availability Required",
                description: "99.9%+ uptime requires multi-region or availability zone deployment design.",
            },
        },
        {
            id: "legacy-infra-mod",
            condition: { questionId: "infrastructureAge", operator: "equals", value: "more-5" },
            finding: {
                id: "legacy-infra-mod",
                severity: "warning",
                title: "Ageing Infrastructure",
                description: "Infrastructure older than 5 years often runs on outdated OS or frameworks — may need upgrades before modernization.",
                businessImpact: "Older environments require additional assessment effort before modernization can begin.",
            },
        },
        {
            id: "unpredictable-traffic",
            condition: { questionId: "peakUsage", operator: "equals", value: "unpredictable" },
            finding: {
                id: "unpredictable-traffic",
                severity: "info",
                title: "Unpredictable Usage Spikes",
                description: "Cloud-native auto-scaling is particularly valuable for this workload pattern — serverless or AKS with HPA recommended.",
            },
        },
        {
            id: "sensitive-health-mod",
            condition: { questionId: "sensitiveData", operator: "equals", value: "health" },
            finding: {
                id: "sensitive-health-mod",
                severity: "critical",
                title: "Health Data — Compliance Controls Mandatory",
                description: "Modernized applications handling health data must maintain encryption, audit logging, and access controls in the new architecture.",
                businessImpact: "Non-compliant architecture for health data carries severe regulatory risk.",
            },
        },
        {
            id: "compliance-mod",
            condition: {
                questionId: "complianceRequirements", operator: "containsAny", value: ["gdpr", "iso27001", "pci-dss", "hipaa", "nca"],
            },
            finding: {
                id: "compliance-mod",
                severity: "warning",
                title: "Compliance Requirements Apply",
                description: "Modernized architecture must map regulatory controls to Azure services — Azure Policy and Defender for Cloud will be configured.",
            },
        },
    ],
    recommendationRules: [
        {
            id: "azure-app-service",
            condition: {
                or: [
                    { questionId: "modernizationApproach", operator: "equals", value: "rehost" },
                    { questionId: "modernizationApproach", operator: "equals", value: "replatform" },
                ],
            },
            recommendation: {
                service: "Azure App Service",
                outcome: "Managed hosting for web applications with auto-scaling and built-in CI/CD.",
                whyItFits: "Ideal for rehost/replatform — minimal code change with immediate cloud benefits.",
                priority: "critical",
            },
        },
        {
            id: "aks",
            condition: { questionId: "modernizationApproach", operator: "equals", value: "refactor" },
            recommendation: {
                service: "Azure Kubernetes Service (AKS)",
                outcome: "Container orchestration for cloud-native, microservices architecture.",
                whyItFits: "Refactored applications benefit from containerisation and orchestration at scale.",
                priority: "critical",
            },
        },
        {
            id: "azure-devops",
            condition: {
                or: [
                    { questionId: "cicd", operator: "equals", value: "no" },
                    { questionId: "cicd", operator: "equals", value: "partial" },
                ],
            },
            recommendation: {
                service: "Azure DevOps",
                outcome: "End-to-end CI/CD pipelines, source control, and release management.",
                whyItFits: "Establishes automated deployment pipeline — reduces risk during and after modernization.",
                priority: "high",
            },
        },
        {
            id: "azure-sql",
            condition: { questionId: "databaseMigration", operator: "equals", value: "azure-sql" },
            recommendation: {
                service: "Azure SQL Database",
                outcome: "Fully managed SQL database with built-in HA, backups, and scaling.",
                whyItFits: "Direct migration path from SQL Server — minimal application code changes.",
                priority: "critical",
            },
        },
        {
            id: "cosmos-db",
            condition: { questionId: "databaseMigration", operator: "equals", value: "cosmos" },
            recommendation: {
                service: "Azure Cosmos DB",
                outcome: "Globally distributed NoSQL database for modern cloud-native applications.",
                whyItFits: "Best for applications requiring flexible schema and global scale.",
                priority: "critical",
            },
        },
        {
            id: "azure-monitor",
            condition: { questionId: "highAvailability", operator: "equals", value: "yes" },
            recommendation: {
                service: "Azure Monitor + Application Insights",
                outcome: "Full observability — performance monitoring, alerting, and diagnostics.",
                whyItFits: "99.9%+ SLA requires proactive monitoring and rapid incident response.",
                priority: "high",
            },
        },
        {
            id: "azure-container-registry",
            condition: { questionId: "modernizationApproach", operator: "equals", value: "refactor" },
            recommendation: {
                service: "Azure Container Registry",
                outcome: "Private container registry for storing and managing Docker images.",
                whyItFits: "Required for containerised workloads deployed to AKS.",
                priority: "medium",
            },
        },
        {
            id: "testing-foundation",
            condition: { questionId: "automatedTesting", operator: "equals", value: "none" },
            recommendation: {
                service: "Azure Test Plans",
                outcome: "Establish repeatable testing and validation processes.",
                whyItFits: "Modernization without automated testing significantly increases deployment risk.",
                priority: "high"
            },
        },
    ],
    prerequisiteRules: [
        {
            id: "vendor-engagement",
            condition: { questionId: "sourceCodeAccess", operator: "equals", value: "none" },
            prerequisite: {
                title: "Vendor / Third-Party Engagement",
                description: "Engage application vendor to obtain source code access or migration support agreement.",
                effort: "high",
            },
        },
        {
            id: "app-portfolio-assessment",
            condition: { questionId: "appCount", operator: "equals", value: "10+" },
            prerequisite: {
                title: "Application Portfolio Prioritisation",
                description: "Classify all applications by business value and modernization complexity before beginning.",
                effort: "medium",
            },
        },
        {
            id: "dependency-mapping",
            condition: { questionId: "appAge", operator: "equals", value: "more-7" },
            prerequisite: {
                title: "Dependency Mapping",
                description: "Document all application dependencies, integrations, and third-party components.",
                effort: "medium",
            },
        },
        {
            id: "test-baseline",
            condition: { questionId: "automatedTesting", operator: "equals", value: "none" },
            prerequisite: {
                title: "Test Baseline Creation",
                description: "Create minimum manual test cases to validate application functionality post-modernization.",
                effort: "medium",
            },
        },
    ],
    baseDeliverables: [
        {
            title: "Application Assessment Report",
            description: "Technical assessment of all in-scope applications with modernization recommendations.",
        },
        {
            title: "Modernization Roadmap",
            description: "Prioritised plan for application modernization with timelines and effort estimates.",
        },
        {
            title: "Post-Modernization Validation",
            description: "Functional and performance validation of modernized applications in Azure.",
        },
    ],
    conditionalDeliverables: [
        {
            id: "containerisation",
            condition: { questionId: "modernizationApproach", operator: "equals", value: "refactor" },
            deliverable: {
                title: "Containerisation & AKS Deployment",
                description: "Docker containerisation of applications and deployment to Azure Kubernetes Service.",
            },
        },
        {
            id: "cicd-setup",
            condition: {
                or: [
                    { questionId: "cicd", operator: "equals", value: "no" },
                    { questionId: "cicd", operator: "equals", value: "partial" },
                ],
            },
            deliverable: {
                title: "CI/CD Pipeline Setup",
                description: "Automated build, test, and deployment pipeline for modernized applications.",
            },
        },
        {
            id: "database-migration-deliverable",
            condition: {
                or: [
                    { questionId: "databaseMigration", operator: "equals", value: "azure-sql" },
                    { questionId: "databaseMigration", operator: "equals", value: "cosmos" },
                    { questionId: "databaseMigration", operator: "equals", value: "pg-mysql" },
                ],
            },
            deliverable: {
                title: "Database Migration & Validation",
                description: "Schema migration, data transfer, and integrity validation for target Azure database.",
            },
        },
        {
            id: "ha-design",
            condition: { questionId: "highAvailability", operator: "equals", value: "yes" },
            deliverable: {
                title: "High Availability Architecture Design",
                description: "Multi-zone or multi-region design with failover configuration and SLA documentation.",
            },
        },
        {
            id: "compliance-deliverable",
            condition: { questionId: "complianceRequirements", operator: "containsAny", value: ["gdpr", "iso27001", "pci-dss", "hipaa", "nca"] },
            deliverable: {
                title: "Compliance Baseline Configuration",
                description: "Azure Policy and Defender for Cloud setup aligned to required compliance frameworks.",
            },
        },
    ],
};
