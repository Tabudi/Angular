import { IRiskStatementInterface } from "./risk-statement-interface";

export class RiskStatementClass implements IRiskStatementInterface {

    RiskStatementId: String;
    RiskAreaId: String;
    NumberOfRiskPerRiskArea: String;
    Recommendations: String;
    RiskRatingLikelihoodId: String;
    RiskRatingConcernedId: String;
    OveralRiskRating: String;
    HSChapterAppliedToId: String;
    EstimatedRevenueAtRisk: String;
    IndustryId: String;
    DateCreated: String;
    RiskAssessmentId: String;
    RiskDescription: String;
    StatusId: String;
    IsIntegratedAuditRequired: Boolean;
    IsRelateToTbdComplianceOrCustomsFocusArea: Boolean;
    AuditFindings: String;
    
}
