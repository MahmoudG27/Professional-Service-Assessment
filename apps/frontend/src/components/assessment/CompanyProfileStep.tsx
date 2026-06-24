// ================================================================
// CompanyProfileStep.tsx
// ================================================================
import QuestionForm from "./QuestionForm";
import { COMPANY_PROFILE_QUESTIONS, CompanyProfile } from "../../types/companyProfile";
import { AssessmentAnswers } from "../../types/scenario";

interface CompanyProfileProps {
  initial: Partial<CompanyProfile>;
  onComplete: (profile: CompanyProfile) => void;
}

export default function CompanyProfileStep({ initial, onComplete }: CompanyProfileProps) {
  function handleComplete(answers: AssessmentAnswers) {
    onComplete(answers as unknown as CompanyProfile);
  }

  return (
    <QuestionForm
      title="Tell us about your company"
      subtitle="This information helps us tailor the assessment to your organisation."
      questions={COMPANY_PROFILE_QUESTIONS}
      initial={initial as AssessmentAnswers}
      submitLabel="Continue →"
      showBackButton={false}
      onComplete={handleComplete}
      onBack={() => {}}
    />
  );
}
