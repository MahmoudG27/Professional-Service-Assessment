import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getContainer } from "../lib/cosmosClient";
import { AssessmentDocument, ApiResponse } from "../types/api";
import { getScenarioById } from "../scenarios";
import { evaluateScenario } from "../engine/scenarioEngine";
import { buildProfessionalServicesReport } from "../reports/professionalServicesReport";

async function generateReport(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log("generateReport called");

  const id = request.params.id;
  const userId = request.headers.get("x-user-id") ?? "anonymous";
  const container = getContainer();

  try {
    // Fetch assessment document
    const { resource: document } = await container
      .item(id, userId)
      .read<AssessmentDocument>();

    if (!document) {
      return {
        status: 404,
        jsonBody: { success: false, data: null, error: "Assessment not found" } as ApiResponse<null>,
      };
    }

    if (document.status === "completed") {
      return {
        status: 200,
        jsonBody: { success: true, data: document.report, error: null } as ApiResponse<typeof document.report>,
      };
    }

    // Get scenario
    const scenario = getScenarioById(document.scenarioId);
    if (!scenario) {
      return {
        status: 400,
        jsonBody: { success: false, data: null, error: `Unknown scenarioId: ${document.scenarioId}` } as ApiResponse<null>,
      };
    }

    // Run engine
    const scenarioResult = evaluateScenario(
      scenario,
      {},                          // commonAnswers — not used in V2
      document.scenarioAnswers,
      []                           // commonQuestions — not used in V2
    );

    // Build report
    const report = buildProfessionalServicesReport({
      reportId: document.id,
      companyProfile: document.companyProfile,
      commonAnswers: {},
      scenarioResult,
    });

    // Persist
    const updated: AssessmentDocument = {
      ...document,
      status: "completed",
      report,
      updatedAt: new Date().toISOString(),
    };

    await container.items.upsert(updated);

    context.log(`Report generated: ${id}`);

    return {
      status: 200,
      jsonBody: { success: true, data: report, error: null } as ApiResponse<typeof report>,
    };

  } catch (error) {
    context.error(error);

    // Mark as failed
    try {
      const { resource: doc } = await container.item(id, userId).read<AssessmentDocument>();
      if (doc) {
        await container.items.upsert({
          ...doc,
          status: "failed",
          updatedAt: new Date().toISOString(),
        });
      }
    } catch { /* ignore secondary error */ }

    return {
      status: 500,
      jsonBody: { success: false, data: null, error: "Failed to generate report" } as ApiResponse<null>,
    };
  }
}

app.http("generateReport", {
  methods: ["POST"],
  authLevel: "function",
  route: "assessment/{id}/generate",
  handler: generateReport,
});