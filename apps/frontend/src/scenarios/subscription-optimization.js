import { ENTERPRISE_MAX } from "../engine/scenarioEngine";
export const subscriptionOptimizationScenario = {
    id: "subscription-optimization",
    version: "1.0.0",
    name: "Cloud Subscription Optimization",
    description: "Reduce Azure costs and improve efficiency across your cloud environment.",
    icon: "trending-down",
    pricing: {
        currency: "USD",
        note: "Indicative only — final pricing subject to discovery workshop",
    },
    questions: [
        {
            id: "monthlySpend",
            text: "What is your current monthly Azure spend?",
            type: "singleChoice",
            required: true,
            criticalForConfidence: true,
            options: [
                { value: "less-1000", label: "Less than $1,000" },
                { value: "1000-5000", label: "$1,000 – $5,000" },
                { value: "5000-20000", label: "$5,000 – $20,000", driverLabel: "$5K–$20K Monthly Spend" },
                { value: "20000+", label: "More than $20,000", driverLabel: "$20K+ Monthly Azure Spend" },
            ],
        },
        {
            id: "azureTenure",
            text: "How long have you been running on Azure?",
            type: "singleChoice",
            required: true,
            options: [
                { value: "less-6m", label: "Less than 6 months" },
                { value: "6m-2y", label: "6 months – 2 years" },
                { value: "2y+", label: "More than 2 years" },
            ],
        },
        {
            id: "resourceCount",
            text: "Approximately how many Azure resources exist?",
            type: "singleChoice",
            required: true,
            criticalForConfidence: true,
            options: [
                { value: "less-50", label: "Less than 50" },
                { value: "50-200", label: "50–200" },
                { value: "200-1000", label: "200–1000", driverLabel: "200–1000 Azure Resources" },
                { value: "1000+", label: "More than 1000", driverLabel: "1000+ Azure Resources" },
            ],
        },
        {
            id: "costConcern",
            text: "What is your biggest cost concern? (select all that apply)",
            type: "multiChoice",
            required: false,
            options: [
                { value: "compute", label: "Compute (VMs) costs" },
                { value: "storage", label: "Storage costs" },
                { value: "network", label: "Networking / data transfer" },
                { value: "licensing", label: "Licensing costs" },
                { value: "not-sure", label: "Not sure where costs are coming from" },
            ],
        },
        {
            id: "reservedInstances",
            text: "Do you use Reserved Instances or Savings Plans?",
            type: "singleChoice",
            required: true,
            options: [
                { value: "extensively", label: "Yes, extensively" },
                { value: "some", label: "Some reservations in place" },
                { value: "none", label: "No, all pay-as-you-go", driverLabel: "No Reserved Instances" },
            ],
        },
        {
            id: "optimizationConfidence",
            text: "How confident are you that your Azure environment is optimized?",
            type: "singleChoice",
            required: true,
            options: [
                { value: "very", label: "Very confident" },
                { value: "somewhat", label: "Somewhat confident" },
                { value: "not-confident", label: "Not confident" },
                { value: "not-sure", label: "Not sure" },
            ],
        },
        {
            id: "costAlerts",
            text: "Do you have cost alerts or budgets configured?",
            type: "singleChoice",
            required: true,
            options: [
                { value: "automated", label: "Yes, with automated alerts" },
                { value: "basic", label: "Basic budgets only" },
                { value: "none", label: "No cost monitoring" },
            ],
        },
        {
            id: "hybridBenefit",
            text: "Do you use Azure Hybrid Benefit for Windows/SQL licensing?",
            type: "singleChoice",
            required: false,
            options: [
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
                { value: "not-applicable", label: "Not applicable / Not sure" },
            ],
        },
        {
            id: "autoScaling",
            text: "Do you have auto-scaling configured for your workloads?",
            type: "singleChoice",
            required: true,
            options: [
                { value: "most", label: "Yes, for most workloads" },
                { value: "some", label: "For some workloads" },
                { value: "no", label: "No" },
            ],
        },
        {
            id: "taggingStrategy",
            text: "Do you have a tagging strategy for cost allocation?",
            type: "singleChoice",
            required: true,
            options: [
                { value: "consistent", label: "Yes, consistent tagging" },
                { value: "partial", label: "Partial tagging" },
                { value: "none", label: "No tagging" },
            ],
        },
        {
            id: "currentSystems",
            text: "Which workloads are running in your Azure environment? (select all that apply)",
            type: "multiChoice",
            required: false,
            options: [
                { value: "vms", label: "Virtual Machines" },
                { value: "databases", label: "Databases" },
                { value: "web-apps", label: "Web Applications" },
                { value: "storage", label: "Storage" },
                { value: "aks", label: "Containers / Kubernetes" },
                { value: "other", label: "Other / Not sure" },
            ],
        },
        {
            id: "optimizationPriority",
            text: "What matters most to your organisation?",
            type: "singleChoice",
            required: false,
            options: [
                { value: "lowest-cost", label: "Lowest cost — minimize cloud spend" },
                { value: "performance", label: "Best performance — speed and reliability" },
                { value: "security", label: "Maximum security — data protection first" },
                { value: "balanced", label: "Balanced — good mix of all factors" },
            ],
        },
    ],
    scoringRules: [
        {
            questionId: "monthlySpend",
            values: { "less-1000": 5, "1000-5000": 10, "5000-20000": 20, "20000+": 30 },
        },
        {
            questionId: "azureTenure",
            values: { "less-6m": 0, "6m-2y": 5, "2y+": 10 },
        },
        {
            questionId: "resourceCount",
            values: { "less-50": 5, "50-200": 10, "200-1000": 20, "1000+": 30 },
        },
        {
            questionId: "reservedInstances",
            values: { "extensively": 0, "some": 8, "none": 20 },
        },
        {
            questionId: "optimizationConfidence",
            values: { "very": 0, "somewhat": 10, "not-confident": 15, "not-sure": 15 },
        },
        {
            questionId: "costAlerts",
            values: { "automated": 0, "basic": 8, "none": 20 },
        },
        {
            questionId: "hybridBenefit",
            values: { "yes": 0, "no": 15, "not-applicable": 0 },
        },
        {
            questionId: "autoScaling",
            values: { "most": 0, "some": 8, "no": 15 },
        },
        {
            questionId: "taggingStrategy",
            values: { "consistent": 0, "partial": 8, "none": 15 },
        },
        {
            questionId: "costConcern",
            multiSelect: { perItem: 3, maxPoints: 12 },
        },
        {
            questionId: "currentSystems",
            multiSelect: { perItem: 1, maxPoints: 5 },
        },
    ],
    complexityRanges: [
        {
            label: "Low Complexity",
            min: 0, max: 40,
            mandayMin: 1, mandayMax: 2,
            servicePriceMin: 80, servicePriceMax: 150,
        },
        {
            label: "Medium Complexity",
            min: 41, max: 90,
            mandayMin: 3, mandayMax: 4,
            servicePriceMin: 150, servicePriceMax: 220,
        },
        {
            label: "High Complexity",
            min: 91, max: 150,
            mandayMin: 5, mandayMax: 7,
            servicePriceMin: 220, servicePriceMax: 280,
        },
        {
            label: "Enterprise Complexity",
            min: 151, max: ENTERPRISE_MAX,
            mandayMin: 7, mandayMax: null,
            servicePriceMin: 280, servicePriceMax: null,
        },
    ],
    findingRules: [
        {
            id: "no-reservations",
            condition: { questionId: "reservedInstances", operator: "equals", value: "none" },
            finding: {
                id: "no-reservations",
                severity: "critical",
                title: "No Reserved Instances or Savings Plans",
                description: "All compute is running on pay-as-you-go pricing — Reserved Instances or Savings Plans typically reduce compute costs by 30–60%.",
                businessImpact: "Significant cost savings opportunity with minimal operational change.",
            },
        },
        {
            id: "no-cost-monitoring",
            condition: { questionId: "costAlerts", operator: "equals", value: "none" },
            finding: {
                id: "no-cost-monitoring",
                severity: "warning",
                title: "No Cost Monitoring",
                description: "Without budgets or alerts, cost overruns are detected only after billing — proactive monitoring is needed.",
                businessImpact: "Unexpected cost spikes go unnoticed until the monthly invoice arrives.",
            },
        },
        {
            id: "not-confident-optimization",
            condition: {
                or: [
                    { questionId: "optimizationConfidence", operator: "equals", value: "not-confident" },
                    { questionId: "optimizationConfidence", operator: "equals", value: "not-sure" },
                ],
            },
            finding: {
                id: "not-confident-optimization",
                severity: "warning",
                title: "Low Confidence in Optimization Level",
                description: "The organisation is not confident the environment is optimized — a full resource utilisation review is recommended.",
                businessImpact: "Likely unused or oversized resources contributing to unnecessary spend.",
            },
        },
        {
            id: "no-autoscaling",
            condition: { questionId: "autoScaling", operator: "equals", value: "no" },
            finding: {
                id: "no-autoscaling",
                severity: "warning",
                title: "No Auto-Scaling Configured",
                description: "Workloads are running at fixed capacity regardless of demand, leading to overprovisioning during low-usage periods.",
            },
        },
        {
            id: "no-hybrid-benefit",
            condition: { questionId: "hybridBenefit", operator: "equals", value: "no" },
            finding: {
                id: "no-hybrid-benefit",
                severity: "warning",
                title: "Azure Hybrid Benefit Not Applied",
                description: "Existing Windows Server / SQL Server licenses with Software Assurance can reduce Azure compute costs significantly via Hybrid Benefit.",
                businessImpact: "Potential savings of up to 40% on eligible Windows/SQL VM costs.",
            },
        },
        {
            id: "no-tagging",
            condition: { questionId: "taggingStrategy", operator: "equals", value: "none" },
            finding: {
                id: "no-tagging",
                severity: "info",
                title: "No Cost Allocation Tagging",
                description: "Without tags, costs cannot be broken down by department, project, or environment — limiting accountability.",
            },
        },
        {
            id: "unclear-cost-drivers",
            condition: { questionId: "costConcern", operator: "includes", value: "not-sure" },
            finding: {
                id: "unclear-cost-drivers",
                severity: "info",
                title: "Cost Drivers Not Identified",
                description: "The organisation is unsure which cost areas are driving spend — a cost breakdown analysis by service is needed first.",
            },
        },
        {
            id: "large-resource-count",
            condition: { questionId: "resourceCount", operator: "equals", value: "1000+" },
            finding: {
                id: "large-resource-count",
                severity: "info",
                title: "Large Resource Footprint",
                description: "Over 1000 resources requires automated tooling (e.g. Azure Advisor, scripts) rather than manual review for optimization.",
            },
        },
        {
            id: "high-spend",
            condition: { questionId: "monthlySpend", operator: "equals", value: "20000+" },
            finding: {
                id: "high-spend",
                severity: "info",
                title: "High Monthly Spend",
                description: "At this spend level, even small percentage savings translate to significant absolute cost reduction.",
            },
        },
        {
            id: "well-optimized",
            condition: { questionId: "optimizationConfidence", operator: "equals", value: "very" },
            finding: {
                id: "well-optimized",
                severity: "strength",
                title: "Environment Considered Well-Optimized",
                description: "The organisation reports high confidence in current optimization — assessment will focus on validation and incremental improvements.",
            },
        },
        {
            id: "good-reservations",
            condition: { questionId: "reservedInstances", operator: "equals", value: "extensively" },
            finding: {
                id: "good-reservations",
                severity: "strength",
                title: "Reserved Capacity Already in Use",
                description: "Reserved Instances or Savings Plans are already being used extensively — assessment will validate coverage and renewal timing.",
            },
        },
        {
            id: "security-first-priority",
            condition: { questionId: "optimizationPriority", operator: "equals", value: "security" },
            finding: {
                id: "security-first-priority",
                severity: "info",
                title: "Security is the Primary Priority",
                description: "Optimization recommendations will be filtered to prioritise secure configurations first — some cost savings options may be de-prioritised if they compromise security posture.",
            },
        },
    ],
    recommendationRules: [
        {
            id: "azure-advisor",
            condition: { questionId: "monthlySpend", operator: "exists", value: "" },
            recommendation: {
                service: "Azure Advisor",
                outcome: "Personalised recommendations for cost, performance, and reliability optimization.",
                whyItFits: "Provides the baseline recommendations engine for any cost optimization engagement.",
                priority: "critical",
            },
        },
        {
            id: "reserved-instances-rec",
            condition: { questionId: "reservedInstances", operator: "equals", value: "none" },
            recommendation: {
                service: "Azure Reservations / Savings Plans",
                outcome: "Committed-use discounts of 30–60% on predictable compute workloads.",
                whyItFits: "Highest-impact, lowest-effort cost reduction for stable workloads.",
                priority: "critical",
            },
        },
        {
            id: "cost-management",
            condition: { questionId: "costAlerts", operator: "equals", value: "none" },
            recommendation: {
                service: "Microsoft Cost Management + Billing",
                outcome: "Budgets, alerts, and cost analysis dashboards by subscription, resource group, and tag.",
                whyItFits: "Establishes ongoing cost visibility and prevents future overruns.",
                priority: "high",
            },
        },
        {
            id: "autoscale-rec",
            condition: { questionId: "autoScaling", operator: "equals", value: "no" },
            recommendation: {
                service: "Azure Autoscale / VMSS",
                outcome: "Dynamic scaling of compute resources based on demand, reducing idle capacity costs.",
                whyItFits: "Reduces spend during low-traffic periods without manual intervention.",
                priority: "high",
            },
        },
        {
            id: "hybrid-benefit-rec",
            condition: { questionId: "hybridBenefit", operator: "equals", value: "no" },
            recommendation: {
                service: "Azure Hybrid Benefit",
                outcome: "Apply existing on-premises Windows/SQL licenses to Azure VMs for reduced compute rates.",
                whyItFits: "Immediate cost reduction for eligible workloads with no architecture change required.",
                priority: "high",
            },
        },
        {
            id: "resource-graph",
            condition: { questionId: "resourceCount", operator: "equals", value: "1000+" },
            recommendation: {
                service: "Azure Resource Graph",
                outcome: "Query-based inventory and analysis across all resources and subscriptions at scale.",
                whyItFits: "Manual review is impractical at 1000+ resources — Resource Graph enables automated analysis.",
                priority: "medium",
            },
        },
        {
            id: "tagging-policy",
            condition: { questionId: "taggingStrategy", operator: "equals", value: "none" },
            recommendation: {
                service: "Azure Policy — Tagging Enforcement",
                outcome: "Enforced tagging standards for cost allocation, ownership, and environment tracking.",
                whyItFits: "Enables cost accountability by department/project going forward.",
                priority: "medium",
            },
        },
        {
            id: "network-cost-rec",
            condition: { questionId: "costConcern", operator: "includes", value: "network" },
            recommendation: {
                service: "Azure CDN + ExpressRoute Cost Review",
                outcome: "Reduced data transfer and egress costs through caching and peering optimization.",
                whyItFits: "Networking and data transfer were flagged as a top cost concern — these are common areas of hidden spend.",
                priority: "medium",
            },
        },
        {
            id: "storage-cost-rec",
            condition: { questionId: "costConcern", operator: "includes", value: "storage" },
            recommendation: {
                service: "Azure Storage Lifecycle Management",
                outcome: "Automated tiering of blob storage to Cool/Archive tiers based on access patterns.",
                whyItFits: "Storage was flagged as a cost concern — lifecycle policies typically cut storage costs by 30-50% for infrequently accessed data.",
                priority: "medium",
            },
        },
        {
            id: "licensing-cost-rec",
            condition: { questionId: "costConcern", operator: "includes", value: "licensing" },
            recommendation: {
                service: "Microsoft Cost Management — Licensing Review",
                outcome: "Review of licensing SKUs (SQL, Windows, M365) against actual usage to eliminate over-licensing.",
                whyItFits: "Licensing was flagged as a cost concern — often the largest line item after compute.",
                priority: "medium",
            },
        },
    ],
    prerequisiteRules: [
        {
            id: "billing-access",
            condition: { questionId: "monthlySpend", operator: "exists", value: "" },
            prerequisite: {
                title: "Billing & Cost Data Access",
                description: "Provide read access to Cost Management data and billing exports for the assessment period.",
                effort: "low",
            },
        },
        {
            id: "resource-inventory-opt",
            condition: { questionId: "resourceCount", operator: "equals", value: "1000+" },
            prerequisite: {
                title: "Resource Inventory Export",
                description: "Export full resource inventory across all subscriptions for automated analysis.",
                effort: "low",
            },
        },
        {
            id: "licensing-docs",
            condition: { questionId: "hybridBenefit", operator: "equals", value: "not-applicable" },
            prerequisite: {
                title: "Licensing Documentation Review",
                description: "Review existing Windows Server / SQL Server license agreements to determine Hybrid Benefit eligibility.",
                effort: "low",
            },
        },
    ],
    baseDeliverables: [
        {
            title: "Cost Optimization Report",
            description: "Analysis of current spend by service, with identified savings opportunities ranked by impact and effort.",
        },
        {
            title: "Reserved Capacity Recommendations",
            description: "Specific Reserved Instance / Savings Plan recommendations with projected savings.",
        },
        {
            title: "Cost Governance Setup",
            description: "Budgets, alerts, and cost allocation tagging policy configured in Microsoft Cost Management.",
        },
    ],
    conditionalDeliverables: [
        {
            id: "rightsizing-report",
            condition: {
                or: [
                    { questionId: "optimizationConfidence", operator: "equals", value: "not-confident" },
                    { questionId: "optimizationConfidence", operator: "equals", value: "not-sure" },
                ],
            },
            deliverable: {
                title: "Resource Right-Sizing Report",
                description: "Identification of oversized, idle, or unused resources with right-sizing recommendations.",
            },
        },
        {
            id: "autoscale-config",
            condition: { questionId: "autoScaling", operator: "equals", value: "no" },
            deliverable: {
                title: "Auto-Scaling Configuration",
                description: "Auto-scale rules configured for eligible compute workloads based on observed usage patterns.",
            },
        },
        {
            id: "large-scale-tooling",
            condition: { questionId: "resourceCount", operator: "equals", value: "1000+" },
            deliverable: {
                title: "Automated Cost Analysis Tooling",
                description: "Azure Resource Graph queries and Workbooks for ongoing large-scale cost analysis.",
            },
        },
    ],
};
