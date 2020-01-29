import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';

@Injectable()
export class AllocateViewService {
  sId:String;
  allocateReason :string 
  allocateDate :Date;
  constructor(private _http: Http) {
    let user = localStorage.getItem("User");
    let userJson = JSON.parse(user);
    this.sId = userJson.SID;
  }

  RejectAllocation(reason,date): Observable<any> {
    this.allocateReason = reason;
    this.allocateDate = date;
    var result = Observable.of("Rejected on " + this.allocateDate + ' Because: ' + this.allocateReason);
    return  result;
  }

  CancelAllocation(reason,date): Observable<any> {
    this.allocateReason = reason;
    this.allocateDate = date;
    var result=  Observable.of("Cancelled on " + this.allocateDate + ' Because: ' + this.allocateReason);
    return result;
  }
}
