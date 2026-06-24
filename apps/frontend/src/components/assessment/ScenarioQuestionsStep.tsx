import QuestionForm from "./QuestionForm";
import { getScenarioById } from "../../scenarios";
import { AssessmentAnswers } from "../../types/scenario";

interface Props {
  scenarioId: string;
  initial: AssessmentAnswers;
  onComplete: (answers: AssessmentAnswers) => void;
  onBack: () => void;
}

export default function ScenarioQuestionsStep({
  scenarioId,
  initial,
  onComplete,
  onBack,
}: Props) {
  const scenario = getScenarioById(scenarioId);

  if (!scenario) {
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "#E24B4A" }}>
        Scenario not found. Please go back and select a service.
      </div>
    );
  }

  return (
    <QuestionForm
      title={scenario.name}
      subtitle={`Answer the following questions about your ${scenario.name.toLowerCase()} engagement.`}
      questions={scenario.questions}
      initial={initial}
      submitLabel="Generate my assessment →"
      onComplete={onComplete}
      onBack={onBack}
    />
  );
}
