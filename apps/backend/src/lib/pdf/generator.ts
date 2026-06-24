import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";
import { PAGE, M, MT } from "./constants";
import { PageManager, pageHeader } from "./pageManager";
import { renderCover } from "./cover";
import {
  renderOverview,
  renderComplexity,
  renderComplexityDrivers,
  renderExecutiveSummary,
  renderFindings,
  renderRecommendations,
  renderPrerequisites,
  renderDeliverables,
  renderNextSteps,
  renderDisclaimer,
} from "./sections";
import { ProfessionalServicesReport } from "../../reports/professionalServicesReport";

const TOTAL_PAGES = 5; // approximate — PageManager handles overflow

export async function generatePDF(report: ProfessionalServicesReport): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    const doc = new PDFDocument({
      margin: 0,
      size: "A4",
      info: {
        Title: `Professional Services Assessment — ${report.companyProfile.companyName}`,
        Author: "KlayyTech CloudReady",
        Subject: report.scenarioResult.scenarioName,
        Creator: "KlayyTech CloudReady v2",
      },
    });

    doc.on("data", chunk => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    // ── Load logo ──
    let logoBuffer: Buffer | null = null;
    try {
      const logoPath = path.join(__dirname, "../../assets/logo.png");
      if (fs.existsSync(logoPath)) {
        logoBuffer = fs.readFileSync(logoPath);
      }
    } catch {
      // Logo not found — will use text fallback
    }

    // ================================================================
    // PAGE 1 — Cover
    // ================================================================
    doc.page.margins = { top: 0, bottom: 0, left: 0, right: 0 };
    renderCover(doc, report, logoBuffer);

    // ================================================================
    // PAGE 2 — Overview + Complexity + Drivers + Executive Summary
    // ================================================================
    doc.addPage({ margin: 0, size: "A4" });
    pageHeader(doc, report.companyProfile.companyName, logoBuffer);

    const page2 = new PageManager(
      doc,
      report.companyProfile.companyName,
      report.meta.reportId,
      logoBuffer,
      TOTAL_PAGES,
      2
    );
    page2.y = MT + 36;
    page2.drawFooter();

    renderOverview(page2, report);
    renderComplexity(page2, report);
    renderComplexityDrivers(page2, report);
    renderExecutiveSummary(page2, report);

    // ================================================================
    // PAGE 3 — Key Findings + Recommendations
    // ================================================================
    doc.addPage({ margin: 0, size: "A4" });
    pageHeader(doc, report.companyProfile.companyName, logoBuffer);

    const page3 = new PageManager(
      doc,
      report.companyProfile.companyName,
      report.meta.reportId,
      logoBuffer,
      TOTAL_PAGES,
      3
    );
    page3.y = MT + 36;
    page3.drawFooter();

    renderFindings(page3, report);
    renderRecommendations(page3, report);

    // ================================================================
    // PAGE 4 — Prerequisites + Deliverables
    // ================================================================
    doc.addPage({ margin: 0, size: "A4" });
    pageHeader(doc, report.companyProfile.companyName, logoBuffer);

    const page4 = new PageManager(
      doc,
      report.companyProfile.companyName,
      report.meta.reportId,
      logoBuffer,
      TOTAL_PAGES,
      4
    );
    page4.y = MT + 36;
    page4.drawFooter();

    renderPrerequisites(page4, report);
    renderDeliverables(page4, report);

    // ================================================================
    // PAGE 5 — Next Steps + Disclaimer
    // ================================================================
    doc.addPage({ margin: 0, size: "A4" });
    pageHeader(doc, report.companyProfile.companyName, logoBuffer);

    const page5 = new PageManager(
      doc,
      report.companyProfile.companyName,
      report.meta.reportId,
      logoBuffer,
      TOTAL_PAGES,
      5
    );
    page5.y = MT + 36;
    page5.drawFooter();

    renderNextSteps(page5, report);
    renderDisclaimer(page5);

    doc.end();
  });
}