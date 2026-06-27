import { jsx as _jsx } from "react/jsx-runtime";
import QuestionForm from "./QuestionForm";
import { getScenarioById } from "../../scenarios";
export default function ScenarioQuestionsStep({ scenarioId, initial, onComplete, onBack, }) {
    const scenario = getScenarioById(scenarioId);
    if (!scenario) {
        return (_jsx("div", { style: { textAlign: "center", padding: "40px", color: "#E24B4A" }, children: "Scenario not found. Please go back and select a service." }));
    }
    return (_jsx(QuestionForm, { title: scenario.name, subtitle: `Answer the following questions about your ${scenario.name.toLowerCase()} engagement.`, questions: scenario.questions, initial: initial, submitLabel: "Generate my assessment \u2192", onComplete: onComplete, onBack: onBack }));
}
