import { IReportedPersonInterface } from "app/user/reported-person-interface";

export class ReportedPersonClass implements IReportedPersonInterface {

    Initials: String;
    FirstNames: String;
    Surname:String;
    DateOfBirth: Date;
    IDNumber: Number;
    PassportNumber: String;
    PassportCountry: String;
    ReportedUserId:String;
    ProvinceId:String;
    CaseId: String;
    DateCreated: String;
}
