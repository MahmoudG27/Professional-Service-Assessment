import type { ProfessionalServicesReport } from "../../reports/professionalServicesReport";
import type { FindingSeverity, RecommendationPriority } from "../../types/scenario";
import { getTopComplexityDrivers } from "../../engine/scenarioEngine";
import { getScenarioById } from "../../scenarios";

interface Props {
  report: ProfessionalServicesReport;
  onGeneratePDF?: () => void;
  onSendEmail?: () => void;
  onStartNew?: () => void;
}

// ================================================================
// Color helpers
// ================================================================
function severityColor(s: FindingSeverity): { bg: string; text: string; dot: string } {
  switch (s) {
    case "critical": return { bg: "#FCEBEB", text: "#791F1F", dot: "#E24B4A" };
    case "warning":  return { bg: "#FAF0DC", text: "#7A4F0A", dot: "#D97706" };
    case "strength": return { bg: "#EAF3DE", text: "#27500A", dot: "#5A9E23" };
    default:         return { bg: "#F0F4FF", text: "#1E3A8A", dot: "#3B82F6" };
  }
}

function priorityBadge(p: RecommendationPriority): { bg: string; text: string; label: string } {
  switch (p) {
    case "critical": return { bg: "#FCEBEB", text: "#791F1F", label: "Critical" };
    case "high":     return { bg: "#FAF0DC", text: "#7A4F0A", label: "High" };
    case "medium":   return { bg: "#E6F1FB", text: "#0C447C", label: "Medium" };
    default:         return { bg: "#F3F4F6", text: "#374151", label: "Low" };
  }
}

function effortBadge(e: string): { bg: string; text: string } {
  switch (e) {
    case "high":   return { bg: "#FCEBEB", text: "#791F1F" };
    case "medium": return { bg: "#FAF0DC", text: "#7A4F0A" };
    default:       return { bg: "#EAF3DE", text: "#27500A" };
  }
}

function complexityColor(level: string): string {
  if (level.includes("Enterprise")) return "#791F1F";
  if (level.includes("High"))       return "#7A4F0A";
  if (level.includes("Medium"))     return "#0C447C";
  return "#27500A";
}

function complexityBg(level: string): string {
  if (level.includes("Enterprise")) return "#FCEBEB";
  if (level.includes("High"))       return "#FAF0DC";
  if (level.includes("Medium"))     return "#E6F1FB";
  return "#EAF3DE";
}

// ================================================================
// Section wrapper
// ================================================================
function Section({ number, title, children }: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "16px",
        paddingBottom: "10px",
        borderBottom: "1.5px solid #e5e7eb",
      }}>
        <span style={{
          fontSize: "11px",
          fontWeight: 700,
          color: "#185FA5",
          letterSpacing: "0.06em",
          background: "#E6F1FB",
          padding: "2px 8px",
          borderRadius: "4px",
        }}>
          {number}
        </span>
        <span style={{ fontSize: "15px", fontWeight: 600, color: "#111827" }}>
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

// ================================================================
// Main Report Component
// ================================================================

