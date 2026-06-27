import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTopComplexityDrivers } from "../../engine/scenarioEngine";
import { getScenarioById } from "../../scenarios";
// ================================================================
// Color helpers
// ================================================================
function severityColor(s) {
    switch (s) {
        case "critical": return { bg: "#FCEBEB", text: "#791F1F", dot: "#E24B4A" };
        case "warning": return { bg: "#FAF0DC", text: "#7A4F0A", dot: "#D97706" };
        case "strength": return { bg: "#EAF3DE", text: "#27500A", dot: "#5A9E23" };
        default: return { bg: "#F0F4FF", text: "#1E3A8A", dot: "#3B82F6" };
    }
}
function priorityBadge(p) {
    switch (p) {
        case "critical": return { bg: "#FCEBEB", text: "#791F1F", label: "Critical" };
        case "high": return { bg: "#FAF0DC", text: "#7A4F0A", label: "High" };
        case "medium": return { bg: "#E6F1FB", text: "#0C447C", label: "Medium" };
        default: return { bg: "#F3F4F6", text: "#374151", label: "Low" };
    }
}
function effortBadge(e) {
    switch (e) {
        case "high": return { bg: "#FCEBEB", text: "#791F1F" };
        case "medium": return { bg: "#FAF0DC", text: "#7A4F0A" };
        default: return { bg: "#EAF3DE", text: "#27500A" };
    }
}
function complexityColor(level) {
    if (level.includes("Enterprise"))
        return "#791F1F";
    if (level.includes("High"))
        return "#7A4F0A";
    if (level.includes("Medium"))
        return "#0C447C";
    return "#27500A";
}
function complexityBg(level) {
    if (level.includes("Enterprise"))
        return "#FCEBEB";
    if (level.includes("High"))
        return "#FAF0DC";
    if (level.includes("Medium"))
        return "#E6F1FB";
    return "#EAF3DE";
}
// ================================================================
// Section wrapper
// ================================================================
function Section({ number, title, children }) {
    return (_jsxs("div", { style: { marginBottom: "32px" }, children: [_jsxs("div", { style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "16px",
                    paddingBottom: "10px",
                    borderBottom: "1.5px solid #e5e7eb",
                }, children: [_jsx("span", { style: {
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "#185FA5",
                            letterSpacing: "0.06em",
                            background: "#E6F1FB",
                            padding: "2px 8px",
                            borderRadius: "4px",
                        }, children: number }), _jsx("span", { style: { fontSize: "15px", fontWeight: 600, color: "#111827" }, children: title })] }), children] }));
}
// ================================================================
// Main Report Component
// ================================================================
export default function ReportPage({ report, onGeneratePDF, onSendEmail, onStartNew }) {
    const { companyProfile, complexity, effort, pricing, confidence, executiveSummary, keyFindings, recommendedServices, prerequisites, whatWeWillDeliver, nextSteps, scenarioResult } = report;
    const scenario = getScenarioById(report.scenarioResult.scenarioId);
    const drivers = scenario
        ? getTopComplexityDrivers(scenario, report.scenarioResult.answers)
        : [];
    function impactLabel(points) {
        if (points >= 30)
            return { label: "High Impact", color: "#791F1F", bg: "#FCEBEB" };
        if (points >= 15)
            return { label: "Medium Impact", color: "#7A4F0A", bg: "#FAF0DC" };
        return { label: "Low Impact", color: "#374151", bg: "#F3F4F6" };
    }
    return (_jsx("div", { style: { minHeight: "100vh", background: "#f8fafc", padding: "32px 16px" }, children: _jsxs("div", { style: {
                maxWidth: "820px",
                margin: "0 auto",
                background: "#fff",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                overflow: "hidden",
            }, children: [_jsxs("div", { style: {
                        background: "linear-gradient(135deg, #0C447C 0%, #185FA5 100%)",
                        padding: "32px 40px",
                        color: "#fff",
                    }, children: [_jsx("div", { style: { fontSize: "12px", letterSpacing: "0.08em", opacity: 0.7, marginBottom: "6px" }, children: "KlayyTech \u00B7 Professional Services Assessment" }), _jsx("h1", { style: { fontSize: "24px", fontWeight: 700, margin: "0 0 4px" }, children: companyProfile.companyName }), _jsx("p", { style: { fontSize: "14px", opacity: 0.8, margin: "0 0 20px" }, children: scenarioResult.scenarioName }), _jsx("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [
                                companyProfile.industry,
                                companyProfile.employeesAndUsers,
                                `Confidence ${confidence.score}%`,
                                `Report ID: ${report.meta.reportId}`,
                            ].map((pill, i) => (_jsx("span", { style: {
                                    fontSize: "12px",
                                    background: "rgba(255,255,255,0.15)",
                                    padding: "3px 10px",
                                    borderRadius: "20px",
                                    letterSpacing: "0.02em",
                                }, children: pill }, i))) })] }), _jsxs("div", { style: {
                        display: "flex",
                        gap: "10px",
                        padding: "16px 40px",
                        borderBottom: "1px solid #e5e7eb",
                        background: "#FAFBFC",
                    }, children: [onGeneratePDF && (_jsx("button", { onClick: onGeneratePDF, style: actionBtn("#185FA5", "#fff"), children: "\uD83D\uDCC4 Download PDF" })), onSendEmail && (_jsx("button", { onClick: onSendEmail, style: actionBtn("#fff", "#374151", "#e5e7eb"), children: "\u2709\uFE0F Send to client" })), onStartNew && (_jsx("button", { onClick: onStartNew, style: { ...actionBtn("#fff", "#9ca3af", "#e5e7eb"), marginLeft: "auto" }, children: "+ New assessment" }))] }), _jsxs("div", { style: { padding: "40px" }, children: [_jsx(Section, { number: "01", title: "Company & Service Overview", children: _jsx("div", { style: {
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "12px",
                                }, children: [
                                    { label: "Company", value: companyProfile.companyName },
                                    { label: "Industry", value: companyProfile.industry },
                                    { label: "Size", value: companyProfile.employeesAndUsers },
                                    { label: "IT Team", value: companyProfile.itTeam },
                                    { label: "Service", value: scenarioResult.scenarioName },
                                    { label: "Generated", value: new Date(report.meta.generatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) },
                                ].map(item => (_jsxs("div", { style: {
                                        padding: "12px 16px",
                                        background: "#f8fafc",
                                        borderRadius: "8px",
                                        border: "1px solid #e5e7eb",
                                    }, children: [_jsx("div", { style: { fontSize: "11px", color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "4px" }, children: item.label }), _jsx("div", { style: { fontSize: "14px", color: "#111827", fontWeight: 500 }, children: item.value })] }, item.label))) }) }), _jsxs(Section, { number: "02", title: "Project Complexity", children: [_jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }, children: [_jsxs("div", { style: {
                                                gridColumn: "1 / 2",
                                                padding: "20px",
                                                borderRadius: "10px",
                                                background: complexityBg(complexity.level),
                                                border: `1.5px solid ${complexityColor(complexity.level)}22`,
                                                textAlign: "center",
                                            }, children: [_jsx("div", { style: { fontSize: "11px", color: complexityColor(complexity.level), fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "8px" }, children: "Complexity Level" }), _jsx("div", { style: { fontSize: "18px", fontWeight: 700, color: complexityColor(complexity.level) }, children: complexity.level }), _jsxs("div", { style: { fontSize: "12px", color: complexityColor(complexity.level), opacity: 0.7, marginTop: "4px" }, children: ["Score: ", complexity.score, " pts"] })] }), _jsxs("div", { style: {
                                                padding: "20px",
                                                borderRadius: "10px",
                                                background: "#f8fafc",
                                                border: "1.5px solid #e5e7eb",
                                                textAlign: "center",
                                            }, children: [_jsx("div", { style: { fontSize: "11px", color: "#6b7280", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "8px" }, children: "Estimated Effort" }), _jsx("div", { style: { fontSize: "22px", fontWeight: 700, color: "#111827" }, children: effort.label })] }), _jsxs("div", { style: {
                                                padding: "20px",
                                                borderRadius: "10px",
                                                background: "#f8fafc",
                                                border: "1.5px solid #e5e7eb",
                                                textAlign: "center",
                                            }, children: [_jsx("div", { style: { fontSize: "11px", color: "#6b7280", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "8px" }, children: "Indicative Service Cost" }), _jsx("div", { style: { fontSize: "20px", fontWeight: 700, color: "#111827" }, children: pricing.label }), _jsx("div", { style: { fontSize: "11px", color: "#9ca3af", marginTop: "4px" }, children: pricing.currency })] })] }), _jsxs("div", { style: { marginTop: "16px", padding: "14px 16px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e5e7eb" }, children: [_jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "8px" }, children: [_jsx("span", { style: { fontSize: "12px", color: "#6b7280", fontWeight: 600 }, children: "Assessment Confidence" }), _jsxs("span", { style: { fontSize: "12px", color: "#111827", fontWeight: 700 }, children: [confidence.score, "%"] })] }), _jsx("div", { style: { height: "6px", background: "#e5e7eb", borderRadius: "3px", overflow: "hidden" }, children: _jsx("div", { style: {
                                                    width: `${confidence.score}%`,
                                                    height: "100%",
                                                    background: confidence.score >= 80 ? "#5A9E23" : confidence.score >= 65 ? "#D97706" : "#E24B4A",
                                                    borderRadius: "3px",
                                                    transition: "width 0.4s ease",
                                                } }) }), confidence.score < 70 && (_jsx("p", { style: { fontSize: "12px", color: "#7A4F0A", margin: "8px 0 0" }, children: "\u26A0\uFE0F Confidence is below 70% \u2014 a discovery workshop is recommended to validate this estimate." }))] })] }), drivers.length > 0 && (_jsxs(Section, { number: "03", title: "Top Complexity Factors", children: [_jsx("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: drivers.map((d, i) => {
                                        const impact = impactLabel(d.points);
                                        return (_jsxs("div", { style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "12px",
                                                padding: "10px 14px",
                                                borderRadius: "8px",
                                                background: "#f8fafc",
                                                border: "1px solid #e5e7eb",
                                            }, children: [_jsx("span", { style: { color: "#185FA5", fontWeight: 700, fontSize: "14px", flexShrink: 0 }, children: "\u2713" }), _jsx("span", { style: { fontSize: "13px", color: "#374151", flex: 1 }, children: d.label }), _jsx("span", { style: {
                                                        fontSize: "11px",
                                                        fontWeight: 600,
                                                        padding: "2px 8px",
                                                        borderRadius: "4px",
                                                        background: impact.bg,
                                                        color: impact.color,
                                                        flexShrink: 0,
                                                    }, children: impact.label })] }, i));
                                    }) }), _jsx("p", { style: { fontSize: "12px", color: "#9ca3af", marginTop: "12px", fontStyle: "italic" }, children: "These factors contributed most to the complexity assessment based on your answers." })] })), _jsx(Section, { number: "03", title: "Executive Summary", children: _jsx("div", { style: {
                                    padding: "20px",
                                    background: "#E6F1FB",
                                    borderRadius: "10px",
                                    border: "1px solid #B5D4F4",
                                    fontSize: "14px",
                                    color: "#0C447C",
                                    lineHeight: "1.7",
                                }, children: executiveSummary.keyMessage }) }), keyFindings.length > 0 && (_jsx(Section, { number: "04", title: "Key Findings", children: _jsx("div", { style: { display: "flex", flexDirection: "column", gap: "10px" }, children: keyFindings.map((f, i) => {
                                    const c = severityColor(f.severity);
                                    return (_jsxs("div", { style: {
                                            padding: "14px 16px",
                                            borderRadius: "8px",
                                            background: c.bg,
                                            border: `1px solid ${c.dot}33`,
                                            display: "flex",
                                            gap: "12px",
                                            alignItems: "flex-start",
                                        }, children: [_jsx("div", { style: {
                                                    width: "8px", height: "8px", borderRadius: "50%",
                                                    background: c.dot, flexShrink: 0, marginTop: "5px",
                                                } }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: "13px", fontWeight: 600, color: c.text, marginBottom: "3px" }, children: f.title }), _jsx("div", { style: { fontSize: "13px", color: c.text, opacity: 0.85, lineHeight: "1.5" }, children: f.description }), f.businessImpact && (_jsxs("div", { style: { fontSize: "12px", color: c.text, opacity: 0.7, marginTop: "6px", fontStyle: "italic" }, children: ["Impact: ", f.businessImpact] }))] })] }, i));
                                }) }) })), recommendedServices.length > 0 && (_jsx(Section, { number: "05", title: "Recommended Azure Services", children: _jsx("div", { style: { display: "flex", flexDirection: "column", gap: "10px" }, children: recommendedServices.map((r, i) => {
                                    const badge = priorityBadge(r.priority);
                                    return (_jsxs("div", { style: {
                                            padding: "16px",
                                            borderRadius: "8px",
                                            background: "#f8fafc",
                                            border: "1px solid #e5e7eb",
                                        }, children: [_jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }, children: [_jsx("div", { style: { fontSize: "14px", fontWeight: 600, color: "#185FA5" }, children: r.service }), _jsx("span", { style: {
                                                            fontSize: "11px", fontWeight: 600,
                                                            padding: "2px 8px", borderRadius: "20px",
                                                            background: badge.bg, color: badge.text,
                                                            flexShrink: 0, marginLeft: "8px",
                                                        }, children: badge.label })] }), _jsx("div", { style: { fontSize: "13px", color: "#374151", marginBottom: "4px", lineHeight: "1.5" }, children: r.outcome }), _jsxs("div", { style: { fontSize: "12px", color: "#9ca3af", fontStyle: "italic", lineHeight: "1.4" }, children: ["Why it fits: ", r.whyItFits] })] }, i));
                                }) }) })), prerequisites.length > 0 && (_jsx(Section, { number: "06", title: "Prerequisites", children: _jsx("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: prerequisites.map((p, i) => {
                                    const badge = effortBadge(p.effort);
                                    return (_jsxs("div", { style: {
                                            padding: "12px 16px",
                                            borderRadius: "8px",
                                            background: "#f8fafc",
                                            border: "1px solid #e5e7eb",
                                            display: "flex",
                                            gap: "12px",
                                            alignItems: "flex-start",
                                        }, children: [_jsx("span", { style: {
                                                    fontSize: "11px", fontWeight: 600,
                                                    padding: "2px 8px", borderRadius: "4px",
                                                    background: badge.bg, color: badge.text,
                                                    flexShrink: 0, marginTop: "1px",
                                                    textTransform: "capitalize",
                                                }, children: p.effort }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: "13px", fontWeight: 600, color: "#111827", marginBottom: "2px" }, children: p.title }), _jsx("div", { style: { fontSize: "13px", color: "#6b7280", lineHeight: "1.5" }, children: p.description })] })] }, i));
                                }) }) })), whatWeWillDeliver.length > 0 && (_jsx(Section, { number: "07", title: "What We Will Deliver", children: _jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }, children: whatWeWillDeliver.map((d, i) => (_jsxs("div", { style: {
                                        padding: "14px 16px",
                                        borderRadius: "8px",
                                        background: "#f8fafc",
                                        border: "1px solid #e5e7eb",
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "flex-start",
                                    }, children: [_jsx("span", { style: { fontSize: "16px", flexShrink: 0 }, children: "\u2713" }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: "13px", fontWeight: 600, color: "#111827", marginBottom: "3px" }, children: d.title }), _jsx("div", { style: { fontSize: "12px", color: "#6b7280", lineHeight: "1.5" }, children: d.description })] })] }, i))) }) })), _jsx(Section, { number: "08", title: "Next Steps", children: _jsx("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: nextSteps.map((step, i) => (_jsxs("div", { style: {
                                        display: "flex",
                                        gap: "14px",
                                        alignItems: "flex-start",
                                        padding: "12px 16px",
                                        borderRadius: "8px",
                                        background: i === 0 ? "#E6F1FB" : "#f8fafc",
                                        border: i === 0 ? "1px solid #B5D4F4" : "1px solid #e5e7eb",
                                    }, children: [_jsx("div", { style: {
                                                width: "24px", height: "24px", borderRadius: "50%",
                                                background: i === 0 ? "#185FA5" : "#e5e7eb",
                                                color: i === 0 ? "#fff" : "#6b7280",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontSize: "12px", fontWeight: 700, flexShrink: 0,
                                            }, children: i + 1 }), _jsx("div", { style: { fontSize: "13px", color: i === 0 ? "#0C447C" : "#374151", lineHeight: "1.5", fontWeight: i === 0 ? 500 : 400 }, children: step })] }, i))) }) }), _jsxs("div", { style: {
                                padding: "16px",
                                borderRadius: "8px",
                                background: "#f8fafc",
                                border: "1px solid #e5e7eb",
                                marginTop: "8px",
                            }, children: [_jsx("div", { style: { fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }, children: "Important Disclaimer" }), _jsx("div", { style: { fontSize: "12px", color: "#9ca3af", lineHeight: "1.6" }, children: "This assessment is intended for informational and planning purposes only. The findings, recommendations, timelines, and cost estimates are based on information provided during the assessment and may not reflect the full complexity of your environment. Final architecture, pricing, and security requirements may vary based on detailed discovery and implementation scope. KlayyTech recommends a formal technical discovery engagement before commencing any activities." })] })] })] }) }));
}
// ── Helper ──
function actionBtn(bg, color, border) {
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
