import PDFDocument from "pdfkit";
import {
  PAGE, M, CW, C, F, S,
  complexityColors, severityColors, impactColors,
} from "./constants";
import {
  fc, sc, hline, fillRect, fillRoundRect,
  PageManager, sectionHeader,
} from "./pageManager";
import { ProfessionalServicesReport } from "../../reports/professionalServicesReport";
import { getTopComplexityDrivers } from "../../engine/scenarioEngine";
import { getScenarioById } from "../../scenarios";

// ================================================================
// 01 — Company & Service Overview
// ================================================================
export function renderOverview(
  page: PageManager,
  report: ProfessionalServicesReport
) {
  const doc = page.doc;
  sectionHeader(page, "01", "Company & Service Overview");

  const items = [
    { label: "Company",   value: report.companyProfile.companyName },
    { label: "Industry",  value: report.companyProfile.industry ?? "—" },
    { label: "Size",      value: report.companyProfile.employeesAndUsers ?? "—" },
    { label: "IT Team",   value: report.companyProfile.itTeam ?? "—" },
    { label: "Service",   value: report.scenarioResult.scenarioName },
    { label: "Generated", value: new Date(report.meta.generatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) },
  ];

  const colW = CW / 2 - 6;
  items.forEach((item, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = M + col * (colW + 12);
    const y = page.y + row * 36;

    page.ensureSpace(40);
    fillRoundRect(doc, x, y, colW, 28, 3, C.bg);
    fc(doc, C.textLight);
    doc.font(F.regular).fontSize(7).text(item.label.toUpperCase(), x + 8, y + 6, { characterSpacing: 0.4 });
    fc(doc, C.text);
    doc.font(F.bold).fontSize(10).text(item.value, x + 8, y + 16, { width: colW - 16 });
  });

  page.addSpacing(Math.ceil(items.length / 2) * 36 + S.lg);
}

// ================================================================
// 02 — Project Complexity
// ================================================================
export function renderComplexity(
  page: PageManager,
  report: ProfessionalServicesReport
) {
  const doc = page.doc;
  sectionHeader(page, "02", "Project Complexity");

  const cc = complexityColors(report.complexity.level);
  const colW = CW / 3 - 6;

  // Complexity level card
  page.ensureSpace(72);
  fillRoundRect(doc, M, page.y, colW, 64, 4, cc.bg);
  fc(doc, cc.text);
  doc.font(F.regular).fontSize(7).text("COMPLEXITY LEVEL", M + 8, page.y + 8, { characterSpacing: 0.4 });
  doc.font(F.bold).fontSize(14).text(report.complexity.level, M + 8, page.y + 20, { width: colW - 16 });
  doc.font(F.regular).fontSize(8).text(`Score: ${report.complexity.score} pts`, M + 8, page.y + 48);

  // Effort card
  const x2 = M + colW + 12;
  fillRoundRect(doc, x2, page.y, colW, 64, 4, C.bg);
  fc(doc, C.textMuted);
  doc.font(F.regular).fontSize(7).text("ESTIMATED EFFORT", x2 + 8, page.y + 8, { characterSpacing: 0.4 });
  fc(doc, C.text);
  doc.font(F.bold).fontSize(16).text(report.effort.label, x2 + 8, page.y + 20, { width: colW - 16 });

  // Price card
  const x3 = M + (colW + 12) * 2;
  fillRoundRect(doc, x3, page.y, colW, 64, 4, C.bg);
  fc(doc, C.textMuted);
  doc.font(F.regular).fontSize(7).text("INDICATIVE SERVICE COST", x3 + 8, page.y + 8, { characterSpacing: 0.4 });
  fc(doc, C.text);
  doc.font(F.bold).fontSize(14).text(report.pricing.label, x3 + 8, page.y + 20, { width: colW - 16 });
  fc(doc, C.textLight);
  doc.font(F.regular).fontSize(8).text(report.pricing.currency ?? "USD", x3 + 8, page.y + 48);

  page.addSpacing(72 + S.md);

  // Confidence bar
  page.ensureSpace(30);
  const barW = CW;
  const filledW = (report.confidence.score / 100) * barW;
  const barColor = report.confidence.score >= 80 ? C.strength
    : report.confidence.score >= 65 ? C.warning
    : C.critical;

  fc(doc, C.textMuted);
  doc.font(F.regular).fontSize(8).text("Assessment Confidence", M, page.y);
  fc(doc, C.text);
  doc.font(F.bold).fontSize(8).text(`${report.confidence.score}%`, M + CW - 30, page.y);
  page.addSpacing(14);

  fillRoundRect(doc, M, page.y, barW, 6, 3, C.borderLight);
  fillRoundRect(doc, M, page.y, filledW, 6, 3, barColor);
  page.addSpacing(S.lg + S.sm);

  if (report.confidence.score < 70) {
    page.ensureSpace(24);
    fillRoundRect(doc, M, page.y, CW, 20, 3, C.warningBg);
    fc(doc, C.warning);
    doc.font(F.regular).fontSize(8)
      .text("⚠  Confidence below 70% — a discovery workshop is recommended to validate this estimate.",
        M + 8, page.y + 5, { width: CW - 16 });
    page.addSpacing(28);
  }
}

