import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import CompanyProfileStep from "./CompanyProfileStep";
import ServiceSelectionStep from "./ServiceSelectionStep";
import ScenarioQuestionsStep from "./ScenarioQuestionsStep";
import ReportPage from "./ReportPage";
import { submitAndGenerateReport } from "../../services/api";
const INITIAL_STATE = {
    step: 1,
    companyProfile: {},
    selectedScenarioId: null,
    scenarioAnswers: {},
};
// ================================================================
// Progress Bar
// ================================================================
function ProgressBar({ step }) {
    const steps = [
        { num: 1, label: "Company" },
        { num: 2, label: "Service" },
        { num: 3, label: "Assessment" },
        { num: 4, label: "Report" },
    ];
    return (_jsx("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: 0,
            marginBottom: "24px",
        }, children: steps.map((s, i) => (_jsxs("div", { style: { display: "flex", alignItems: "center", flex: 1 }, children: [_jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }, children: [_jsx("div", { style: {
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "13px",
                                fontWeight: 600,
                                background: step >= s.num ? "#185FA5" : "#e5e7eb",
                                color: step >= s.num ? "#fff" : "#9ca3af",
                                transition: "all 0.2s",
                            }, children: step > s.num ? "✓" : s.num }), _jsx("span", { style: {
                                fontSize: "11px",
                                color: step >= s.num ? "#185FA5" : "#9ca3af",
                                fontWeight: step === s.num ? 600 : 400,
                                whiteSpace: "nowrap",
                            }, children: s.label })] }), i < steps.length - 1 && (_jsx("div", { style: {
                        flex: 1,
                        height: "2px",
                        background: step > s.num ? "#185FA5" : "#e5e7eb",
                        margin: "0 8px",
                        marginBottom: "18px",
                        transition: "all 0.2s",
                    } }))] }, s.num))) }));
}
// ================================================================
// Main Wizard Component
// ================================================================
export default function AssessmentWizard() {
    const [state, setState] = useState(INITIAL_STATE);
    const [report, setReport] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [reportId] = useState(() => "RPT-" + Math.random().toString(16).slice(2, 10).toUpperCase());
    function goTo(step) {
        setState(s => ({ ...s, step }));
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    function handleProfileComplete(profile) {
        setState(s => ({ ...s, companyProfile: profile }));
        goTo(2);
    }
    function handleServiceSelected(scenarioId) {
        setState(s => ({ ...s, selectedScenarioId: scenarioId }));
        goTo(3);
    }
    async function handleScenarioAnswers(answers) {
        setLoading(true);
        setError(null);
        setState(prev => ({
            ...prev,
            scenarioAnswers: answers,
            step: 4,
        }));
        try {
            const report = await submitAndGenerateReport(state.companyProfile, state.selectedScenarioId, answers);
            setReport(report);
        }
        catch (err) {
            setError("Failed to generate report. Please try again.");
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsx("div", { style: {
            minHeight: "100vh",
            background: "#f8fafc",
            padding: "32px 16px",
            margin: 0,
        }, children: _jsxs("div", { style: {
                maxWidth: "900px",
                margin: "0 auto",
                background: "#fff",
                borderRadius: "16px",
                padding: "40px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }, children: [_jsxs("div", { style: { marginBottom: "24px" }, children: [_jsx("span", { style: { fontSize: "13px", color: "#185FA5", fontWeight: 600, letterSpacing: "0.04em" }, children: "KlayyTech" }), _jsx("h1", { style: { fontSize: "22px", fontWeight: 600, color: "#111827", margin: "6px 0 4px" }, children: "Professional Services Assessment" }), _jsx("p", { style: { fontSize: "14px", color: "#6b7280", margin: 0 }, children: "Answer a few questions to receive a tailored engagement estimate." })] }), _jsx(ProgressBar, { step: state.step }), state.step === 1 && (_jsx(CompanyProfileStep, { initial: state.companyProfile, onComplete: handleProfileComplete })), state.step === 2 && (_jsx(ServiceSelectionStep, { onSelect: handleServiceSelected, onBack: () => goTo(1) })), state.step === 3 && state.selectedScenarioId && (_jsx(ScenarioQuestionsStep, { scenarioId: state.selectedScenarioId, initial: state.scenarioAnswers, onComplete: handleScenarioAnswers, onBack: () => goTo(2) })), state.step === 4 && (loading ? (_jsx("div", { style: { textAlign: "center", padding: "60px" }, children: _jsx("p", { style: { color: "#185FA5", fontWeight: 600 }, children: "Generating your assessment..." }) })) : error ? (_jsxs("div", { style: { textAlign: "center", padding: "40px", color: "#E24B4A" }, children: [_jsx("p", { children: error }), _jsx("button", { onClick: () => setState(prev => ({ ...prev, step: 3 })), children: "\u2190 Try again" })] })) : report ? (_jsx(ReportPage, { report: report, onStartNew: () => {
                        setState(INITIAL_STATE);
                        setReport(null);
                    } })) : null)] }) }));
}
