import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { ISystemUserInterface } from 'app/system-user-interface';

@Injectable()
export class AuthenticationService {

  private getLoggedInUserUrl = "";

  constructor(private _http: Http) { }



  getLoggedInUser(): Observable<any[]> {
    return this._http.post(this.getLoggedInUserUrl,"Give me the user" ,{ withCredentials: true })
      .map((response: Response) => <any[]>response.json())

      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }






}
