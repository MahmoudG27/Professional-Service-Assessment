import { CompanyProfile } from "./companyProfile";
import { AssessmentAnswers } from "./scenario";
import { ProfessionalServicesReport } from "../reports/professionalServicesReport";

export interface AssessmentRequest {
  companyProfile: CompanyProfile;
  scenarioId: string;
  commonAnswers: AssessmentAnswers;
  scenarioAnswers: AssessmentAnswers;
}

export interface AssessmentResponse {
  report: ProfessionalServicesReport;
}