export default function ReportPage({ report, onGeneratePDF, onSendEmail, onStartNew }: Props) {
  const { companyProfile, complexity, effort, pricing, confidence, executiveSummary,
          keyFindings, recommendedServices, prerequisites, whatWeWillDeliver, nextSteps,
          scenarioResult } = report;

  const scenario = getScenarioById(report.scenarioResult.scenarioId);
  const drivers = scenario
    ? getTopComplexityDrivers(scenario, report.scenarioResult.answers)
    : [];

  function impactLabel(points: number) {
    if (points >= 30) return { label: "High Impact", color: "#791F1F", bg: "#FCEBEB" };
    if (points >= 15) return { label: "Medium Impact", color: "#7A4F0A", bg: "#FAF0DC" };
    return { label: "Low Impact", color: "#374151", bg: "#F3F4F6" };
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "32px 16px" }}>
      <div style={{
        maxWidth: "820px",
        margin: "0 auto",
        background: "#fff",
        borderRadius: "16px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        overflow: "hidden",
      }}>

        {/* ── Header ── */}
        <div style={{
          background: "linear-gradient(135deg, #0C447C 0%, #185FA5 100%)",
          padding: "32px 40px",
          color: "#fff",
        }}>
          <div style={{ fontSize: "12px", letterSpacing: "0.08em", opacity: 0.7, marginBottom: "6px" }}>
            KlayyTech · Professional Services Assessment
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, margin: "0 0 4px" }}>
            {companyProfile.companyName}
          </h1>
          <p style={{ fontSize: "14px", opacity: 0.8, margin: "0 0 20px" }}>
            {scenarioResult.scenarioName}
          </p>

          {/* Meta pills */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {[
              companyProfile.industry,
              companyProfile.employeesAndUsers,
              `Confidence ${confidence.score}%`,
              `Report ID: ${report.meta.reportId}`,
            ].map((pill, i) => (
              <span key={i} style={{
                fontSize: "12px",
                background: "rgba(255,255,255,0.15)",
                padding: "3px 10px",
                borderRadius: "20px",
                letterSpacing: "0.02em",
              }}>
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* ── Action bar ── */}
        <div style={{
          display: "flex",
          gap: "10px",
          padding: "16px 40px",
          borderBottom: "1px solid #e5e7eb",
          background: "#FAFBFC",
        }}>
          {onGeneratePDF && (
            <button onClick={onGeneratePDF} style={actionBtn("#185FA5", "#fff")}>
              📄 Download PDF
            </button>
          )}
          {onSendEmail && (
            <button onClick={onSendEmail} style={actionBtn("#fff", "#374151", "#e5e7eb")}>
              ✉️ Send to client
            </button>
          )}
          {onStartNew && (
            <button onClick={onStartNew} style={{ ...actionBtn("#fff", "#9ca3af", "#e5e7eb"), marginLeft: "auto" }}>
              + New assessment
            </button>
          )}
        </div>

        {/* ── Body ── */}
        <div style={{ padding: "40px" }}>

          {/* 01 — Overview */}
          <Section number="01" title="Company & Service Overview">
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}>
              {[
                { label: "Company",   value: companyProfile.companyName },
                { label: "Industry",  value: companyProfile.industry },
                { label: "Size",      value: companyProfile.employeesAndUsers },
                { label: "IT Team",   value: companyProfile.itTeam },
                { label: "Service",   value: scenarioResult.scenarioName },
                { label: "Generated", value: new Date(report.meta.generatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) },
              ].map(item => (
                <div key={item.label} style={{
                  padding: "12px 16px",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}>
                  <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "4px" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: "14px", color: "#111827", fontWeight: 500 }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* 02 — Complexity */}
          <Section number="02" title="Project Complexity">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>

              {/* Complexity level */}
              <div style={{
                gridColumn: "1 / 2",
                padding: "20px",
                borderRadius: "10px",
                background: complexityBg(complexity.level),
                border: `1.5px solid ${complexityColor(complexity.level)}22`,
                textAlign: "center",
              }}>
                <div style={{ fontSize: "11px", color: complexityColor(complexity.level), fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "8px" }}>
                  Complexity Level
                </div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: complexityColor(complexity.level) }}>
                  {complexity.level}
                </div>
                <div style={{ fontSize: "12px", color: complexityColor(complexity.level), opacity: 0.7, marginTop: "4px" }}>
                  Score: {complexity.score} pts
                </div>
              </div>

              {/* Effort */}
              <div style={{
                padding: "20px",
                borderRadius: "10px",
                background: "#f8fafc",
                border: "1.5px solid #e5e7eb",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "11px", color: "#6b7280", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "8px" }}>
                  Estimated Effort
                </div>
                <div style={{ fontSize: "22px", fontWeight: 700, color: "#111827" }}>
                  {effort.label}
                </div>
              </div>

              {/* Price */}
              <div style={{
                padding: "20px",
                borderRadius: "10px",
                background: "#f8fafc",
                border: "1.5px solid #e5e7eb",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "11px", color: "#6b7280", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "8px" }}>
                  Indicative Service Cost
                </div>
                <div style={{ fontSize: "20px", fontWeight: 700, color: "#111827" }}>
                  {pricing.label}
                </div>
                <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>
                  {pricing.currency}
                </div>
              </div>
            </div>

            {/* Confidence bar */}
            <div style={{ marginTop: "16px", padding: "14px 16px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: 600 }}>Assessment Confidence</span>
                <span style={{ fontSize: "12px", color: "#111827", fontWeight: 700 }}>{confidence.score}%</span>
              </div>
              <div style={{ height: "6px", background: "#e5e7eb", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{
                  width: `${confidence.score}%`,
                  height: "100%",
                  background: confidence.score >= 80 ? "#5A9E23" : confidence.score >= 65 ? "#D97706" : "#E24B4A",
                  borderRadius: "3px",
                  transition: "width 0.4s ease",
                }} />
              </div>
              {confidence.score < 70 && (
                <p style={{ fontSize: "12px", color: "#7A4F0A", margin: "8px 0 0" }}>
                  ⚠️ Confidence is below 70% — a discovery workshop is recommended to validate this estimate.
                </p>
              )}
            </div>
          </Section>

          {drivers.length > 0 && (
            <Section number="03" title="Top Complexity Factors">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {drivers.map((d, i) => {
                  const impact = impactLabel(d.points);
                  return (
                    <div key={i} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      background: "#f8fafc",
                      border: "1px solid #e5e7eb",
                    }}>
                      <span style={{ color: "#185FA5", fontWeight: 700, fontSize: "14px", flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: "13px", color: "#374151", flex: 1 }}>{d.label}</span>
                      <span style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: "4px",
                        background: impact.bg,
                        color: impact.color,
                        flexShrink: 0,
                      }}>
                        {impact.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "12px", fontStyle: "italic" }}>
                These factors contributed most to the complexity assessment based on your answers.
              </p>
            </Section>
          )}

          {/* 03 — Executive Summary */}
          <Section number="03" title="Executive Summary">
            <div style={{
              padding: "20px",
              background: "#E6F1FB",
              borderRadius: "10px",
              border: "1px solid #B5D4F4",
              fontSize: "14px",
              color: "#0C447C",
              lineHeight: "1.7",
            }}>
              {executiveSummary.keyMessage}
            </div>
          </Section>

          {/* 04 — Key Findings */}
          {keyFindings.length > 0 && (
            <Section number="04" title="Key Findings">
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {keyFindings.map((f, i) => {
                  const c = severityColor(f.severity);
                  return (
                    <div key={i} style={{
                      padding: "14px 16px",
                      borderRadius: "8px",
                      background: c.bg,
                      border: `1px solid ${c.dot}33`,
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                    }}>
                      <div style={{
                        width: "8px", height: "8px", borderRadius: "50%",
                        background: c.dot, flexShrink: 0, marginTop: "5px",
                      }} />
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 600, color: c.text, marginBottom: "3px" }}>
                          {f.title}
                        </div>
                        <div style={{ fontSize: "13px", color: c.text, opacity: 0.85, lineHeight: "1.5" }}>
                          {f.description}
                        </div>
                        {f.businessImpact && (
                          <div style={{ fontSize: "12px", color: c.text, opacity: 0.7, marginTop: "6px", fontStyle: "italic" }}>
                            Impact: {f.businessImpact}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Section>
          )}

          {/* 05 — Recommended Services */}
          {recommendedServices.length > 0 && (
            <Section number="05" title="Recommended Azure Services">
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {recommendedServices.map((r, i) => {
                  const badge = priorityBadge(r.priority);
                  return (
                    <div key={i} style={{
                      padding: "16px",
                      borderRadius: "8px",
                      background: "#f8fafc",
                      border: "1px solid #e5e7eb",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                        <div style={{ fontSize: "14px", fontWeight: 600, color: "#185FA5" }}>
                          {r.service}
                        </div>
                        <span style={{
                          fontSize: "11px", fontWeight: 600,
                          padding: "2px 8px", borderRadius: "20px",
                          background: badge.bg, color: badge.text,
                          flexShrink: 0, marginLeft: "8px",
                        }}>
                          {badge.label}
                        </span>
                      </div>
                      <div style={{ fontSize: "13px", color: "#374151", marginBottom: "4px", lineHeight: "1.5" }}>
                        {r.outcome}
                      </div>
                      <div style={{ fontSize: "12px", color: "#9ca3af", fontStyle: "italic", lineHeight: "1.4" }}>
                        Why it fits: {r.whyItFits}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Section>
          )}

          {/* 06 — Prerequisites */}
          {prerequisites.length > 0 && (
            <Section number="06" title="Prerequisites">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {prerequisites.map((p, i) => {
                  const badge = effortBadge(p.effort);
                  return (
                    <div key={i} style={{
                      padding: "12px 16px",
                      borderRadius: "8px",
                      background: "#f8fafc",
                      border: "1px solid #e5e7eb",
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                    }}>
                      <span style={{
                        fontSize: "11px", fontWeight: 600,
                        padding: "2px 8px", borderRadius: "4px",
                        background: badge.bg, color: badge.text,
                        flexShrink: 0, marginTop: "1px",
                        textTransform: "capitalize",
                      }}>
                        {p.effort}
                      </span>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 600, color: "#111827", marginBottom: "2px" }}>
                          {p.title}
                        </div>
                        <div style={{ fontSize: "13px", color: "#6b7280", lineHeight: "1.5" }}>
                          {p.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Section>
          )}

          {/* 07 — What We Will Deliver */}
          {whatWeWillDeliver.length > 0 && (
            <Section number="07" title="What We Will Deliver">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {whatWeWillDeliver.map((d, i) => (
                  <div key={i} style={{
                    padding: "14px 16px",
                    borderRadius: "8px",
                    background: "#f8fafc",
                    border: "1px solid #e5e7eb",
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}>
                    <span style={{ fontSize: "16px", flexShrink: 0 }}>✓</span>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#111827", marginBottom: "3px" }}>
                        {d.title}
                      </div>
                      <div style={{ fontSize: "12px", color: "#6b7280", lineHeight: "1.5" }}>
                        {d.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* 08 — Next Steps */}
          <Section number="08" title="Next Steps">
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {nextSteps.map((step, i) => (
                <div key={i} style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  background: i === 0 ? "#E6F1FB" : "#f8fafc",
                  border: i === 0 ? "1px solid #B5D4F4" : "1px solid #e5e7eb",
                }}>
                  <div style={{
                    width: "24px", height: "24px", borderRadius: "50%",
                    background: i === 0 ? "#185FA5" : "#e5e7eb",
                    color: i === 0 ? "#fff" : "#6b7280",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", fontWeight: 700, flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ fontSize: "13px", color: i === 0 ? "#0C447C" : "#374151", lineHeight: "1.5", fontWeight: i === 0 ? 500 : 400 }}>
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Disclaimer */}
          <div style={{
            padding: "16px",
            borderRadius: "8px",
            background: "#f8fafc",
            border: "1px solid #e5e7eb",
            marginTop: "8px",
          }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
              Important Disclaimer
            </div>
            <div style={{ fontSize: "12px", color: "#9ca3af", lineHeight: "1.6" }}>
              This assessment is intended for informational and planning purposes only. The findings,
              recommendations, timelines, and cost estimates are based on information provided during
              the assessment and may not reflect the full complexity of your environment. Final
              architecture, pricing, and security requirements may vary based on detailed discovery
              and implementation scope. KlayyTech recommends a formal technical discovery engagement
              before commencing any activities.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helper ──
function actionBtn(bg: string, color: string, border?: string): React.CSSProperties {
  return {
    padding: "8px 18px",
    borderRadius: "8px",
    border: border ? `1px solid ${border}` : "none",
    background: bg,
    color,
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 600,
  };
}