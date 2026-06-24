// ================================================================
// sendReport.ts — POST /api/assessment/{id}/send
// ================================================================
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getContainer } from "../lib/cosmosClient";
import { generatePDF } from "../lib/pdf/generator";
import { AssessmentDocument, ApiResponse } from "../types/api";
import { generatePDF as generatePDFForEmail } from "../lib/pdf/generator";
 
async function sendReport(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log("sendReport called");
 
  const id = request.params.id;
  const userId = request.headers.get("x-user-id") ?? "anonymous";
 
  try {
    const body = await request.json() as { email: string };
 
    if (!body.email) {
      return {
        status: 400,
        jsonBody: { success: false, data: null, error: "Email is required" } as ApiResponse<null>,
      };
    }
 
    const container = getContainer();
 
    const { resource: document } = await container
      .item(id, userId)
      .read<AssessmentDocument>();
 
    if (!document) {
      return {
        status: 404,
        jsonBody: { success: false, data: null, error: "Assessment not found" } as ApiResponse<null>,
      };
    }
 
    if (document.status !== "completed" || !document.report) {
      return {
        status: 400,
        jsonBody: { success: false, data: null, error: "Report must be completed before sending" } as ApiResponse<null>,
      };
    }
 
    // Generate PDF in memory for email attachment
    const pdfBuffer = await generatePDFForEmail(document.report);
    const pdfBase64 = pdfBuffer.toString("base64");
    const pdfFileName = `KlayyTech-Assessment-${document.companyName.replace(/\s+/g, "-")}.pdf`;
 
    const report = document.report;
 
    // Call Logic App
    const logicAppUrl = process.env.LOGIC_APP_TRIGGER_URL!;
    const logicAppResponse = await fetch(logicAppUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: body.email,
        subject: `Professional Services Assessment — ${document.companyName}`,
        companyName: document.companyName,
        reportId: document.id,
        scenarioName: report.scenarioResult.scenarioName,
        complexityLevel: report.complexity.level,
        effort: report.effort.label,
        price: report.pricing.label,
        pdfBase64,
        pdfFileName,
      }),
    });
 
    if (!logicAppResponse.ok) {
      throw new Error(`Logic App failed: ${logicAppResponse.status}`);
    }
 
    // Mark as shared
    await container.items.upsert({
      ...document,
      usage: { ...document.usage, shared: true },
      updatedAt: new Date().toISOString(),
    });
 
    context.log(`Report sent to ${body.email}: ${id}`);
 
    return {
      status: 200,
      jsonBody: {
        success: true,
        data: { id, sentTo: body.email },
        error: null,
      } as ApiResponse<{ id: string; sentTo: string }>,
    };
 
  } catch (error) {
    context.error(error);
    return {
      status: 500,
      jsonBody: { success: false, data: null, error: "Failed to send report" } as ApiResponse<null>,
    };
  }
}
 
app.http("sendReport", {
  methods: ["POST"],
  authLevel: "function",
  route: "assessment/{id}/send",
  handler: sendReport,
});