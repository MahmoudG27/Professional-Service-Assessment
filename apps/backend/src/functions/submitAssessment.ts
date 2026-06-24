import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getContainer } from "../lib/cosmosClient";
import { AssessmentDocument } from "../types/api";
import { ApiResponse } from "../types/api";
import { CompanyProfile } from "../types/companyProfile";
import { AssessmentAnswers } from "../types/scenario";
import { getScenarioById } from "../scenarios";
import crypto from "crypto";

interface SubmitAssessmentBody {
  companyProfile: CompanyProfile;
  scenarioId: string;
  scenarioAnswers: AssessmentAnswers;
}

async function submitAssessment(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log("submitAssessment called");

  const userId = request.headers.get("x-user-id") ?? "anonymous";

  try {
    const body = await request.json() as SubmitAssessmentBody;

    // Validate required fields
    if (!body.companyProfile?.companyName) {
      return {
        status: 400,
        jsonBody: { success: false, data: null, error: "companyProfile.companyName is required" } as ApiResponse<null>,
      };
    }
    if (!body.scenarioId) {
      return {
        status: 400,
        jsonBody: { success: false, data: null, error: "scenarioId is required" } as ApiResponse<null>,
      };
    }

    // Validate scenario exists
    const scenario = getScenarioById(body.scenarioId);
    if (!scenario) {
      return {
        status: 400,
        jsonBody: { success: false, data: null, error: `Unknown scenarioId: ${body.scenarioId}` } as ApiResponse<null>,
      };
    }

    const id = "RPT-" + crypto.randomBytes(4).toString("hex").toUpperCase();
    const now = new Date().toISOString();

    const document: AssessmentDocument = {
      id,
      userId,
      status: "draft",
      createdAt: now,
      updatedAt: now,
      companyName: body.companyProfile.companyName,
      companyProfile: body.companyProfile,
      scenarioId: body.scenarioId,
      scenarioVersion: scenario.version,
      scenarioAnswers: body.scenarioAnswers,
      report: null,
      pdfUrl: null,
      usage: { viewed: false, viewedAt: null, shared: false },
    };

    const container = getContainer();
    await container.items.create(document);

    context.log(`Assessment created: ${id}`);

    return {
      status: 201,
      jsonBody: {
        success: true,
        data: { id, status: "draft" },
        error: null,
      } as ApiResponse<{ id: string; status: string }>,
    };

  } catch (error) {
    context.error(error);
    return {
      status: 500,
      jsonBody: { success: false, data: null, error: "Failed to submit assessment" } as ApiResponse<null>,
    };
  }
}

app.http("submitAssessment", {
  methods: ["POST"],
  authLevel: "function",
  route: "assessment",
  handler: submitAssessment,
});