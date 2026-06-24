// ================================================================
// getAssessments.ts — GET /api/assessment/{id}
// ================================================================
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getContainer } from "../lib/cosmosClient";
import { AssessmentDocument, ApiResponse } from "../types/api";

async function getAssessment(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log("getAssessment called");

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

    // Mark as viewed
    if (!document.usage.viewed) {
      await container.items.upsert({
        ...document,
        usage: { ...document.usage, viewed: true, viewedAt: new Date().toISOString() },
        updatedAt: new Date().toISOString(),
      });
    }

    const { _rid, _self, _etag, _attachments, _ts, ...clean } = document as any;

    return {
      status: 200,
      jsonBody: { success: true, data: clean, error: null } as ApiResponse<AssessmentDocument>,
    };

  } catch (error) {
    context.error(error);
    return {
      status: 500,
      jsonBody: { success: false, data: null, error: "Failed to fetch assessment" } as ApiResponse<null>,
    };
  }
}

app.http("getAssessment", {
  methods: ["GET"],
  authLevel: "function",
  route: "assessment/{id}",
  handler: getAssessment,
});


// ================================================================
// getAssessments.ts — GET /api/assessments
// ================================================================
interface AssessmentListItem {
  id: string;
  companyName: string;
  scenarioId: string;
  status: string;
  createdAt: string;
  complexityLevel: string | null;
  mandayMin: number | null;
  mandayMax: number | null;
  servicePriceMin: number | null;
  servicePriceMax: number | null;
  confidenceScore: number | null;
}

async function getAssessments(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log("getAssessments called");

  try {
    const container = getContainer();

    const { resources } = await container.items
      .query<AssessmentDocument>({
        query: `
          SELECT
            c.id,
            c.companyName,
            c.scenarioId,
            c.status,
            c.createdAt,
            c.report
          FROM c
          ORDER BY c.createdAt DESC
        `,
      })
      .fetchAll();

    // Map to lightweight list items
    const items: AssessmentListItem[] = resources.map(doc => ({
      id: doc.id,
      companyName: doc.companyName,
      scenarioId: doc.scenarioId,
      status: doc.status,
      createdAt: doc.createdAt,
      complexityLevel:   doc.report?.complexity?.level       ?? null,
      mandayMin:         doc.report?.effort?.mandayMin        ?? null,
      mandayMax:         doc.report?.effort?.mandayMax        ?? null,
      servicePriceMin:   doc.report?.pricing?.min             ?? null,
      servicePriceMax:   doc.report?.pricing?.max             ?? null,
      confidenceScore:   doc.report?.confidence?.score        ?? null,
    }));

    return {
      status: 200,
      jsonBody: {
        success: true,
        data: items,
        total: items.length,
        error: null,
      },
    };

  } catch (error) {
    context.error(error);
    return {
      status: 500,
      jsonBody: { success: false, data: [], total: 0, error: "Failed to fetch assessments" },
    };
  }
}

app.http("getAssessments", {
  methods: ["GET"],
  authLevel: "function",
  route: "assessments",
  handler: getAssessments,
});