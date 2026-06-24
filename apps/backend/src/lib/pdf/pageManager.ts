import PDFDocument from "pdfkit";
import { PAGE, M, MT, MB, CW, FOOTER_H, C, F, S } from "./constants";

// ================================================================
// Drawing Helpers
// ================================================================

// Set fill color
export function fc(doc: InstanceType<typeof PDFDocument>, color: string) {
  doc.fillColor(color);
}

// Set stroke color
export function sc(doc: InstanceType<typeof PDFDocument>, color: string) {
  doc.strokeColor(color);
}

// Horizontal rule
export function hline(
  doc: InstanceType<typeof PDFDocument>,
  x: number,
  y: number,
  w: number,
  color = C.border,
  thickness = 0.5
) {
  sc(doc, color);
  doc.moveTo(x, y).lineTo(x + w, y).lineWidth(thickness).stroke();
}

// Filled rectangle
export function fillRect(
  doc: InstanceType<typeof PDFDocument>,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
) {
  fc(doc, color);
  doc.rect(x, y, w, h).fill();
}

// Rounded filled rectangle
export function fillRoundRect(
  doc: InstanceType<typeof PDFDocument>,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  color: string
) {
  fc(doc, color);
  doc.roundedRect(x, y, w, h, r).fill();
}

// ================================================================
// PageManager
// ================================================================
export class PageManager {
  doc: InstanceType<typeof PDFDocument>;
  companyName: string;
  reportId: string;
  logoBuffer: Buffer | null;
  totalPages: number;
  pageNum: number;
  y: number;

  constructor(
    doc: InstanceType<typeof PDFDocument>,
    companyName: string,
    reportId: string,
    logoBuffer: Buffer | null,
    totalPages: number,
    pageNum: number
  ) {
    this.doc = doc;
    this.companyName = companyName;
    this.reportId = reportId;
    this.logoBuffer = logoBuffer;
    this.totalPages = totalPages;
    this.pageNum = pageNum;
    this.y = MT;
  }

  // Check if there's enough space; add page if not
  ensureSpace(needed: number): boolean {
    const maxY = PAGE.H - MB - FOOTER_H - 10;
    if (this.y + needed > maxY) {
      this.newPage();
      return true;
    }
    return false;
  }

  // Add spacing
  addSpacing(amount: number) {
    this.y += amount;
  }

  // New page — draws header and footer automatically
  newPage() {
    this.doc.addPage({ margin: 0, size: "A4" });
    this.pageNum++;
    this.y = MT;
    pageHeader(this.doc, this.companyName, this.logoBuffer);
    this.drawFooter();
    this.y = MT + 36; // below header
  }

  // Draw footer
  drawFooter() {
    const y = PAGE.H - FOOTER_H;
    hline(this.doc, M, y, CW);
    fc(this.doc, C.textLight);
    this.doc
      .font(F.regular)
      .fontSize(7.5)
      .text(
        `${this.reportId}  ·  KlayyTech Professional Services Assessment  ·  CONFIDENTIAL`,
        M, y + 8, { width: CW / 2 }
      );
    this.doc
      .font(F.regular)
      .fontSize(7.5)
      .text(
        `Page ${this.pageNum} of ${this.totalPages}`,
        M + CW / 2, y + 8,
        { width: CW / 2, align: "right" }
      );
  }
}

// ================================================================
// Page Header (logo + meta)
// ================================================================
export function pageHeader(
  doc: InstanceType<typeof PDFDocument>,
  companyName: string,
  logoBuffer: Buffer | null
) {
  // Logo
  if (logoBuffer) {
    doc.image(logoBuffer, M, 14, { width: 90 });
  } else {
    fc(doc, C.primary);
    doc.font(F.bold).fontSize(12).text("KlayyTech", M, 18);
  }

  // Right side meta
  fc(doc, C.textLight);
  doc.font(F.regular).fontSize(7.5).text(
    `${companyName}  ·  Professional Services Assessment  ·  CONFIDENTIAL`,
    M + 96, 22,
    { width: CW - 96, align: "right" }
  );

  // Divider
  hline(doc, M, 38, CW, C.border, 0.5);
}

// ================================================================
// Section Header
// ================================================================
export function sectionHeader(
  page: PageManager,
  number: string,
  title: string
) {
  page.ensureSpace(28);
  const doc = page.doc;

  // Number badge
  fillRoundRect(doc, M, page.y, 22, 14, 2, C.primaryLight);
  fc(doc, C.primary);
  doc.font(F.bold).fontSize(7).text(number, M, page.y + 3, { width: 22, align: "center" });

  // Title
  fc(doc, C.text);
  doc.font(F.bold).fontSize(12).text(title, M + 27, page.y + 1);

  page.addSpacing(20);
  hline(doc, M, page.y, CW, C.border, 0.5);
  page.addSpacing(S.md);
}