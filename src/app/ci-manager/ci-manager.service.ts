import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { IVddl } from 'app/client-interface/vd-dl-interface';
import { ICiManagerInterface } from 'app/ci-manager/ci-manager-interface';
import { IUserAdminInterface } from 'app/admin/user-admin-interface';

const MY_MAIN_URL:string = "http://ptadviis06:90/PCA_WebApi/";
@Injectable()
export class CiManagerService {

  constructor(private _http:Http ,private systemUser:SystemUserProviderService) { }

//  private getVddlToAllocateById = "http://ptadviis06:90/PCA_WebApi/";

  private getNextCasePendingUrl = MY_MAIN_URL+"api/VDDLFeature/GetNextCasePendingAllocation?sid=";

  private getcheckPendAllocateGetNextUrl = MY_MAIN_URL+"api/vddlfeature/checkPendAllocateGetNextCase?sid=";

  private getUsersUrl = MY_MAIN_URL+"api/authentication/getAllUsers";

  private getRegionUrl = MY_MAIN_URL+"api/LookUp/GETRegion";

  private allocateReallocateUrl =MY_MAIN_URL+"api/vddlfeature/saveVDDLAllocation";

  private getCaseByRegionUrl = MY_MAIN_URL+"api/vddlfeature/getNextCasePendingAllocationByRegion?sid="+this.systemUser.systemUserStorage.SID+"&regionId=";

  private getAllocatedUrl =MY_MAIN_URL+"api/vddlfeature/getAllocatedVDDLBySid?sid=";

  private getTrackAllocateUrl = MY_MAIN_URL+"api/vddlfeature/trackAndAssignAllocate?filter=";

  private getTrackReallocateUrl =MY_MAIN_URL+"api/vddlfeature/trackAndAssignReAllocate?sid="+this.systemUser.systemUserStorage.SID+"&filter=";

  private getAllAuditPlansForApprovalUrl = MY_MAIN_URL+"api/auditplan/getApprovalPlans?sid=";
  private getManagerAllocatedVDDLUrl = MY_MAIN_URL + "api/vddlfeature/getManagerAllocatedVDDL?sid=";
  private getAllApprovedAuditPlansUrl = MY_MAIN_URL+"api/auditplan/getApprovedPlans?sid=";
  private getAllApproveFindingsUrl = MY_MAIN_URL+"api/auditplan/getApproveFindings?sid=";

  private getAllReworkFindingsUrl1 = MY_MAIN_URL+"api/auditplan/getreworkAuditFindings?sid=";
  private getAllRejectedFindingsUrl1 = MY_MAIN_URL+"api/auditplan/getrejectedAuditCases?sid=";

  private getAllLetterOfintentFindingsUrl1 = MY_MAIN_URL+"api/auditplan/getApprovedIntents?sid=";
  private getAllLetterOfdemandFindingsUrl1 = MY_MAIN_URL+"api/auditplan/getApprovedDemands?sid=";

  private getAllApprovedFindingsUrl1 = MY_MAIN_URL+"api/auditplan/getApprovedFindings?sid=";
  private getApproveFindingLettersUrl = MY_MAIN_URL+"api/auditplan/getApproveFindingLetters?sid=";

  private getApproveDemandUrl = MY_MAIN_URL+"api/auditplan/GetApprovedDemandLetters?sid=";
  private getFinalizedUrl = MY_MAIN_URL+"api/auditplan/GetFinalisedCasesAuditor?sid=";


  getNextCasePending():Observable<IVddl[]> {
    return this._http.get(this.getNextCasePendingUrl+this.systemUser.systemUserStorage.SID,{withCredentials:true})
        .map((response:Response) => <IVddl[]>response.json())
    
    .catch(this.handleError);
  }


  getcheckPendAllocateGetNext(): Observable<IVddl[]> {
    return this._http.get(this.getcheckPendAllocateGetNextUrl + this.systemUser.systemUserStorage.SID, { withCredentials: true })
      .map((response: Response) => <IVddl[]>response.json())

      .catch(this.handleError);

  }

  getRegion():Observable<any[]> {
    return this._http.get(this.getRegionUrl,{withCredentials:true})
              .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }

  getUsers():Observable<IUserAdminInterface[]> {
    return this._http.get(this.getUsersUrl,{withCredentials:true})
        // .filter((response:Response) =><IUserAdminInterface>response.ManagerSID == this.systemUser.systemUserStorage.SID)  getCaseByRegionUrl
        .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }

  getAllocated():Observable<any[]> {
    let newUrl = this.getAllocatedUrl+ this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl,{withCredentials:true})
        .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }

  getCaseByRegion(regionid):Observable<any[]> {
    let newUrl = this.getCaseByRegionUrl+regionid
    return this._http.get(newUrl,{withCredentials:true})
        .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }

  getTrackAllocate(filter){

    let newUrl = this.getTrackAllocateUrl+filter;
    return this._http.get(newUrl,{withCredentials:true})
        .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);

  }

  getTrackReallocate(filter){
    let newUrl = this.getTrackReallocateUrl+filter;
    return this._http.get(newUrl,{withCredentials:true})
        .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }

  getAllAuditPlansForApproval(){
    let newUrl = this.getAllAuditPlansForApprovalUrl+this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl,{withCredentials:true})
        .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }

  getAllApprovedAuditPlans(){
    let newUrl = this.getAllApprovedAuditPlansUrl+this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl,{withCredentials:true})
        .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }

  getAllApprovedFindings(){
    let newUrl = this.getAllApprovedFindingsUrl1+this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl,{withCredentials:true})
        .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }

  getAllApprovedDemandFindings(){
    let newUrl = this.getApproveDemandUrl+this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl,{withCredentials:true})
        .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }

  
  getAllFinalizedFindings(){
    let newUrl = this.getFinalizedUrl+this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl,{withCredentials:true})
        .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }

  getAllFindingsRework(){
    let newUrl = this.getAllReworkFindingsUrl1+this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl,{withCredentials:true})
        .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }

  getAllFindingsLetters(){
    let newUrl = this.getApproveFindingLettersUrl+this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl,{withCredentials:true})
        .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }

  getAllFindingsLetterOfDemand(){
    let newUrl = this.getAllLetterOfdemandFindingsUrl1+this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl,{withCredentials:true})
        .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }

  getAllFindingsRejected(){
    let newUrl = this.getAllRejectedFindingsUrl1+this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl,{withCredentials:true})
        .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }

  getApprovalFindings() {
    let newUrl = this.getAllApproveFindingsUrl + this.systemUser.systemUserStorage.SID;
    return this._http.get(newUrl, { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }

  getManagerAllocatedVDDL():Observable<any[]> {
    let newUrl = this.getManagerAllocatedVDDLUrl+this.systemUser.systemUserStorage.SID
    return this._http.get(newUrl,{withCredentials:true})
        .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }



  allocateReallocate(allocateObj:ICiManagerInterface):Observable<ICiManagerInterface[]>{
    
    
    let body = JSON.stringify(allocateObj);
    let headers = new Headers({'Content-Type': 'application/json'});
  
    let options = new RequestOptions({ headers: headers,withCredentials:true});


    return this._http.post(this.allocateReallocateUrl,body,options) 
                     .map((res:Response) => res.json())
                     .catch(this.handleError); 
  }


  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }



}
