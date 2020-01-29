import { ICustomsRASParticularsInterface } from "app/crcs-specialist/customs-particulars-interface";

export class CustomsRASParticularsClass implements ICustomsRASParticularsInterface{

    CustomsRASId: String;
    Address: String;
    Status: String;
    DateActiveInActive: String;
    RegistrationTypeId: String;
    DateCreated: String;
    RiskAssessmentId: String;

}
