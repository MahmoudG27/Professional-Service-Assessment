import { jsx as _jsx } from "react/jsx-runtime";
// ================================================================
// CompanyProfileStep.tsx
// ================================================================
import QuestionForm from "./QuestionForm";
import { COMPANY_PROFILE_QUESTIONS } from "../../types/companyProfile";
export default function CompanyProfileStep({ initial, onComplete }) {
    function handleComplete(answers) {
        onComplete(answers);
    }
    return (_jsx(QuestionForm, { title: "Tell us about your company", subtitle: "This information helps us tailor the assessment to your organisation.", questions: COMPANY_PROFILE_QUESTIONS, initial: initial, submitLabel: "Continue \u2192", showBackButton: false, onComplete: handleComplete, onBack: () => { } }));
}
