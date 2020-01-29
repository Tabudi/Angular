
import { IAuditorInterface, IAuditPlanResult, ICheckList } from './auditor-interface';
export class AuditorClass   implements IAuditorInterface {

    AuditPlanTemplateId: String;
    RiskAssementReport: boolean;
    VDDLQuestionId: String;
    AuditRequiredId: String;
    TypeOfAuditId: String;
    StartDate: String;
    AuditScope: String;
    AuditObjectives?: String;
    IsTraderPreviouslyAudited: boolean;
    IsExistingAuditOrInvestigation: boolean;
    IsTraderNewExporterImporter: boolean;
    DateCreated: String;
    AuditPlanId: String;
    CaseId: String;
    Status: String;
}


export class AuditPlanResult implements IAuditPlanResult {
    AuditTemplate: AuditorClass;
    AuditDocuments: Array<any>;
    CheckList: any[][];
    CaseId: string;
    IsEdit: Boolean;
    PlanStage: string;
}

export class CheckList implements ICheckList {
    CheckListId: string;
    Description: string;
    IsActive: boolean;
    SortOrder: number;
    DateCreated: string;
    CheckListTypeId: string;
    Answer: string;
    AuditPlanId: string;
    CheckListAnswerId: string;
    ChildMenuItems: Array<ICheckList>[];
    Expandable: boolean;
}

