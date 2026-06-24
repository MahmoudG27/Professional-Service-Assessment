import { ScenarioDefinition } from "../types/scenario";
import { ENTERPRISE_MAX } from "../engine/scenarioEngine";

export const securityAssessmentScenario: ScenarioDefinition = {
  id: "security-assessment",
  version: "1.0.0",
  name: "Security Assessment for Cloud Environment",
  description: "Evaluate cloud security posture, identity controls, and compliance readiness.",
  icon: "shield-lock",
  pricing: {
    currency: "USD",
    note: "Indicative only — final pricing subject to discovery workshop",
  },

  questions: [
    {
      id: "cloudEnvironment",
      text: "Where are your workloads hosted?",
      type: "singleChoice",
      required: true,
      options: [
        { value: "azure",   label: "Microsoft Azure only" },
        { value: "hybrid",  label: "Hybrid (Azure + On-Premises)" },
      ],
    },
    {
      id: "cloudSubscriptions",
      text: "How many cloud subscriptions / accounts are included in the assessment?",
      type: "singleChoice",
      required: true,
      criticalForConfidence: true,
      options: [
        { value: "1",    label: "1" },
        { value: "2-5",  label: "2–5" },
        { value: "6-10", label: "6–10",                     driverLabel: "6–10 Cloud Subscriptions" },
        { value: "10+",  label: "More than 10",             driverLabel: "10+ Cloud Subscriptions" },
      ],
    },
    {
      id: "securityPosture",
      text: "What is your current cloud security posture?",
      type: "singleChoice",
      required: true,
      criticalForConfidence: true,
      options: [
        { value: "basic",         label: "Basic controls in place" },
        { value: "comprehensive", label: "Comprehensive security program" },
        { value: "not-sure",      label: "Not sure" },
        { value: "none", label: "No formal security controls", driverLabel: "No Security Controls" },
      ],
    },
    {
      id: "siem",
      text: "Do you have a Security Information and Event Management (SIEM) solution?",
      type: "singleChoice",
      required: true,
      options: [
        { value: "yes-full", label: "Yes, fully implemented" },
        { value: "partial",  label: "Partial implementation" },
        { value: "no",       label: "No" },
      ],
    },
    {
      id: "iamMaturity",
      text: "How do you currently manage identity and access?",
      type: "singleChoice",
      required: true,
      options: [
        { value: "no-system", label: "No formal IAM system", driverLabel: "No IAM System" },
        { value: "passwords",  label: "Basic passwords only" },
        { value: "azure-ad",   label: "Azure AD / Entra ID" },
        { value: "third-party", label: "Third-party identity provider" },
      ],
    },
    {
      id: "mfaStatus",
      text: "Do you have Multi-Factor Authentication (MFA) enabled?",
      type: "singleChoice",
      required: true,
      options: [
        { value: "all-users",  label: "Yes, for all users" },
        { value: "some-users", label: "Yes, for some users" },
        { value: "no",   label: "No",                       driverLabel: "No MFA Enabled" },
      ],
    },
    {
      id: "previousIncidents",
      text: "Have you had a security incident or data breach in the past 2 years?",
      type: "singleChoice",
      required: false,
      options: [
        { value: "yes",  label: "Yes",                      driverLabel: "Previous Security Incident" },
        { value: "no",               label: "No" },
        { value: "prefer-not-to-say", label: "Prefer not to say" },
      ],
    },
    {
      id: "complianceFrameworks",
      text: "What compliance frameworks do you need to meet? (select all that apply)",
      type: "multiChoice",
      required: false,
      options: [
        { value: "gdpr",     label: "GDPR" },
        { value: "iso27001", label: "ISO 27001" },
        { value: "pci-dss",  label: "PCI-DSS" },
        { value: "hipaa",    label: "HIPAA" },
        { value: "nca",      label: "NCA (Saudi)" },
        { value: "none",     label: "None currently required" },
      ],
    },
    {
      id: "networkSegmentation",
      text: "Do you have network segmentation in place?",
      type: "singleChoice",
      required: true,
      options: [
        { value: "strict",  label: "Yes, strict segmentation" },
        { value: "partial", label: "Partial segmentation" },
        { value: "none",    label: "No segmentation" },
      ],
    },
    {
      id: "vulnerabilityScanning",
      text: "Do you have vulnerability scanning or penetration testing?",
      type: "singleChoice",
      required: true,
      options: [
        { value: "regular",     label: "Yes, regularly performed" },
        { value: "occasionally", label: "Occasionally" },
        { value: "never",       label: "Never" },
      ],
    },
    {
      id: "dataEncryption",
      text: "Do you have data encryption at rest and in transit?",
      type: "singleChoice",
      required: true,
      options: [
        { value: "both",    label: "Yes, both" },
        { value: "partial", label: "Partial" },
        { value: "no",      label: "No" },
      ],
    },
    {
      id: "incidentResponsePlan",
      text: "Do you have a defined incident response plan?",
      type: "singleChoice",
      required: true,
      options: [
        { value: "documented-tested", label: "Yes, documented and tested" },
        { value: "documented-only",   label: "Documented but not tested" },
        { value: "no",                label: "No" },
      ],
    },
  ],

  scoringRules: [
    {
      questionId: "cloudSubscriptions",
      values: { "1": 5, "2-5": 15, "6-10": 30, "10+": 50 },
    },
    {
      questionId: "securityPosture",
      values: { "none": 30, "basic": 20, "comprehensive": 5, "not-sure": 30 },
    },
    {
      questionId: "siem",
      values: { "yes-full": 0, "partial": 10, "no": 20 },
    },
    {
      questionId: "iamMaturity",
      values: { "no-system": 25, "passwords": 20, "azure-ad": 5, "third-party": 12 },
    },
    {
      questionId: "mfaStatus",
      values: { "all-users": 0, "some-users": 15, "no": 25 },
    },
    {
      questionId: "previousIncidents",
      values: { "yes": 15, "no": 0, "prefer-not-to-say": 5 },
    },
    {
      questionId: "complianceFrameworks",
      multiSelect: { perItem: 5, maxPoints: 20 },
    },
    {
      questionId: "networkSegmentation",
      values: { "strict": 0, "partial": 10, "none": 20 },
    },
    {
      questionId: "vulnerabilityScanning",
      values: { "regular": 0, "occasionally": 10, "never": 20 },
    },
    {
      questionId: "dataEncryption",
      values: { "both": 0, "partial": 15, "no": 25 },
    },
    {
      questionId: "incidentResponsePlan",
      values: { "documented-tested": 0, "documented-only": 8, "no": 20 },
    },
    {
      questionId: "cloudEnvironment",
      values: { azure: 0, hybrid: 10 },
    },
  ],

  complexityRanges: [
    {
      label: "Low Complexity",
      min: 0, max: 70,
      mandayMin: 2, mandayMax: 4,
      servicePriceMin: 180, servicePriceMax: 260,
    },
    {
      label: "Medium Complexity",
      min: 71, max: 130,
      mandayMin: 5, mandayMax: 7,
      servicePriceMin: 260, servicePriceMax: 340,
    },
    {
      label: "High Complexity",
      min: 131, max: 190,
      mandayMin: 8, mandayMax: 11,
      servicePriceMin: 340, servicePriceMax: 420,
    },
    {
      label: "Enterprise Complexity",
      min: 191, max: ENTERPRISE_MAX,
      mandayMin: 11, mandayMax: null,
      servicePriceMin: 420, servicePriceMax: null,
    },
  ],

  findingRules: [
    {
      id: "no-security-controls",
      condition: { questionId: "securityPosture", operator: "equals", value: "none" },
      finding: {
        id: "no-security-controls",
        severity: "critical",
        title: "No Formal Security Controls",
        description: "No structured security controls are currently in place across the cloud environment.",
        businessImpact: "High exposure to unauthorised access, data breaches, and compliance violations.",
      },
    },
    {
      id: "no-iam",
      condition: { questionId: "iamMaturity", operator: "equals", value: "no-system" },
      finding: {
        id: "no-iam",
        severity: "critical",
        title: "No Formal Identity and Access Management",
        description: "No IAM system detected — access to cloud resources is not centrally controlled or audited.",
        businessImpact: "Unauthorised access to sensitive systems and data could lead to breaches and reputational damage.",
      },
    },
    {
      id: "no-mfa",
      condition: { questionId: "mfaStatus", operator: "equals", value: "no" },
      finding: {
        id: "no-mfa",
        severity: "critical",
        title: "No Multi-Factor Authentication",
        description: "MFA is not enabled for any users — a primary control against credential-based attacks is missing.",
        businessImpact: "Credential theft can lead directly to account compromise without MFA in place.",
      },
    },
    {
      id: "partial-mfa",
      condition: { questionId: "mfaStatus", operator: "equals", value: "some-users" },
      finding: {
        id: "partial-mfa",
        severity: "warning",
        title: "MFA Not Enforced for All Users",
        description: "MFA is enabled for some users only — privileged accounts without MFA represent a high-risk gap.",
      },
    },
    {
      id: "no-encryption",
      condition: { questionId: "dataEncryption", operator: "equals", value: "no" },
      finding: {
        id: "no-encryption",
        severity: "critical",
        title: "No Data Encryption",
        description: "Data is not encrypted at rest or in transit, exposing sensitive information to interception or unauthorised access.",
        businessImpact: "Significant compliance risk for any regulated data (GDPR, HIPAA, PCI-DSS).",
      },
    },
    {
      id: "partial-encryption",
      condition: { questionId: "dataEncryption", operator: "equals", value: "partial" },
      finding: {
        id: "partial-encryption",
        severity: "warning",
        title: "Partial Data Encryption",
        description: "Some data is unencrypted at rest or in transit — gaps must be identified and remediated.",
      },
    },
    {
      id: "no-segmentation",
      condition: { questionId: "networkSegmentation", operator: "equals", value: "none" },
      finding: {
        id: "no-segmentation",
        severity: "warning",
        title: "No Network Segmentation",
        description: "Flat network architecture allows lateral movement in the event of a breach.",
        businessImpact: "A single compromised resource could expose the entire environment.",
      },
    },
    {
      id: "no-vuln-scanning",
      condition: { questionId: "vulnerabilityScanning", operator: "equals", value: "never" },
      finding: {
        id: "no-vuln-scanning",
        severity: "warning",
        title: "No Vulnerability Scanning",
        description: "Without regular vulnerability scanning, unpatched systems and misconfigurations go undetected.",
      },
    },
    {
      id: "no-incident-response",
      condition: { questionId: "incidentResponsePlan", operator: "equals", value: "no" },
      finding: {
        id: "no-incident-response",
        severity: "critical",
        title: "No Incident Response Plan",
        description: "No documented incident response plan exists, increasing response time and impact of any security incident.",
        businessImpact: "Delayed incident response increases breach cost and regulatory exposure.",
      },
    },
    {
      id: "untested-ir-plan",
      condition: { questionId: "incidentResponsePlan", operator: "equals", value: "documented-only" },
      finding: {
        id: "untested-ir-plan",
        severity: "info",
        title: "Incident Response Plan Not Tested",
        description: "A documented IR plan exists but has not been tested via tabletop exercise or simulation.",
      },
    },
    {
      id: "previous-incident",
      condition: { questionId: "previousIncidents", operator: "equals", value: "yes" },
      finding: {
        id: "previous-incident",
        severity: "warning",
        title: "Previous Security Incident",
        description: "A security incident or breach occurred within the past 2 years — root cause and remediation status should be reviewed.",
      },
    },
    {
      id: "multi-subscription-sprawl",
      condition: { questionId: "cloudSubscriptions", operator: "equals", value: "10+" },
      finding: {
        id: "multi-subscription-sprawl",
        severity: "warning",
        title: "Large Number of Cloud Subscriptions",
        description: "More than 10 subscriptions/accounts increases governance complexity and risk of inconsistent security policy application.",
        businessImpact: "Centralised policy management (Azure Policy, Management Groups) becomes essential at this scale.",
      },
    },
    {
      id: "multiple-compliance-frameworks",
      condition: { questionId: "complianceFrameworks", operator: "containsAny", value: ["gdpr", "iso27001", "pci-dss", "hipaa", "nca"] },
      finding: {
        id: "multiple-compliance-frameworks",
        severity: "info",
        title: "Compliance Framework Alignment Required",
        description: "One or more compliance frameworks apply — assessment will map current controls against required framework controls.",
      },
    },
    {
      id: "comprehensive-posture",
      condition: { questionId: "securityPosture", operator: "equals", value: "comprehensive" },
      finding: {
        id: "comprehensive-posture",
        severity: "strength",
        title: "Mature Security Program",
        description: "A comprehensive security program is already in place — assessment will focus on optimisation and gap closure.",
      },
    },
    {
      id: "hybrid-security",
      condition: { questionId: "cloudEnvironment", operator: "includes", value: "hybrid" },
      finding: {
        id: "hybrid-security",
        severity: "info",
        title: "Hybrid Environment — Extended Assessment Scope",
        description:
          "On-premises components must be included in the security assessment alongside Azure workloads.",
      },
    },
    {
      id: "security-maturity",
      condition: {
        and: [
          { questionId: "mfaStatus", operator: "equals", value: "all-users" },
          { questionId: "dataEncryption", operator: "equals", value: "both" },
          { questionId: "vulnerabilityScanning", operator: "equals", value: "regular" },
          { questionId: "incidentResponsePlan", operator: "equals", value: "documented-tested" },
        ],
      },
      finding: {
        id: "security-maturity",
        severity: "strength",
        title: "Strong Security Foundations",
        description:
          "Core security controls including MFA, encryption, vulnerability management, and incident response are already established.",
        businessImpact:
          "Assessment can focus on advanced hardening, governance, and optimisation rather than foundational controls.",
      },
    },
    {
      id: "no-siem",
      condition: {
        questionId: "siem",
        operator: "equals",
        value: "no"
      },
      finding: {
        id: "no-siem",
        severity: "warning",
        title: "No Centralised Security Monitoring",
        description:
          "No SIEM platform is in place to collect and analyse security events.",
        businessImpact:
          "Security incidents may remain undetected for extended periods."
      }
    },
  ],

  recommendationRules: [
    {
      id: "defender-for-cloud",
      condition: { questionId: "securityPosture", operator: "exists", value: "" },
      recommendation: {
        service: "Microsoft Defender for Cloud",
        outcome: "Unified security posture management with secure score, recommendations, and threat protection.",
        whyItFits: "Foundational service for any cloud security assessment — provides baseline visibility across all subscriptions.",
        priority: "critical",
      },
    },
    {
      id: "entra-id",
      condition: {
        or: [
          { questionId: "iamMaturity", operator: "equals", value: "no-system" },
          { questionId: "iamMaturity", operator: "equals", value: "passwords" },
        ],
      },
      recommendation: {
        service: "Microsoft Entra ID (Azure AD)",
        outcome: "Centralised identity provider with conditional access and risk-based policies.",
        whyItFits: "Replaces ad-hoc password-based access with centrally managed, auditable identity.",
        priority: "critical",
      },
    },
    {
      id: "entra-mfa",
      condition: {
        or: [
          { questionId: "mfaStatus", operator: "equals", value: "no" },
          { questionId: "mfaStatus", operator: "equals", value: "some-users" },
        ],
      },
      recommendation: {
        service: "Microsoft Entra ID — Conditional Access (MFA)",
        outcome: "Enforced multi-factor authentication for all users via Conditional Access policies.",
        whyItFits: "MFA is the single highest-impact control against account compromise.",
        priority: "critical",
      },
    },
    {
      id: "sentinel",
      condition: {
        or: [
          { questionId: "siem", operator: "equals", value: "no" },
          { questionId: "siem", operator: "equals", value: "partial" },
        ],
      },
      recommendation: {
        service: "Microsoft Sentinel",
        outcome: "Cloud-native SIEM and SOAR for centralised log analysis, threat detection, and automated response.",
        whyItFits: "Provides centralised visibility across subscriptions and integrates with Defender for Cloud.",
        priority: "high",
      },
    },
    {
      id: "key-vault-sec",
      condition: { questionId: "dataEncryption", operator: "equals", value: "no" },
      recommendation: {
        service: "Azure Key Vault",
        outcome: "Centralised management of encryption keys, secrets, and certificates.",
        whyItFits: "Required to implement encryption at rest consistently across services.",
        priority: "critical",
      },
    },
    {
      id: "nsg-segmentation",
      condition: { questionId: "networkSegmentation", operator: "equals", value: "none" },
      recommendation: {
        service: "Network Security Groups + Azure Firewall",
        outcome: "Segmented network architecture limiting lateral movement between workloads.",
        whyItFits: "Establishes network-level isolation between tiers and workloads.",
        priority: "high",
      },
    },
    {
      id: "azure-policy-governance",
      condition: { questionId: "cloudSubscriptions", operator: "equals", value: "10+" },
      recommendation: {
        service: "Azure Policy + Management Groups",
        outcome: "Centralised governance and policy enforcement across all subscriptions.",
        whyItFits: "At 10+ subscriptions, manual policy management is unsustainable — centralised governance is required.",
        priority: "high",
      },
    },
    {
      id: "defender-vuln-mgmt",
      condition: { questionId: "vulnerabilityScanning", operator: "equals", value: "never" },
      recommendation: {
        service: "Microsoft Defender Vulnerability Management",
        outcome: "Continuous vulnerability scanning and prioritised remediation guidance.",
        whyItFits: "Provides ongoing visibility into unpatched systems and misconfigurations.",
        priority: "medium",
      },
    },
    {
      id: "purview-compliance",
      condition: { questionId: "complianceFrameworks", operator: "containsAny", value: ["gdpr", "iso27001", "pci-dss", "hipaa", "nca"] },
      recommendation: {
        service: "Microsoft Purview Compliance Manager",
        outcome: "Compliance score tracking and control mapping against required frameworks.",
        whyItFits: "Provides a structured way to track and demonstrate compliance progress over time.",
        priority: "medium",
      },
    },
  ],

  prerequisiteRules: [
    {
      id: "subscription-inventory",
      condition: { questionId: "cloudSubscriptions", operator: "equals", value: "10+" },
      prerequisite: {
        title: "Subscription & Resource Inventory",
        description: "Compile a complete inventory of all subscriptions, resource groups, and ownership before assessment begins.",
        effort: "medium",
      },
    },
    {
      id: "incident-history-review",
      condition: { questionId: "previousIncidents", operator: "equals", value: "yes" },
      prerequisite: {
        title: "Incident History Review",
        description: "Review documentation of previous security incidents to understand root causes and existing remediation status.",
        effort: "low",
      },
    },
    {
      id: "stakeholder-access",
      condition: { questionId: "cloudSubscriptions", operator: "exists", value: "" },
      prerequisite: {
        title: "Read-Only Access Provisioning",
        description: "Provision read-only access to all in-scope subscriptions for the assessment team.",
        effort: "low",
      },
    },
  ],

  baseDeliverables: [
    {
      title: "Security Posture Assessment Report",
      description: "Comprehensive review of identity, network, data protection, and monitoring controls with a secure score.",
    },
    {
      title: "Risk Register",
      description: "Prioritised list of identified risks with business impact and recommended remediation.",
    },
    {
      title: "Remediation Roadmap",
      description: "Phased plan to close identified security gaps, prioritised by risk and effort.",
    },
  ],

  conditionalDeliverables: [
    {
      id: "compliance-gap-analysis",
      condition: { questionId: "complianceFrameworks", operator: "containsAny", value: ["gdpr", "iso27001", "pci-dss", "hipaa", "nca"] },
      deliverable: {
        title: "Compliance Gap Analysis",
        description: "Control-by-control mapping against required compliance frameworks with gap remediation guidance.",
      },
    },
    {
      id: "iam-redesign",
      condition: { questionId: "iamMaturity", operator: "equals", value: "no-system" },
      deliverable: {
        title: "Identity & Access Management Design",
        description: "Target-state IAM architecture including Conditional Access, role design, and privileged access management.",
      },
    },
    {
      id: "incident-response-plan",
      condition: { questionId: "incidentResponsePlan", operator: "equals", value: "no" },
      deliverable: {
        title: "Incident Response Plan",
        description: "Documented incident response procedures including roles, escalation paths, and communication templates.",
      },
    },
    {
      id: "governance-baseline",
      condition: { questionId: "cloudSubscriptions", operator: "equals", value: "10+" },
      deliverable: {
        title: "Multi-Subscription Governance Baseline",
        description: "Management group hierarchy and Azure Policy baseline applied across all subscriptions.",
      },
    },
  ],
};