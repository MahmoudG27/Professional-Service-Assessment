import { useState } from "react";
import CompanyProfileStep from "./CompanyProfileStep";
import ServiceSelectionStep from "./ServiceSelectionStep";
import ScenarioQuestionsStep from "./ScenarioQuestionsStep";
import ReportPage from "./ReportPage";
import { CompanyProfile } from "../../types/companyProfile";
import { AssessmentAnswers } from "../../types/scenario";
import { getScenarioById } from "../../scenarios";
import type { ProfessionalServicesReport } from "../../reports/professionalServicesReport";
import { submitAndGenerateReport } from "../../services/api";

// ================================================================
// Wizard State
// ================================================================
export type WizardStep = 1 | 2 | 3 | 4;

export interface WizardState {
  step: WizardStep;
  companyProfile: Partial<CompanyProfile>;
  selectedScenarioId: string | null;
  scenarioAnswers: AssessmentAnswers;
}

const INITIAL_STATE: WizardState = {
  step: 1,
  companyProfile: {},
  selectedScenarioId: null,
  scenarioAnswers: {},
};

// ================================================================
// Progress Bar
// ================================================================
function ProgressBar({ step }: { step: WizardStep }) {
  const steps = [
    { num: 1, label: "Company" },
    { num: 2, label: "Service" },
    { num: 3, label: "Assessment" },
    { num: 4, label: "Report" },
  ];

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 0,
      marginBottom: "24px",
    }}>
      {steps.map((s, i) => (
        <div key={s.num} style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <div style={{
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
            }}>
              {step > s.num ? "✓" : s.num}
            </div>
            <span style={{
              fontSize: "11px",
              color: step >= s.num ? "#185FA5" : "#9ca3af",
              fontWeight: step === s.num ? 600 : 400,
              whiteSpace: "nowrap",
            }}>
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div style={{
              flex: 1,
              height: "2px",
              background: step > s.num ? "#185FA5" : "#e5e7eb",
              margin: "0 8px",
              marginBottom: "18px",
              transition: "all 0.2s",
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

// ================================================================
// Main Wizard Component
// ================================================================
export default function AssessmentWizard() {
  const [state, setState] = useState<WizardState>(INITIAL_STATE);
  const [report, setReport] = useState<ProfessionalServicesReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [reportId] = useState(
    () => "RPT-" + Math.random().toString(16).slice(2, 10).toUpperCase()
  );

  function goTo(step: WizardStep) {
    setState(s => ({ ...s, step }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleProfileComplete(profile: CompanyProfile) {
    setState(s => ({ ...s, companyProfile: profile }));
    goTo(2);
  }

  function handleServiceSelected(scenarioId: string) {
    setState(s => ({ ...s, selectedScenarioId: scenarioId }));
    goTo(3);
  }

  async function handleScenarioAnswers(answers: AssessmentAnswers) {
    setLoading(true);
    setError(null);

    setState(prev => ({
      ...prev,
      scenarioAnswers: answers,
      step: 4 as WizardStep,
    }));

    try {
      const report = await submitAndGenerateReport(
        state.companyProfile as CompanyProfile,
        state.selectedScenarioId!,
        answers
      );

      setReport(report);
    } catch (err) {
      setError("Failed to generate report. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f8fafc",
      padding: "32px 16px",
      margin: 0,
    }}>
      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        background: "#fff",
        borderRadius: "16px",
        padding: "40px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}>
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <span style={{ fontSize: "13px", color: "#185FA5", fontWeight: 600, letterSpacing: "0.04em" }}>
            KlayyTech
          </span>
          <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#111827", margin: "6px 0 4px" }}>
            Professional Services Assessment
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
            Answer a few questions to receive a tailored engagement estimate.
          </p>
        </div>

        <ProgressBar step={state.step} />

        {/* Steps */}
        {state.step === 1 && (
          <CompanyProfileStep
            initial={state.companyProfile}
            onComplete={handleProfileComplete}
          />
        )}

        {state.step === 2 && (
          <ServiceSelectionStep
            onSelect={handleServiceSelected}
            onBack={() => goTo(1)}
          />
        )}

        {state.step === 3 && state.selectedScenarioId && (
          <ScenarioQuestionsStep
            scenarioId={state.selectedScenarioId}
            initial={state.scenarioAnswers}
            onComplete={handleScenarioAnswers}
            onBack={() => goTo(2)}
          />
        )}

        {state.step === 4 && (
          loading ? (
            <div style={{ textAlign: "center", padding: "60px" }}>
              <p style={{ color: "#185FA5", fontWeight: 600 }}>
                Generating your assessment...
              </p>
            </div>
          ) : error ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#E24B4A" }}>
              <p>{error}</p>
              <button
                onClick={() =>
                  setState(prev => ({ ...prev, step: 3 as WizardStep }))
                }
              >
                ← Try again
              </button>
            </div>
          ) : report ? (
            <ReportPage
              report={report}
              onStartNew={() => {
                setState(INITIAL_STATE);
                setReport(null);
              }}
            />
          ) : null
        )}
      </div>
    </div>
  );
}
