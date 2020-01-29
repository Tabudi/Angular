import { IRiskAssessment } from "app/crcs-specialist/risk-assessment";

import { IRegistrationParticularsInterface } from 'app/crcs-specialist/registration-particulars-interface';
import { RegistrationParticularsClass } from "app/crcs-specialist/registration-particulars-class";
import { CustomsTurnOverDetailsClass } from "app/crcs-specialist/customs-turnover-details-class";
import { DirectorDetailsClass } from "app/crcs-specialist/director-details-class";
import { IRiskStatementInterface } from "./risk-statement-interface";
import { CustomsRASParticularsClass } from "./customs-particulars-class";
import { IDocumentInterface } from "../shared-modules/document-upload/document-interface";


export class RiskAssessmentClass implements IRiskAssessment  {
    constructor( ){}

    RegistrationParticulars: RegistrationParticularsClass = new RegistrationParticularsClass(); 
    CustomsRASParticulars: CustomsRASParticularsClass = new CustomsRASParticularsClass(); 
    CustomsTurnOverDetails: CustomsTurnOverDetailsClass = new CustomsTurnOverDetailsClass();
    DirectorDetails: DirectorDetailsClass = new DirectorDetailsClass();
    RiskStatement:Array<IRiskStatementInterface> = [];
    UploadedFiles?:Array<IDocumentInterface> = [];

}
