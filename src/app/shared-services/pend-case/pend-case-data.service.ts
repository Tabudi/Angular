import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { IPendCase } from "app/shared-services/pend-case/pend-case-interface";
import { PendCaseClass } from "app/shared-services/pend-case/pend-case-class";

@Injectable()
export class PendCaseDataService {
  sId:String;
  errorMessage: string ;  
  private _pendCaseUrl ="http://ptadviis06:90/PCA_WebApi/api/Common/savePendedCase";
  constructor(private _http: Http) { 
    let user = localStorage.getItem("User");
    let userJson = JSON.parse(user);
    this.sId = userJson.SID;  
  }

  submitPend(submitPend: IPendCase):  Observable<any[]> {
    let body = JSON.stringify(submitPend); 
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers ,withCredentials:true });

    return this._http.post(this._pendCaseUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  onPendCase (caseId:String, pendDate:Date ):any{  
    let pendCase = new PendCaseClass();
    pendCase.CaseId = caseId;
    pendCase.Sid = this.sId;
    pendCase.EndDate = new Date(pendDate);
    return this.submitPend(pendCase)
        .subscribe(
          results => {
            if(results != null){
                return <any>results;         
            }else{
              return ("Case did not pend " + pendCase.CaseId);
            }
        }),
        error => this.errorMessage = <any>error
  };
    
  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}