// ================================================================
// 03 — Top Complexity Factors
// ================================================================
export function renderComplexityDrivers(
  page: PageManager,
  report: ProfessionalServicesReport
) {
  const scenario = getScenarioById(report.scenarioResult.scenarioId);
  if (!scenario) return;

  const drivers = getTopComplexityDrivers(scenario, report.scenarioResult.answers);
  if (drivers.length === 0) return;

  const doc = page.doc;
  sectionHeader(page, "03", "Top Complexity Factors");

  drivers.forEach(driver => {
    page.ensureSpace(24);
    const ic = impactColors(driver.points);

    fillRoundRect(doc, M, page.y, CW, 20, 3, C.bg);

    // Checkmark
    fc(doc, C.primary);
    doc.font(F.bold).fontSize(10).text("✓", M + 8, page.y + 5);

    // Label
    fc(doc, C.textMid);
    doc.font(F.regular).fontSize(9).text(driver.label, M + 24, page.y + 6, { width: CW - 100 });

    // Impact badge
    fillRoundRect(doc, M + CW - 80, page.y + 3, 76, 14, 3, ic.bg);
    fc(doc, ic.text);
    doc.font(F.bold).fontSize(7)
      .text(ic.label, M + CW - 80, page.y + 6, { width: 76, align: "center" });

    page.addSpacing(26);
  });

  // Caption
  fc(doc, C.textLight);
  doc.font(F.italic ?? F.regular).fontSize(7.5)
    .text("These factors contributed most to the complexity assessment based on your answers.",
      M, page.y, { width: CW });
  page.addSpacing(S.lg);
}

// ================================================================
// 04 — Executive Summary
// ================================================================
export function renderExecutiveSummary(
  page: PageManager,
  report: ProfessionalServicesReport
) {
  const doc = page.doc;
  sectionHeader(page, "04", "Executive Summary");

  page.ensureSpace(48);
  fillRoundRect(doc, M, page.y, CW, 44, 4, C.primaryLight);
  sc(doc, C.primaryBorder);
  doc.rect(M, page.y, CW, 44).stroke();

  fc(doc, C.primaryDark);
  doc.font(F.regular).fontSize(9.5)
    .text(report.executiveSummary.keyMessage, M + 12, page.y + 10, {
      width: CW - 24,
      lineGap: 3,
    });

  page.addSpacing(52 + S.md);
}

