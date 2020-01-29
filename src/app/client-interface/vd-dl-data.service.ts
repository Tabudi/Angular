import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { IVddl } from './vd-dl-interface';



@Injectable()
export class VdDlDataService {

  sId:String;

  private _vddlUrl = "";
  private _addVddlUrl = "";
  private _submitVddlUrl = "";
  private _lookUporiginCaseUrl ="";
  private _getCustomsExciseUrl= "";
  private _vddbyCaseUrl ="";

 /* private _vddlUrl = "http://ptadviis06:90/PCA_WebApi/api/VDDLFeature/GetWIPVDDLForms?sid=";

  private _addVddlUrl = "http://ptadviis06:90/PCA_WebApi/api/vddlfeature/SaveVDDLForm";

  private _submitVddlUrl = "http://ptadviis06:90/PCA_WebApi/api/vddlfeature/SubmitVDDLForm";

  private _lookUporiginCaseUrl ="http://ptadviis06:90/PCA_WebApi/api/LookUp/GETOriginofCase";

  private _getCustomsExciseUrl= "http://ptadviis06:90/PCA_WebApi/api/LookUp/GETCustomsExcise";

  private _vddbyCaseUrl ="http://ptadviis06:90/PCA_WebApi/api/vddlfeature/getVddlFormByCaseId?caseId=";*/

  constructor(private _http: Http) {

    let user = localStorage.getItem("User");
    let userJson = JSON.parse(user);
    this.sId = userJson.SID;
   }

  
  getvddls(): Observable<any[]> {
    return this._http.get(this._vddlUrl+this.sId,{withCredentials:true})
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }

  getvddlbycaseid(caseId):  Observable<IVddl> {
    return this._http.get(this._vddbyCaseUrl+caseId,{withCredentials:true})
      .map((response: Response) => <IVddl>response.json())
      .catch(this.handleError);
  }

  getOriginoCase(): Observable<any[]> {
    return this._http.get(this._lookUporiginCaseUrl,{withCredentials:true})
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError); 
  }

  getCustomsExcise(): Observable<any[]> {
    return this._http.get(this._getCustomsExciseUrl,{withCredentials:true})
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }

  getVddlFormByCaseId(caseId): Observable<IVddl> {
    let url = this._vddbyCaseUrl+caseId
    return this._http.get(url,{withCredentials:true})
      .map((response: Response) => <IVddl>response.json())

      .catch(this.handleError);
  }

  addVddl(newVddl: any): Observable<any[]> {


     let body = JSON.stringify(newVddl);
    
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers,withCredentials:true });

 

    return this._http.post(this._addVddlUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  submitVddl(submitVddl: IVddl): Observable<IVddl[]> {


    let body = JSON.stringify(submitVddl); 
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers ,withCredentials:true });

    return this._http.post(this._submitVddlUrl, body, options)
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
