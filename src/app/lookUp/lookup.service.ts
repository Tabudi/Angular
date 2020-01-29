import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { ISystemUserInterface } from 'app/system-user-interface';

const MY_MAIN_URL = 'http://ptadviis06:90/PCA_WebApi/';

@Injectable()
export class LookUpService {

    private urlAuditRequiredLKP = MY_MAIN_URL + 'api/LookUp/GetAuditRequired';
    private urlTypeOfAuditLKP = MY_MAIN_URL + 'api/LookUp/GetTypeOfAudit';
    private urlVddlLKP = MY_MAIN_URL + 'api/LookUp/GetVDDL';


  constructor(private _http: Http) { }


  getAuditRequiredLKP(): Observable<any[]> {
    return this._http.get(this.urlAuditRequiredLKP , { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }


  getTypeOfAuditLKP(): Observable<any[]> {
    return this._http.get(this.urlTypeOfAuditLKP , { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }


  getVddlLKP(): Observable<any[]> {
    return this._http.get(this.urlVddlLKP , { withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }






}
