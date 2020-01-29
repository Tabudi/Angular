import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { IAuditcheckListInterface } from './auditcheck-list-interface';
import { IAuditorInterface } from './auditor-interface';
import { AuditPlanResult } from './auditor-class';
import { IDocumentInterface } from '../shared-modules/document-upload/document-interface';

const MY_MAIN_URL: string = "http://ptadviis06:90/PCA_WebApi/";

@Injectable()
export class AuditorTemplateService {

  constructor(private _http: Http, private systemUser: SystemUserProviderService ) { }

  private getAuditTemplateWIPUrl = MY_MAIN_URL + "api/auditplan/getAuditTemplateWIPForms?sid=";
  private getCheckListAnswerUrl = MY_MAIN_URL + "api/auditplan/getCheckListAnswer?auditplanId=";
  private getCheckListAnswerCaseIdUrl = MY_MAIN_URL + "api/auditplan/getCheckListAnswer?caseId={caseId}";
  private getCompleteAuditPlanListUrl = MY_MAIN_URL + "api/vddlfeature/getCompleteAuditPlanList?sid=";
  private getManagerAllocatedVDDLUrl = MY_MAIN_URL + "api/vddlfeature/getManagerAllocatedVDDL?sid=";
  private getcompleteAuditPlanQuestionsUrl = MY_MAIN_URL + "api/LookUp/GETCompleteAuditPlanQuestions";

  private saveCheckListAnswerUrl = MY_MAIN_URL + "api/auditplan/saveCheckListAnswer";
  private saveAuditPlanUrl = MY_MAIN_URL + "api/auditplan/saveAuditPlanTemplate";
  private submitAuditPlanUrl = MY_MAIN_URL + "api/auditplan/submitAuditPlanReview";
  private saveCompletedAuditPlanAllinOneUrl = MY_MAIN_URL + "api/auditplan/SaveAuditPlan";
  
  private getGenerateLetterUrl = MY_MAIN_URL + "api/DocumentManagement/generateletter";
  private getAuditWorkInProgressPFormsUrl =  MY_MAIN_URL + "api/auditplan/GetAuditWipForms?sid=";

   private saveReworkPlanUrl = MY_MAIN_URL + "api/auditplan/reworkAuditPlan";
   private saveApprovedUrl =  MY_MAIN_URL + "api/auditplan/ApproveAuditPlan";
   private saveRejectUrl =  MY_MAIN_URL + "api/auditplan/rejectAuditPlan";


   private getApprovedAuditPlansUrl = MY_MAIN_URL+"api/auditplan/getApprovedPlans?sid=";

  private saveExecuteReviewURL =  MY_MAIN_URL + "api/auditplan/submitExecuteReview";
  private acceptFindsUrl = MY_MAIN_URL + "api/auditplan/ApproveExecuteFindings";
  private rejectFindsUrl = MY_MAIN_URL + "api/auditplan/RejectExecuteFindings";
  private reworkFindsUrl = MY_MAIN_URL + "api/auditplan/ReworkExecuteFindings";
  private finalizeFindsUrl = MY_MAIN_URL + "api/auditplan/FinaliseAuditPlan";
  private closeFindsUrl = MY_MAIN_URL + "api/auditplan/FinaliseAuditPlan";

  private submitApproveIntentLettersUrl = MY_MAIN_URL + "api/auditplan/submitIntentLetterReview";
  private submitApproveDemandLettersUrl = MY_MAIN_URL + "api/auditplan/submitDemandLetterReview";

  private ApproveIntentLettersUrl = MY_MAIN_URL + "api/auditplan/approveIntentLetter";
  private ApproveDemandLettersUrl = MY_MAIN_URL + "api/auditplan/approveDemandLetter";

  

