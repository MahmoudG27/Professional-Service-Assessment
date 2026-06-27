export const COMPANY_PROFILE_QUESTIONS = [
    {
        id: "companyName",
        text: "Company Name",
        type: "text",
        required: true,
        helpText: "Name of the client company",
    },
    {
        id: "industry",
        text: "What is your company's primary industry?",
        type: "singleChoice",
        required: true,
        options: [
            { value: "retail", label: "Retail" },
            { value: "healthcare", label: "Healthcare" },
            { value: "fintech", label: "Fintech" },
            { value: "saas", label: "SaaS" },
            { value: "manufacturing", label: "Manufacturing" },
            { value: "other", label: "Other" },
        ],
    },
    {
        id: "employeesAndUsers",
        text: "How many employees AND active system users?",
        type: "singleChoice",
        required: true,
        options: [
            { value: "1-10", label: "1–10 employees (≤5 users)" },
            { value: "11-50", label: "11–50 employees (5–25 users)" },
            { value: "51-200", label: "51–200 employees (25–100 users)" },
            { value: "200+", label: "200+ employees (100+ users)" },
        ],
    },
    {
        id: "itTeam",
        text: "Do you have a dedicated IT team?",
        type: "singleChoice",
        required: true,
        options: [
            { value: "full-team", label: "Yes, a full IT team" },
            { value: "1-2", label: "Yes, 1–2 IT personnel" },
            { value: "none", label: "No in-house IT team" },
        ],
    },
];
