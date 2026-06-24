import { ProfessionalServicesReport } from "../reports/professionalServicesReport";
import { CompanyProfile } from "./companyProfile";
import { AssessmentAnswers } from "./scenario";

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  error: string | null;
}

export interface AssessmentDocument {
  id: string;
  userId: string;
  status: "draft" | "completed" | "failed";
  createdAt: string;
  updatedAt: string;
  companyName: string;
  companyProfile: CompanyProfile;
  scenarioId: string;
  scenarioVersion: string;
  scenarioAnswers: AssessmentAnswers;
  report: ProfessionalServicesReport | null;
  pdfUrl: string | null;
  usage: {
    viewed: boolean;
    viewedAt: string | null;
    shared: boolean;
  };
}

export interface InvitationDocument {
  id: string;
  token: string;
  email: string;
  companyName: string;
  industry: string;
  notes?: string;
  status: "pending" | "completed" | "expired";
  createdAt: string;
  expiresAt: string;
  completedAt: string | null;
  assessmentId: string | null;
  createdBy: string;
}