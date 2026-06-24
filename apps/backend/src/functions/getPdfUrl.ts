// ================================================================
// getPdfUrl.ts — GET /api/assessment/{id}/pdf-url
// ================================================================
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getContainer } from "../lib/cosmosClient";
import { generateSasUrl } from "../lib/storageClient";
import { generatePDF } from "../lib/pdf/generator";
import { AssessmentDocument, ApiResponse } from "../types/api";
 
async function getPdfUrl(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log("getPdfUrl called");
 
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
 
    if (!document.pdfUrl) {
      return {
        status: 404,
        jsonBody: { success: false, data: null, error: "PDF not yet generated" } as ApiResponse<null>,
      };
    }
 
    const sasUrl = await generateSasUrl(id);
 
    return {
      status: 200,
      jsonBody: {
        success: true,
        data: { id, sasUrl },
        error: null,
      } as ApiResponse<{ id: string; sasUrl: string }>,
    };
 
  } catch (error) {
    context.error(error);
    return {
      status: 500,
      jsonBody: { success: false, data: null, error: "Failed to get PDF URL" } as ApiResponse<null>,
    };
  }
}
 
app.http("getPdfUrl", {
  methods: ["GET"],
  authLevel: "function",
  route: "assessment/{id}/pdf-url",
  handler: getPdfUrl,
});