export interface IReportingPerson {
    UserReportingId?: String;
    Initials?: String;
    FirstNames?: String;
    Surname?: String;
    CellNumber?: String;
    HomeNumber?: String;
    BusinessNumber?: String;
    FaxNumber?: String;
    EmailAddress?: String;
    LicensingAndRegistration?: boolean;
    Submission?: boolean;
    Declaration?: boolean;
    Payments?: boolean;
    IllegalActivities?: boolean;
    Other?: boolean;
    IsPersonalInfoDisclosed?: boolean;
    IsAffidavitProvided?: boolean;
    DateCreated?: String;
    CaseId?: String;
}
