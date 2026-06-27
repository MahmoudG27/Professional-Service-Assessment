import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAssessments } from "../services/api";
const SCENARIO_LABELS = {
    "azure-migration": "Azure Migration",
    "modernization": "Modernization",
    "disaster-recovery": "Disaster Recovery",
    "security-assessment": "Security Assessment",
    "subscription-optimization": "Cost Optimization",
    "subscription-migration": "Sub Migration",
};
function complexityColor(level) {
    if (!level)
        return "#9ca3af";
    if (level.includes("Enterprise"))
        return "#791F1F";
    if (level.includes("High"))
        return "#7A4F0A";
    if (level.includes("Medium"))
        return "#0C447C";
    return "#27500A";
}
function complexityBg(level) {
    if (!level)
        return "#f3f4f6";
    if (level.includes("Enterprise"))
        return "#FCEBEB";
    if (level.includes("High"))
        return "#FAF0DC";
    if (level.includes("Medium"))
        return "#E6F1FB";
    return "#EAF3DE";
}
function StatusBadge({ status }) {
    const styles = {
        completed: { background: "#EAF3DE", color: "#27500A" },
        generating: { background: "#E6F1FB", color: "#0C447C" },
        draft: { background: "#F1EFE8", color: "#5F5E5A" },
        failed: { background: "#FCEBEB", color: "#791F1F" },
    };
    return (_jsx("span", { style: {
            ...(styles[status] ?? styles.draft),
            padding: "3px 10px",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: 500,
        }, children: status }));
}
export default function DashboardPage() {
    const navigate = useNavigate();
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchAssessments() {
            try {
                const response = await getAssessments();
                if (response.success) {
                    setAssessments(response.data);
                }
                else {
                    setError(response.error ?? "Failed to load assessments");
                }
            }
            catch {
                setError("Failed to connect to server");
            }
            finally {
                setLoading(false);
            }
        }
        fetchAssessments();
    }, []);
    // ── Metrics ──
    const total = assessments.length;
    const enterprise = assessments.filter(a => a.complexityLevel?.includes("Enterprise")).length;
    const high = assessments.filter(a => a.complexityLevel?.includes("High") && !a.complexityLevel?.includes("Enterprise")).length;
    const medium = assessments.filter(a => a.complexityLevel?.includes("Medium")).length;
    const low = assessments.filter(a => a.complexityLevel?.includes("Low") && !a.complexityLevel?.includes("Low C") === false).length;
    return (_jsxs("div", { style: { minHeight: "100vh", background: "#f8fafc" }, children: [_jsxs("div", { style: {
                    background: "#fff",
                    borderBottom: "1px solid #e5e7eb",
                    padding: "12px 28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }, children: [_jsxs("span", { style: { fontSize: "15px", fontWeight: 600, color: "#111827" }, children: ["KlayyTech ", _jsx("span", { style: { color: "#185FA5" }, children: "CloudReady" })] }), _jsxs("div", { style: { display: "flex", gap: "10px" }, children: [_jsx("button", { onClick: () => navigate("/invitations"), style: outlineBtn, children: "Invitations" }), _jsx("button", { onClick: () => navigate("/assessment"), style: primaryBtn, children: "+ New assessment" })] })] }), _jsxs("div", { style: { padding: "28px", maxWidth: "1200px", margin: "0 auto" }, children: [_jsx("div", { style: {
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: "12px",
                            marginBottom: "24px",
                        }, children: [
                            { label: "Total assessments", value: total, color: "#374151" },
                            { label: "Enterprise", value: enterprise, color: "#791F1F" },
                            { label: "High", value: high, color: "#7A4F0A" },
                            { label: "Medium", value: medium, color: "#0C447C" },
                        ].map(m => (_jsxs("div", { style: {
                                background: "#fff",
                                borderRadius: "10px",
                                padding: "16px 20px",
                                border: "1px solid #e5e7eb",
                            }, children: [_jsx("div", { style: { fontSize: "11px", color: "#6b7280", marginBottom: "6px" }, children: m.label }), _jsx("div", { style: { fontSize: "26px", fontWeight: 600, color: m.color }, children: m.value })] }, m.label))) }), _jsxs("div", { style: {
                            background: "#fff",
                            borderRadius: "12px",
                            border: "1px solid #e5e7eb",
                            overflow: "hidden",
                        }, children: [_jsx("div", { style: { padding: "18px 24px", borderBottom: "1px solid #f3f4f6" }, children: _jsx("span", { style: { fontSize: "14px", fontWeight: 600, color: "#111827" }, children: "Recent assessments" }) }), loading && (_jsx("div", { style: { padding: "48px", textAlign: "center", color: "#6b7280" }, children: "Loading assessments..." })), error && (_jsx("div", { style: { padding: "16px 24px", background: "#FCEBEB", color: "#791F1F", fontSize: "13px" }, children: error })), !loading && assessments.length === 0 && !error && (_jsxs("div", { style: { padding: "64px", textAlign: "center", color: "#6b7280" }, children: [_jsx("div", { style: { fontSize: "16px", fontWeight: 500, marginBottom: "8px" }, children: "No assessments yet" }), _jsx("div", { style: { fontSize: "13px", marginBottom: "20px" }, children: "Start your first professional services assessment" }), _jsx("button", { onClick: () => navigate("/assessment"), style: primaryBtn, children: "Start assessment" })] })), !loading && assessments.length > 0 && (_jsxs(_Fragment, { children: [_jsx("div", { style: {
                                            display: "grid",
                                            gridTemplateColumns: "2fr 1.4fr 1.2fr 1.2fr 0.8fr 1fr",
                                            padding: "10px 24px",
                                            background: "#f9fafb",
                                            borderBottom: "1px solid #e5e7eb",
                                        }, children: ["Company", "Scenario", "Complexity", "Effort", "Status", "Actions"].map(h => (_jsx("span", { style: { fontSize: "11px", color: "#6b7280", fontWeight: 600 }, children: h }, h))) }), assessments.map(a => (_jsxs("div", { style: {
                                            display: "grid",
                                            gridTemplateColumns: "2fr 1.4fr 1.2fr 1.2fr 0.8fr 1fr",
                                            padding: "14px 24px",
                                            borderBottom: "1px solid #f3f4f6",
                                            alignItems: "center",
                                        }, children: [_jsxs("div", { children: [_jsx("div", { style: { fontSize: "13px", fontWeight: 500, color: "#111827" }, children: a.companyName }), _jsx("div", { style: { fontSize: "11px", color: "#9ca3af" }, children: new Date(a.createdAt).toLocaleDateString("en-GB", {
                                                            day: "numeric", month: "short", year: "numeric"
                                                        }) })] }), _jsx("span", { style: { fontSize: "12px", color: "#374151" }, children: SCENARIO_LABELS[a.scenarioId] ?? a.scenarioId }), _jsx("span", { style: {
                                                    fontSize: "11px",
                                                    fontWeight: 600,
                                                    padding: "3px 8px",
                                                    borderRadius: "4px",
                                                    background: complexityBg(a.complexityLevel),
                                                    color: complexityColor(a.complexityLevel),
                                                    display: "inline-block",
                                                }, children: a.complexityLevel ?? "—" }), _jsx("span", { style: { fontSize: "12px", color: "#374151" }, children: a.mandayMin && a.mandayMax
                                                    ? `${a.mandayMin}–${a.mandayMax} days`
                                                    : a.mandayMin
                                                        ? `${a.mandayMin}+ days`
                                                        : "—" }), _jsx(StatusBadge, { status: a.status }), _jsx("button", { onClick: () => navigate(`/report/${a.id}`), disabled: a.status !== "completed", style: {
                                                    padding: "6px 14px",
                                                    borderRadius: "6px",
                                                    border: "1px solid #e5e7eb",
                                                    background: a.status === "completed" ? "#fff" : "#f9fafb",
                                                    color: a.status === "completed" ? "#374151" : "#d1d5db",
                                                    fontSize: "12px",
                                                    cursor: a.status === "completed" ? "pointer" : "not-allowed",
                                                    fontWeight: 500,
                                                }, children: "View" })] }, a.id)))] }))] })] })] }));
}
// ── Button styles ──
const primaryBtn = {
    padding: "9px 18px",
    borderRadius: "8px",
    border: "none",
    background: "#185FA5",
    color: "#fff",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 600,
};
const outlineBtn = {
    padding: "9px 18px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    color: "#374151",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
};