// ================================================================
// 05 — Key Findings
// ================================================================
export function renderFindings(
  page: PageManager,
  report: ProfessionalServicesReport
) {
  if (!report.keyFindings?.length) return;

  const doc = page.doc;
  sectionHeader(page, "05", "Key Findings");

  report.keyFindings.forEach(finding => {
    const sc2 = severityColors(finding.severity);
    const textH = finding.businessImpact ? 56 : 38;

    page.ensureSpace(textH + 8);

    fillRoundRect(doc, M, page.y, CW, textH, 4, sc2.bg);
    // Left accent bar
    fillRect(doc, M, page.y, 4, textH, sc2.text);

    // Dot
    fc(doc, sc2.text);
    doc.circle(M + 16, page.y + 12, 3).fill();

    // Title
    doc.font(F.bold).fontSize(9).text(finding.title, M + 26, page.y + 7, { width: CW - 36 });

    // Description
    fc(doc, sc2.text);
    doc.font(F.regular).fontSize(8)
      .text(finding.description, M + 26, page.y + 20, { width: CW - 36, lineGap: 2 });

    // Impact
    if (finding.businessImpact) {
      doc.font(F.italic ?? F.regular).fontSize(7.5)
        .text(`Impact: ${finding.businessImpact}`, M + 26, page.y + 43, { width: CW - 36 });
    }

    page.addSpacing(textH + S.sm);
  });

  page.addSpacing(S.sm);
}

// ================================================================
// 06 — Recommended Azure Services
// ================================================================
export function renderRecommendations(
  page: PageManager,
  report: ProfessionalServicesReport
) {
  if (!report.recommendedServices?.length) return;

  const doc = page.doc;
  sectionHeader(page, "06", "Recommended Azure Services");

  const priorityColors: Record<string, { text: string; bg: string }> = {
    critical: { text: C.critical, bg: C.criticalBg },
    high:     { text: C.warning,  bg: C.warningBg },
    medium:   { text: C.primary,  bg: C.primaryLight },
    low:      { text: C.textMid,  bg: C.borderLight },
  };

  report.recommendedServices.forEach(rec => {
    const pc = priorityColors[rec.priority] ?? priorityColors.low;

    page.ensureSpace(64);

    fillRoundRect(doc, M, page.y, CW, 60, 4, C.bg);

    // Service name + priority badge
    fc(doc, C.primary);
    doc.font(F.bold).fontSize(10).text(rec.service, M + 10, page.y + 8, { width: CW - 80 });

    fillRoundRect(doc, M + CW - 68, page.y + 6, 64, 14, 3, pc.bg);
    fc(doc, pc.text);
    doc.font(F.bold).fontSize(7)
      .text(rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1),
        M + CW - 68, page.y + 10, { width: 64, align: "center" });

    // Outcome
    fc(doc, C.textMid);
    doc.font(F.regular).fontSize(8.5)
      .text(rec.outcome, M + 10, page.y + 23, { width: CW - 20, lineGap: 2 });

    // Why it fits
    fc(doc, C.textLight);
    doc.font(F.italic ?? F.regular).fontSize(7.5)
      .text(`Why it fits: ${rec.whyItFits}`, M + 10, page.y + 38, { width: CW - 20 });

    page.addSpacing(66);
  });
}

// ================================================================
// 07 — Prerequisites
// ================================================================
export function renderPrerequisites(
  page: PageManager,
  report: ProfessionalServicesReport
) {
  if (!report.prerequisites?.length) return;

  const doc = page.doc;
  sectionHeader(page, "07", "Prerequisites");

  const effortColors: Record<string, { text: string; bg: string }> = {
    high:   { text: C.critical, bg: C.criticalBg },
    medium: { text: C.warning,  bg: C.warningBg },
    low:    { text: C.strength, bg: C.strengthBg },
  };

  report.prerequisites.forEach(prereq => {
    const ec = effortColors[prereq.effort] ?? effortColors.low;

    page.ensureSpace(44);

    fillRoundRect(doc, M, page.y, CW, 40, 3, C.bg);

    // Effort badge
    fillRoundRect(doc, M + 8, page.y + 8, 44, 13, 2, ec.bg);
    fc(doc, ec.text);
    doc.font(F.bold).fontSize(7)
      .text(prereq.effort.charAt(0).toUpperCase() + prereq.effort.slice(1),
        M + 8, page.y + 12, { width: 44, align: "center" });

    // Title
    fc(doc, C.text);
    doc.font(F.bold).fontSize(9).text(prereq.title, M + 60, page.y + 8, { width: CW - 70 });

    // Description
    fc(doc, C.textMid);
    doc.font(F.regular).fontSize(8)
      .text(prereq.description, M + 60, page.y + 22, { width: CW - 70, lineGap: 2 });

    page.addSpacing(46);
  });
}

