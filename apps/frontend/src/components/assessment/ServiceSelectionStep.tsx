import { useState } from "react";
import { scenarioCatalog } from "../../scenarios";

// Icons mapped to scenario ids
const SCENARIO_ICONS: Record<string, string> = {
  "azure-migration":          "🔄",
  "modernization":            "⚙️",
  "disaster-recovery":        "🛡️",
  "security-assessment":      "🔒",
  "subscription-optimization": "📊",
  "subscription-migration":   "↔️",
};

interface Props {
  onSelect: (scenarioId: string) => void;
  onBack: () => void;
}

export default function ServiceSelectionStep({ onSelect, onBack }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  function handleContinue() {
    if (selected) onSelect(selected);
  }

  return (
    <div>
      <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#111827", margin: "0 0 6px" }}>
        What are you looking to achieve?
      </h2>
      <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 24px" }}>
        Select the service that best matches your current needs. Each option includes a
        brief description to help you choose.
      </p>

      <div style={{ display: "grid", gap: "12px" }}>
        {scenarioCatalog.map(scenario => {
          const isSelected = selected === scenario.id;
          const isHovered = hovered === scenario.id;

          return (
            <div
              key={scenario.id}
              onClick={() => setSelected(scenario.id)}
              onMouseEnter={() => setHovered(scenario.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                padding: "16px 20px",
                borderRadius: "10px",
                border: isSelected
                  ? "2px solid #185FA5"
                  : isHovered
                  ? "2px solid #B5D4F4"
                  : "2px solid #e5e7eb",
                background: isSelected ? "#E6F1FB" : isHovered ? "#f8fafc" : "#fff",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {/* Radio indicator */}
              <div style={{
                marginTop: "2px",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                border: isSelected ? "5px solid #185FA5" : "2px solid #d1d5db",
                background: "#fff",
                flexShrink: 0,
                transition: "all 0.15s",
              }} />

              {/* Icon */}
              <span style={{ fontSize: "22px", flexShrink: 0, marginTop: "1px" }}>
                {SCENARIO_ICONS[scenario.id] ?? "🔧"}
              </span>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: isSelected ? "#0C447C" : "#111827",
                  marginBottom: "4px",
                }}>
                  {scenario.name}
                </div>
                <div style={{ fontSize: "13px", color: "#6b7280", lineHeight: "1.5" }}>
                  {scenario.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px" }}>
        <button
          onClick={onBack}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            background: "#fff",
            color: "#374151",
            fontSize: "14px",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          ← Back
        </button>

        <button
          onClick={handleContinue}
          disabled={!selected}
          style={{
            padding: "10px 28px",
            borderRadius: "8px",
            border: "none",
            background: selected ? "#185FA5" : "#e5e7eb",
            color: selected ? "#fff" : "#9ca3af",
            fontSize: "14px",
            cursor: selected ? "pointer" : "not-allowed",
            fontWeight: 600,
            transition: "all 0.15s",
          }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
