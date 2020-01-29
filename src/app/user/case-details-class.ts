import { ICaseDetails } from 'app/user/case-details-interface';
export class CaseDetailsClass implements ICaseDetails {

    StatusId: String;
    ReferenceNumber: String;
    NumTravellersIndividuals: number;
    NumEntityTypes: number;
    CaseDetailsId: String;
    CaseId: String;
    DateCreated: String;
    EntityTypeId: String;
    TravellerIndividualId: String;
    RegionId: String;
    IsEdit: boolean;
    Sid: String;
    IsPended: true;
    IsAllocationPulled: boolean;
    PulledBy: String;
    ReviewedBy: String;
}