// ================================================================
// 08 — What We Will Deliver
// ================================================================
export function renderDeliverables(
  page: PageManager,
  report: ProfessionalServicesReport
) {
  if (!report.whatWeWillDeliver?.length) return;

  const doc = page.doc;
  sectionHeader(page, "08", "What We Will Deliver");

  const colW = CW / 2 - 6;

  report.whatWeWillDeliver.forEach((d, i) => {
    const col = i % 2;
    const x = M + col * (colW + 12);

    if (col === 0) page.ensureSpace(52);

    const y = page.y;

    fillRoundRect(doc, x, y, colW, 48, 4, C.bg);

    // Checkmark circle
    fc(doc, C.primaryLight);
    doc.circle(x + 18, y + 16, 10).fill();
    fc(doc, C.primary);
    doc.font(F.bold).fontSize(11).text("✓", x + 12, y + 10);

    // Title
    fc(doc, C.text);
    doc.font(F.bold).fontSize(9).text(d.title, x + 34, y + 8, { width: colW - 42 });

    // Description
    fc(doc, C.textMid);
    doc.font(F.regular).fontSize(7.5)
      .text(d.description, x + 34, y + 22, { width: colW - 42, lineGap: 2 });

    if (col === 1 || i === report.whatWeWillDeliver.length - 1) {
      page.addSpacing(54);
    }
  });
}

// ================================================================
// 09 — Next Steps
// ================================================================
export function renderNextSteps(
  page: PageManager,
  report: ProfessionalServicesReport
) {
  if (!report.nextSteps?.length) return;

  const doc = page.doc;
  sectionHeader(page, "09", "Next Steps");

  report.nextSteps.forEach((step, i) => {
    const isFirst = i === 0;
    const bg = isFirst ? C.primaryLight : C.bg;
    const textColor = isFirst ? C.primaryDark : C.textMid;
    const numBg = isFirst ? C.primary : C.border;
    const numColor = isFirst ? "#FFFFFF" : C.textMuted;

    page.ensureSpace(32);

    fillRoundRect(doc, M, page.y, CW, 28, 3, bg);

    // Number circle
    fc(doc, numBg);
    doc.circle(M + 16, page.y + 14, 10).fill();
    fc(doc, numColor);
    doc.font(F.bold).fontSize(8)
      .text(String(i + 1), M + 10, page.y + 10, { width: 12, align: "center" });

    // Step text
    fc(doc, textColor);
    doc.font(isFirst ? F.bold : F.regular).fontSize(8.5)
      .text(step, M + 32, page.y + 9, { width: CW - 42, lineGap: 2 });

    page.addSpacing(32);
  });

  page.addSpacing(S.sm);
}

// ================================================================
// Disclaimer
// ================================================================
export function renderDisclaimer(page: PageManager) {
  const doc = page.doc;

  page.ensureSpace(60);

  fillRoundRect(doc, M, page.y, CW, 56, 4, C.bg);
  sc(doc, C.border);
  doc.rect(M, page.y, CW, 56).stroke();

  fc(doc, C.textLight);
  doc.font(F.bold).fontSize(7)
    .text("IMPORTANT DISCLAIMER", M + 10, page.y + 8, { characterSpacing: 0.5 });

  doc.font(F.regular).fontSize(7.5)
    .text(
      "This assessment is intended for informational and planning purposes only. The findings, recommendations, " +
      "timelines, and cost estimates are based on information provided during the assessment and may not reflect " +
      "the full complexity of your environment. Final architecture, pricing, and security requirements may vary " +
      "based on detailed discovery and implementation scope. KlayyTech recommends a formal technical discovery " +
      "engagement before commencing any activities.",
      M + 10, page.y + 20,
      { width: CW - 20, lineGap: 2 }
    );

  page.addSpacing(64);
}