  getAuditTemplateWIP(): Observable<any[]> {
    return this._http.get(this.getAuditTemplateWIPUrl + this.systemUser.systemUserStorage.SID, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }

  getCheckListAnswer(auditID : String): Observable<any[]> {
    return this._http.get(this.getCheckListAnswerUrl + auditID, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }

  getCheckListAnswerCaseId(): Observable<any[]> {
    return this._http.get(this.getCheckListAnswerCaseIdUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }

  getCompleteAuditPlanList(): Observable<any[]> {
    return this._http.get(this.getCompleteAuditPlanListUrl + this.systemUser.systemUserStorage.SID, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }


  getManagerAllocatedVDDL(): Observable<any[]> {
    return this._http.get(this.getManagerAllocatedVDDLUrl + this.systemUser.systemUserStorage.SID, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }


  getcompleteAuditPlanQuestions(): Observable<any[]> {
    return this._http.get(this.getcompleteAuditPlanQuestionsUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }

  getDocumentGenerationLetter(document : IDocumentInterface) : Observable<any> {
    return this._http.post(this.getGenerateLetterUrl, document, { withCredentials: true })
    .map((response: Response) => <any[]>response.json())

    .catch(this.handleError);
  }

  getAuditWorkInProgressPForms(): Observable<any[]> {
    return this._http.get(this.getAuditWorkInProgressPFormsUrl + this.systemUser.systemUserStorage.SID, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }

  getApprovedAuditPlans(): Observable<any[]> {
    return this._http.get(this.getApprovedAuditPlansUrl + this.systemUser.systemUserStorage.SID, { withCredentials: true })
    .map((response: Response) => <any[]>response.json())

    .catch(this.handleError);

  }


  saveCheckListAnswer(CheckList : Array<any>[]): Observable<any[]> {
    let body = JSON.stringify(CheckList);
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.saveCheckListAnswerUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  saveAuditPlan(AuditPlan: IAuditorInterface): Observable<any[]> {

    let body = JSON.stringify(AuditPlan);
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.saveAuditPlanUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  submitAuditPlan(AuditPlan: AuditPlanResult): Observable<any[]> {

    let body = JSON.stringify(AuditPlan);
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.submitAuditPlanUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  saveCompleteAuditPlanAllInOne(auditPlanResult: AuditPlanResult): Observable<any[]>  {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.saveCompletedAuditPlanAllinOneUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }


  submitReworkPlan(auditPlanResult: AuditPlanResult): Observable<any[]>  {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.saveReworkPlanUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  submitApprovePlan(auditPlanResult: AuditPlanResult): Observable<any[]>  {

    let body = JSON.stringify(auditPlanResult);
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.saveApprovedUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  
  submitRejectPlan(auditPlanResult: AuditPlanResult): Observable<any[]>  {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.saveRejectUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }



  // Execute findings 

  submitExecuteReview(auditPlanResult: AuditPlanResult): Observable<any[]>  {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.saveExecuteReviewURL, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  acceptFindings(auditPlanResult: AuditPlanResult): Observable<any[]> {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.acceptFindsUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  rejectFindings(auditPlanResult: AuditPlanResult): Observable<any[]> {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.rejectFindsUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  ApproveIntentLetter(auditPlanResult: AuditPlanResult): Observable<any[]> {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.ApproveIntentLettersUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  
  
  ApproveDemandLetter(auditPlanResult: AuditPlanResult): Observable<any[]> {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.ApproveDemandLettersUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

    
  SubmitApproveDemandLetter(auditPlanResult: AuditPlanResult): Observable<any[]> {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.submitApproveDemandLettersUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  SubmitApproveIntentLetter(auditPlanResult: AuditPlanResult): Observable<any[]> {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.submitApproveIntentLettersUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  


  reworkFindings(auditPlanResult: AuditPlanResult): Observable<any[]> {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.reworkFindsUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  finalizeFindings(auditPlanResult: AuditPlanResult): Observable<any[]> {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.finalizeFindsUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  closeFindings(auditPlanResult: AuditPlanResult): Observable<any[]> {

    let body = auditPlanResult;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this._http.post(this.finalizeFindsUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }




  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
