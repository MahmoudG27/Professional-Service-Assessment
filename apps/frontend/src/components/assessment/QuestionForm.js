import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export default function QuestionForm({ title, subtitle, questions, initial = {}, submitLabel = "Continue →", showBackButton = true, onComplete, onBack, }) {
    const [answers, setAnswers] = useState(initial);
    const [errors, setErrors] = useState({});
    function setAnswer(id, value) {
        setAnswers(prev => ({ ...prev, [id]: value }));
        if (errors[id])
            setErrors(prev => ({ ...prev, [id]: "" }));
    }
    // Values that are mutually exclusive with all other options
    const EXCLUSIVE_VALUES = ["not-sure", "none"];
    function toggleMultiChoice(id, value) {
        const current = answers[id] ?? [];
        // If clicking an exclusive value — clear everything else and select only it
        if (EXCLUSIVE_VALUES.includes(value)) {
            const alreadySelected = current.includes(value);
            setAnswer(id, alreadySelected ? [] : [value]);
            return;
        }
        // If clicking a normal value — remove any exclusive values first, then toggle
        const withoutExclusive = current.filter(v => !EXCLUSIVE_VALUES.includes(v));
        const updated = withoutExclusive.includes(value)
            ? withoutExclusive.filter(v => v !== value)
            : [...withoutExclusive, value];
        setAnswer(id, updated);
    }
    function validate() {
        const newErrors = {};
        for (const q of questions) {
            if (!q.required)
                continue;
            const val = answers[q.id];
            const isEmpty = !val || (Array.isArray(val) && val.length === 0) || val === "";
            if (isEmpty)
                newErrors[q.id] = "This question is required.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    function handleSubmit() {
        if (validate())
            onComplete(answers);
    }
    return (_jsxs("div", { children: [_jsx("h2", { style: { fontSize: "18px", fontWeight: 600, color: "#111827", margin: "0 0 6px" }, children: title }), subtitle && (_jsx("p", { style: { fontSize: "14px", color: "#6b7280", margin: "0 0 28px" }, children: subtitle })), _jsx("div", { style: { display: "flex", flexDirection: "column", gap: "28px" }, children: questions.map(q => (_jsxs("div", { children: [_jsxs("label", { style: {
                                display: "block",
                                fontSize: "14px",
                                fontWeight: 600,
                                color: "#111827",
                                marginBottom: q.type === "text" ? "8px" : "10px",
                            }, children: [q.text, q.required && _jsx("span", { style: { color: "#E24B4A", marginLeft: "4px" }, children: "*" })] }), q.helpText && (_jsx("p", { style: { fontSize: "12px", color: "#9ca3af", margin: "-4px 0 8px" }, children: q.helpText })), q.type === "text" && (_jsx("input", { type: "text", value: answers[q.id] ?? "", onChange: e => setAnswer(q.id, e.target.value), placeholder: "Type here...", style: {
                                width: "100%",
                                padding: "10px 14px",
                                borderRadius: "8px",
                                border: errors[q.id] ? "1.5px solid #E24B4A" : "1.5px solid #e5e7eb",
                                fontSize: "14px",
                                color: "#111827",
                                outline: "none",
                                boxSizing: "border-box",
                                background: "#fff",
                                transition: "border-color 0.15s",
                            }, onFocus: e => (e.target.style.borderColor = "#185FA5"), onBlur: e => (e.target.style.borderColor = errors[q.id] ? "#E24B4A" : "#e5e7eb") })), q.type === "singleChoice" && q.options && (_jsx("div", { style: { display: "grid", gap: "8px" }, children: q.options.map(opt => {
                                const isSelected = answers[q.id] === opt.value;
                                return (_jsxs("div", { onClick: () => setAnswer(q.id, opt.value), style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        padding: "10px 14px",
                                        borderRadius: "8px",
                                        border: isSelected ? "2px solid #185FA5" : "2px solid #e5e7eb",
                                        background: isSelected ? "#E6F1FB" : "#fff",
                                        cursor: "pointer",
                                        transition: "all 0.12s",
                                    }, children: [_jsx("div", { style: {
                                                width: "16px",
                                                height: "16px",
                                                borderRadius: "50%",
                                                border: isSelected ? "5px solid #185FA5" : "2px solid #d1d5db",
                                                flexShrink: 0,
                                                background: "#fff",
                                                transition: "all 0.12s",
                                            } }), _jsx("span", { style: {
                                                fontSize: "13px",
                                                color: isSelected ? "#0C447C" : "#374151",
                                                fontWeight: isSelected ? 500 : 400,
                                            }, children: opt.label })] }, opt.value));
                            }) })), q.type === "multiChoice" && q.options && (_jsx("div", { style: { display: "grid", gap: "8px" }, children: q.options.map(opt => {
                                const selected = (answers[q.id] ?? []).includes(opt.value);
                                return (_jsxs("div", { onClick: () => toggleMultiChoice(q.id, opt.value), style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        padding: "10px 14px",
                                        borderRadius: "8px",
                                        border: selected ? "2px solid #185FA5" : "2px solid #e5e7eb",
                                        background: selected ? "#E6F1FB" : "#fff",
                                        cursor: "pointer",
                                        transition: "all 0.12s",
                                    }, children: [_jsx("div", { style: {
                                                width: "16px",
                                                height: "16px",
                                                borderRadius: "4px",
                                                border: selected ? "none" : "2px solid #d1d5db",
                                                background: selected ? "#185FA5" : "#fff",
                                                flexShrink: 0,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                transition: "all 0.12s",
                                            }, children: selected && (_jsx("svg", { width: "10", height: "8", viewBox: "0 0 10 8", fill: "none", children: _jsx("path", { d: "M1 4L3.5 6.5L9 1", stroke: "white", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) })) }), _jsx("span", { style: {
                                                fontSize: "13px",
                                                color: selected ? "#0C447C" : "#374151",
                                                fontWeight: selected ? 500 : 400,
                                            }, children: opt.label })] }, opt.value));
                            }) })), errors[q.id] && (_jsx("p", { style: { fontSize: "12px", color: "#E24B4A", margin: "6px 0 0" }, children: errors[q.id] }))] }, q.id))) }), _jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginTop: "36px" }, children: [showBackButton && (_jsx("button", { onClick: onBack, style: {
                            padding: "10px 20px",
                            borderRadius: "8px",
                            border: "1px solid #e5e7eb",
                            background: "#fff",
                            color: "#374151",
                            fontSize: "14px",
                            cursor: "pointer",
                            fontWeight: 500,
                        }, children: "\u2190 Back" })), _jsx("button", { onClick: handleSubmit, style: {
                            padding: "10px 28px",
                            borderRadius: "8px",
                            border: "none",
                            background: "#185FA5",
                            color: "#fff",
                            fontSize: "14px",
                            cursor: "pointer",
                            fontWeight: 600,
                        }, children: submitLabel })] })] }));
}
