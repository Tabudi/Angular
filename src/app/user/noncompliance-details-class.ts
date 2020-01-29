import { INoncomplianceDetailsInterface } from './noncompliance-details-interface';
export class NoncomplianceDetailsClass implements INoncomplianceDetailsInterface {

    NonComplianceId: String;
    DescribeNonCompliance: String;
    NonComplianceLocation: String;
    NonComplianceOccurance: String;
    AdditionalInfo: String;
    TimeFrameId: String;
    YearlyLossId: String;
    DateCreated: String;
    CaseId: String;
}
