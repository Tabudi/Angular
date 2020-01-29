import { IRegistrationParticularsInterface } from 'app/crcs-specialist/registration-particulars-interface';
import { ICustomsTurnOverDetailsInterface } from 'app/crcs-specialist/customs-turnover-details-interface';
import { IDirectorDetailsInterface } from 'app/crcs-specialist/director-details-interface';
import { IRiskStatementInterface } from './risk-statement-interface';
import { ICustomsRASParticularsInterface } from './customs-particulars-interface';
import { IDocumentInterface } from '../shared-modules/document-upload/document-interface';


export interface IRiskAssessment {
    RegistrationParticulars: IRegistrationParticularsInterface; 
    CustomsRASParticulars: ICustomsRASParticularsInterface;
    CustomsTurnOverDetails: ICustomsTurnOverDetailsInterface;
    DirectorDetails: IDirectorDetailsInterface;
    RiskStatement: Array<IRiskStatementInterface>;
    UploadedFiles?: Array<IDocumentInterface>;
  /*  ReportedPersonDetails:Array<IReportedPersonInterface>;
    ResidentialBusinessAddress:Array<IResidentailBusinessAddressInterface>;
    NonComplianceDetails:Array<INoncomplianceDetailsInterface>;
    PersonReportingDetails:IReportingPerson;*/
}
