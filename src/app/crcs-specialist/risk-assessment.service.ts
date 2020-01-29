import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { IRiskAssessment } from './risk-assessment';


const MY_MAIN_URL: String = "http://ptadviis06:90/PCA_WebApi/";

@Injectable()
export class RiskAssessmentService {
  sId:String;

  private _riskAssmentUrl = "http://ptadviis06:90/PCA_WebApi/api/riskassessmentreport/GetRiskAssessmentWIPForms?sid=";

  private _addriskAssmentUrl= MY_MAIN_URL + "api/riskassessmentreport/SaveRiskAssessmentReport";

  private _submitriskAssmentUrl = MY_MAIN_URL + "api/riskassessmentreport/SubmitRiskAssessmentReport";

  private _lookUporiginCaseUrl ="http://ptadviis06:90/PCA_WebApi/api/LookUp/GETOriginofCase";

  private getRiskAreaUrl = MY_MAIN_URL + "api/LookUp/GETRiskArea";

  private getRiskRatingsLikelihoodUrl = MY_MAIN_URL + "api/LookUp/GETRiskRatingLikelihood";

  private getRiskRatingsConcernedUrl = MY_MAIN_URL + "api/LookUp/GETRiskRatingConcerned";
  
  private getHSChapterAppliedTUrl = MY_MAIN_URL + "api/LookUp/GETHSChapterAppliedTo";

  private getIndustryUrl = MY_MAIN_URL + "api/LookUp/GETIndustry";

  private _approveUrl = MY_MAIN_URL + "api/riskassessmentreport/approveRiskAssessmentReport";

  private _reworkUrl = MY_MAIN_URL + "api/riskassessmentreport/reworkRiskAssessmentReport";

  private _rejectUrl = MY_MAIN_URL + "api/riskassessmentreport/rejectRiskAssessmentReport";

  private _getRAbyIBRNumberUrl = MY_MAIN_URL + " ";


  RA_Fields: Boolean;
  RA_Approval: Boolean;
  Approval_Status: String;


  constructor(private _http: Http) {

    let user = localStorage.getItem("User");
    let userJson = JSON.parse(user);
    this.sId = userJson.SID;
   }

   rejectAssment(rejectRiskAssment: IRiskAssessment): Observable<IRiskAssessment[]> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true});

    return this._http.put(this._rejectUrl, rejectRiskAssment, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

   reworkAssment(reworkRiskAssment: IRiskAssessment): Observable<IRiskAssessment[]> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true});

    return this._http.put(this._reworkUrl, reworkRiskAssment, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
   
  approveAssment(approvalAssment: IRiskAssessment): Observable<IRiskAssessment[]> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true});

    return this._http.put(this._approveUrl, approvalAssment, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getRAbyIBRNumber(IBRNumber): Observable<IRiskAssessment> {
    let url = this._getRAbyIBRNumberUrl + IBRNumber;
    return this._http.get(url,{withCredentials:true})
      .map((response: Response) => <IRiskAssessment>response.json())

      .catch(this.handleError);
  }

  getriskAssments(): Observable<any[]> {
    return this._http.get(this._riskAssmentUrl +this.sId,{withCredentials:true})
   // return this._http.get(this._riskAssmentUrl)
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }

  getOriginoCase(): Observable<any[]> {
    return this._http.get(this._lookUporiginCaseUrl,{withCredentials:true})
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }

  addRADocs(newRA: any): Observable<any[]> {


    let body = JSON.stringify(newRA);
    
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers,withCredentials:true });

    return this._http.post(this._addriskAssmentUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }


  addriskAssment(newriskAssment: any): Observable<any[]> {


    let body = JSON.stringify(newriskAssment);
    
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers ,withCredentials:true});

    //let body2 = this.serializeObj(body);

    return this._http.post(this._addriskAssmentUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getRiskArea():Observable<any[]> {
    return this._http.get(this.getRiskAreaUrl,{withCredentials:true})
    .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }

  getRiskRatingsLikelihood():Observable<any[]> {
    return this._http.get(this.getRiskRatingsLikelihoodUrl,{withCredentials:true})
    .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }


  getRiskRatingsConcerned():Observable<any[]> {
    return this._http.get(this.getRiskRatingsConcernedUrl,{withCredentials:true})
    .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }

  getHSChapterApplied():Observable<any[]> {
    return this._http.get(this.getHSChapterAppliedTUrl,{withCredentials:true})
    .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }
  
  getIndustry():Observable<any[]> {
    return this._http.get(this.getIndustryUrl,{withCredentials:true})
    .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }


  submitriskAssment(submitriskAssment: IRiskAssessment): Observable<IRiskAssessment[]> {

    let headers = new Headers({ 'Content-Type': 'application/json' });

   // let options = new RequestOptions({ headers: headers });
    let options = new RequestOptions({ headers: headers,withCredentials:true});

    return this._http.put(this._submitriskAssmentUrl, submitriskAssment, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }



  private serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }

 



}
