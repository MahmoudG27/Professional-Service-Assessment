// ================================================================
// generatePDF.ts — POST /api/assessment/{id}/pdf
// ================================================================
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getContainer } from "../lib/cosmosClient";
import { uploadPDF } from "../lib/storageClient";
import { generatePDF } from "../lib/pdf/generator";
import { AssessmentDocument, ApiResponse } from "../types/api";
 
async function generatePDFHandler(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log("generatePDF called");
 
  const id = request.params.id;
  const userId = request.headers.get("x-user-id") ?? "anonymous";
 
  try {
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
        jsonBody: { success: false, data: null, error: "Report must be generated before PDF" } as ApiResponse<null>,
      };
    }
 
    // Generate PDF buffer
    const pdfBuffer = await generatePDF(document.report);
 
    // Upload to Blob Storage
    const pdfUrl = await uploadPDF(id, pdfBuffer);
 
    // Save URL to document
    await container.items.upsert({
      ...document,
      pdfUrl,
      updatedAt: new Date().toISOString(),
    });
 
    context.log(`PDF generated: ${id}`);
 
    return {
      status: 200,
      jsonBody: {
        success: true,
        data: { id, pdfUrl },
        error: null,
      } as ApiResponse<{ id: string; pdfUrl: string }>,
    };
 
  } catch (error) {
    context.error(error);
    return {
      status: 500,
      jsonBody: { success: false, data: null, error: "Failed to generate PDF" } as ApiResponse<null>,
    };
  }
}
 
app.http("generatePDF", {
  methods: ["POST"],
  authLevel: "function",
  route: "assessment/{id}/pdf",
  handler: generatePDFHandler,
});