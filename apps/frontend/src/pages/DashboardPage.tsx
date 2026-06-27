import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAssessments } from "../services/api";

interface AssessmentListItem {
  id: string;
  companyName: string;
  scenarioId: string;
  status: "draft" | "completed" | "failed";
  createdAt: string;
  complexityLevel: string | null;
  mandayMin: number | null;
  mandayMax: number | null;
  servicePriceMin: number | null;
  servicePriceMax: number | null;
  confidenceScore: number | null;
}

const SCENARIO_LABELS: Record<string, string> = {
  "azure-migration":          "Azure Migration",
  "modernization":            "Modernization",
  "disaster-recovery":        "Disaster Recovery",
  "security-assessment":      "Security Assessment",
  "subscription-optimization": "Cost Optimization",
  "subscription-migration":   "Sub Migration",
};

function complexityColor(level: string | null): string {
  if (!level) return "#9ca3af";
  if (level.includes("Enterprise")) return "#791F1F";
  if (level.includes("High"))       return "#7A4F0A";
  if (level.includes("Medium"))     return "#0C447C";
  return "#27500A";
}

function complexityBg(level: string | null): string {
  if (!level) return "#f3f4f6";
  if (level.includes("Enterprise")) return "#FCEBEB";
  if (level.includes("High"))       return "#FAF0DC";
  if (level.includes("Medium"))     return "#E6F1FB";
  return "#EAF3DE";
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, React.CSSProperties> = {
    completed:  { background: "#EAF3DE", color: "#27500A" },
    generating: { background: "#E6F1FB", color: "#0C447C" },
    draft:      { background: "#F1EFE8", color: "#5F5E5A" },
    failed:     { background: "#FCEBEB", color: "#791F1F" },
  };
  return (
    <span style={{
      ...(styles[status] ?? styles.draft),
      padding: "3px 10px",
      borderRadius: "20px",
      fontSize: "11px",
      fontWeight: 500,
    }}>
      {status}
    </span>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState<AssessmentListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAssessments() {
      try {
        const response = await getAssessments();
        if (response.success) {
          setAssessments(response.data);
        } else {
          setError(response.error ?? "Failed to load assessments");
        }
      } catch {
        setError("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    }
    fetchAssessments();
  }, []);

  // ── Metrics ──
  const total      = assessments.length;
  const enterprise = assessments.filter(a => a.complexityLevel?.includes("Enterprise")).length;
  const high       = assessments.filter(a => a.complexityLevel?.includes("High") && !a.complexityLevel?.includes("Enterprise")).length;
  const medium     = assessments.filter(a => a.complexityLevel?.includes("Medium")).length;
  const low        = assessments.filter(a => a.complexityLevel?.includes("Low") && !a.complexityLevel?.includes("Low C") === false).length;

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>

      {/* ── Top bar ── */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        padding: "12px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{ fontSize: "15px", fontWeight: 600, color: "#111827" }}>
          KlayyTech <span style={{ color: "#185FA5" }}>CloudReady</span>
        </span>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => navigate("/invitations")}
            style={outlineBtn}
          >
            Invitations
          </button>
          <button
            onClick={() => navigate("/assessment")}
            style={primaryBtn}
          >
            + New assessment
          </button>
        </div>
      </div>

      <div style={{ padding: "28px", maxWidth: "1200px", margin: "0 auto" }}>

        {/* ── Metrics ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px",
          marginBottom: "24px",
        }}>
          {[
            { label: "Total assessments", value: total,      color: "#374151" },
            { label: "Enterprise",        value: enterprise, color: "#791F1F" },
            { label: "High",              value: high,       color: "#7A4F0A" },
            { label: "Medium",            value: medium,     color: "#0C447C" },
          ].map(m => (
            <div key={m.label} style={{
              background: "#fff",
              borderRadius: "10px",
              padding: "16px 20px",
              border: "1px solid #e5e7eb",
            }}>
              <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "6px" }}>
                {m.label}
              </div>
              <div style={{ fontSize: "26px", fontWeight: 600, color: m.color }}>
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* ── Table ── */}
        <div style={{
          background: "#fff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
        }}>
          <div style={{ padding: "18px 24px", borderBottom: "1px solid #f3f4f6" }}>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>
              Recent assessments
            </span>
          </div>

          {loading && (
            <div style={{ padding: "48px", textAlign: "center", color: "#6b7280" }}>
              Loading assessments...
            </div>
          )}

          {error && (
            <div style={{ padding: "16px 24px", background: "#FCEBEB", color: "#791F1F", fontSize: "13px" }}>
              {error}
            </div>
          )}

          {!loading && assessments.length === 0 && !error && (
            <div style={{ padding: "64px", textAlign: "center", color: "#6b7280" }}>
              <div style={{ fontSize: "16px", fontWeight: 500, marginBottom: "8px" }}>
                No assessments yet
              </div>
              <div style={{ fontSize: "13px", marginBottom: "20px" }}>
                Start your first professional services assessment
              </div>
              <button
                onClick={() => navigate("/assessment")}
                style={primaryBtn}
              >
                Start assessment
              </button>
            </div>
          )}

          {!loading && assessments.length > 0 && (
            <>
              {/* Table header */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "2fr 1.4fr 1.2fr 1.2fr 0.8fr 1fr",
                padding: "10px 24px",
                background: "#f9fafb",
                borderBottom: "1px solid #e5e7eb",
              }}>
                {["Company", "Scenario", "Complexity", "Effort", "Status", "Actions"].map(h => (
                  <span key={h} style={{ fontSize: "11px", color: "#6b7280", fontWeight: 600 }}>
                    {h}
                  </span>
                ))}
              </div>

              {/* Table rows */}
              {assessments.map(a => (
                <div key={a.id} style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1.4fr 1.2fr 1.2fr 0.8fr 1fr",
                  padding: "14px 24px",
                  borderBottom: "1px solid #f3f4f6",
                  alignItems: "center",
                }}>
                  {/* Company */}
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 500, color: "#111827" }}>
                      {a.companyName}
                    </div>
                    <div style={{ fontSize: "11px", color: "#9ca3af" }}>
                      {new Date(a.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </div>
                  </div>

                  {/* Scenario */}
                  <span style={{ fontSize: "12px", color: "#374151" }}>
                    {SCENARIO_LABELS[a.scenarioId] ?? a.scenarioId}
                  </span>

                  {/* Complexity */}
                  <span style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "3px 8px",
                    borderRadius: "4px",
                    background: complexityBg(a.complexityLevel),
                    color: complexityColor(a.complexityLevel),
                    display: "inline-block",
                  }}>
                    {a.complexityLevel ?? "—"}
                  </span>

                  {/* Effort */}
                  <span style={{ fontSize: "12px", color: "#374151" }}>
                    {a.mandayMin && a.mandayMax
                      ? `${a.mandayMin}–${a.mandayMax} days`
                      : a.mandayMin
                      ? `${a.mandayMin}+ days`
                      : "—"}
                  </span>

                  {/* Status */}
                  <StatusBadge status={a.status} />

                  {/* Actions */}
                  <button
                    onClick={() => navigate(`/report/${a.id}`)}
                    disabled={a.status !== "completed"}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "6px",
                      border: "1px solid #e5e7eb",
                      background: a.status === "completed" ? "#fff" : "#f9fafb",
                      color: a.status === "completed" ? "#374151" : "#d1d5db",
                      fontSize: "12px",
                      cursor: a.status === "completed" ? "pointer" : "not-allowed",
                      fontWeight: 500,
                    }}
                  >
                    View
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Button styles ──
const primaryBtn: React.CSSProperties = {
  padding: "9px 18px",
  borderRadius: "8px",
  border: "none",
  background: "#185FA5",
  color: "#fff",
  fontSize: "13px",
  cursor: "pointer",
  fontWeight: 600,
};

const outlineBtn: React.CSSProperties = {
  padding: "9px 18px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
  background: "#fff",
  color: "#374151",
  fontSize: "13px",
  cursor: "pointer",
  fontWeight: 500,
};