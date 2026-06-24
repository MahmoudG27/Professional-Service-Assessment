// ================================================================
// V2 PDF Constants
// ================================================================

// Page dimensions (A4)
export const PAGE = { W: 595.28, H: 841.89 };

// Margins
export const M  = 40;   // left/right margin
export const MT = 48;   // top margin
export const MB = 48;   // bottom margin

// Content width
export const CW = PAGE.W - M * 2;  // 515.28

// Spacing
export const S = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
};

// Colors
export const C = {
  // Brand
  primary:     "#185FA5",
  primaryDark: "#0C447C",
  primaryLight:"#E6F1FB",
  primaryBorder:"#B5D4F4",

  // Text
  text:        "#111827",
  textMid:     "#374151",
  textMuted:   "#6b7280",
  textLight:   "#9ca3af",

  // UI
  white:       "#FFFFFF",
  bg:          "#F8FAFB",
  border:      "#E2E8F0",
  borderLight: "#F3F4F6",

  // Severity
  critical:    "#791F1F",
  criticalBg:  "#FCEBEB",
  warning:     "#7A4F0A",
  warningBg:   "#FAF0DC",
  strength:    "#27500A",
  strengthBg:  "#EAF3DE",
  info:        "#1E3A8A",
  infoBg:      "#EFF6FF",

  // Impact
  highImpact:   "#791F1F",
  highBg:       "#FCEBEB",
  mediumImpact: "#7A4F0A",
  mediumBg:     "#FAF0DC",
  lowImpact:    "#374151",
  lowBg:        "#F3F4F6",

  // Complexity
  enterprise:   "#791F1F",
  enterpriseBg: "#FCEBEB",
  high:         "#7A4F0A",
  highCBg:      "#FAF0DC",
  medium:       "#0C447C",
  mediumCBg:    "#E6F1FB",
  low:          "#27500A",
  lowCBg:       "#EAF3DE",
};

// Fonts (PDFKit built-in)
export const F = {
  regular: "Helvetica",
  bold:    "Helvetica-Bold",
  italic:  "Helvetica-Oblique",
};

// Section number prefix style
export const SECTION_NUM_W = 28;

// Footer height
export const FOOTER_H = 28;

// ================================================================
// Helpers
// ================================================================

export function complexityColors(level: string): { text: string; bg: string } {
  if (level.includes("Enterprise")) return { text: C.enterprise, bg: C.enterpriseBg };
  if (level.includes("High"))       return { text: C.high,       bg: C.highCBg };
  if (level.includes("Medium"))     return { text: C.medium,     bg: C.mediumCBg };
  return                                   { text: C.low,        bg: C.lowCBg };
}

export function severityColors(s: string): { text: string; bg: string } {
  switch (s) {
    case "critical": return { text: C.critical, bg: C.criticalBg };
    case "warning":  return { text: C.warning,  bg: C.warningBg };
    case "strength": return { text: C.strength, bg: C.strengthBg };
    default:         return { text: C.info,     bg: C.infoBg };
  }
}

export function impactColors(points: number): { text: string; bg: string; label: string } {
  if (points >= 30) return { text: C.highImpact,   bg: C.highBg,   label: "High Impact" };
  if (points >= 15) return { text: C.mediumImpact, bg: C.mediumBg, label: "Medium Impact" };
  return                   { text: C.lowImpact,    bg: C.lowBg,    label: "Low Impact" };
}