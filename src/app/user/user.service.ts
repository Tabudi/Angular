import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Iuser } from 'app/user/user-interface';
import { SystemUserProviderService } from 'app/system-user-provider.service';

const MY_MAIN_URL:string = "http://ptadviis06:90/PCA_WebApi/";
@Injectable()
export class UserService {
  //get
  private getSarURL = MY_MAIN_URL + "api/suspiciousactivityreport/getWIPSARForms?sid=";

  // post
  private saveSarURL = MY_MAIN_URL + "api/suspiciousactivityreport/saveSARForm";
  private submitSarURL = MY_MAIN_URL + "api/suspiciousactivityreport/submitSARForms";

  private accepAnalysedUrl = MY_MAIN_URL + "api/suspiciousactivityreport/acceptAnalysedSARForm";
  private discardSARFormUrl = MY_MAIN_URL + "api/suspiciousactivityreport/discardSARForm";
  private qaDisagreeDiscardUrl = MY_MAIN_URL + "api/suspiciousactivityreport/qaAcceptDiscardedSARForm";
  private qaAcceptDiscardedUrl = MY_MAIN_URL + "api/suspiciousactivityreport/qaAcceptDiscardedSARForm";


  // lookup urls 
  private getTravellerUrl = MY_MAIN_URL + "api/LookUp/GETTravellerIndividual";
  private getCompaniesUrl = MY_MAIN_URL + "api/LookUp/GETEntityType";
  private getProvincesUrl = MY_MAIN_URL + "api/LookUp/GETProvince";
  private getTimeFrameUrl = MY_MAIN_URL + "api/LookUp/GETNonComplianceTimeFrame";
  private getYearlyLossUrl = MY_MAIN_URL + "api/LookUp/GETPotentialYearlyLoss";
  private getRegionUrl = MY_MAIN_URL + "api/LookUp/GETRegion";

  private getInDethAnalysisUrl = MY_MAIN_URL + "api/suspiciousactivityreport/getWIPSARForms?sid={sid}";
  private getPenedSarUrl = MY_MAIN_URL + "api/suspiciousactivityreport/getPendedSARForms?sid={sid}";
  private getQaReviewerUrl = MY_MAIN_URL + "api/suspiciousactivityreport/getQAReviewDiscardedSARForms?sid={sid}";
  private getManageReview = MY_MAIN_URL + "api/suspiciousactivityreport/getManagerReviewDiscardedSARForms?sid={sid}";






  
  constructor(private _http:Http ,private systemUser:SystemUserProviderService ) { }

  getTbd():Observable<Iuser[]> {
    return this._http.get(this.getSarURL+this.systemUser.systemUserStorage.SID,{withCredentials:true})
    .map((response:Response) => <Iuser[]>response.json())
    
    .catch(this.handleError);
  }

  getTbdByUser(user):Observable<Iuser> {
    return this._http.get(this.getSarURL+user,{withCredentials:true})
    .map((response:Response) => <Iuser[]>response.json())
    
    .catch(this.handleError);
  }

  getTraveller():Observable<any[]> {
    return this._http.get(this.getTravellerUrl,{withCredentials:true})
    .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }
  getCompanies():Observable<any[]> {
    return this._http.get(this.getCompaniesUrl,{withCredentials:true})
    .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }
  getProvinces():Observable<any[]> {
    return this._http.get(this.getProvincesUrl,{withCredentials:true})
    .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }
  getTimeFrame():Observable<any[]> {
    return this._http.get(this.getTimeFrameUrl,{withCredentials:true})
    .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }
  getYearlyLoss():Observable<any[]> {
    return this._http.get(this.getYearlyLossUrl,{withCredentials:true})
    .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }

  getRegion():Observable<any[]> {
    return this._http.get(this.getRegionUrl,{withCredentials:true})
    .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }

  saveSar(newSar:Iuser):Observable<any[]>{
    
    
    let body = JSON.stringify(newSar);
    let headers = new Headers({'Content-Type': 'application/json'});
  
    let options = new RequestOptions({ headers: headers,withCredentials:true});

    //let body2 = this.serializeObj(body);

    return this._http.post(this.saveSarURL,body,options) 
                     .map((res:Response) => res.json())
                     .catch(this.handleError); 
  }

  submitSar(sar:Iuser):Observable<Iuser[]>{

   let headers = new Headers({ 'Content-Type': 'application/json' });
  
    let options = new RequestOptions({ headers: headers,withCredentials:true });

    return this._http.put(this.submitSarURL,sar,options) 
                     .map((res:Response) => res.json()) 
                     .catch(this.handleError); 
  }


  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }



}
