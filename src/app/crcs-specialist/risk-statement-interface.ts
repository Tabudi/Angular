export interface IRiskStatementInterface {

    RiskStatementId: String;
    RiskAreaId: String;
    NumberOfRiskPerRiskArea: String;
    Recommendations: String;
    RiskRatingLikelihoodId: String;
    RiskRatingConcernedId: String;
    OveralRiskRating: String;
    HSChapterAppliedToId: String;
    EstimatedRevenueAtRisk: String;
    RiskDescription: String;
    IndustryId: String;
    DateCreated: String;
    RiskAssessmentId: String;
    StatusId: String;
    IsIntegratedAuditRequired: Boolean;
    IsRelateToTbdComplianceOrCustomsFocusArea: Boolean;
    AuditFindings: String;
}
