import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { IVddl } from "app/client-interface/vd-dl-interface";
import { ISearch } from "app/search/search-interface";
import { SearchClass } from "app/search/search-class";

@Injectable()
export class SearchDataService {
  sId:String;
  private _searchUrl = "http://ptadviis06:90/PCA_WebApi/api/Common/SearchCasesByParam"
   //private _searchUrl ="http://ptadviis06:90/PCA_WebApi/api/VDDLFeature/GetWIPVDDLForms?sid=";
  
  constructor(private _http: Http) { 
    let user = localStorage.getItem("User");
    let userJson = JSON.parse(user);
    this.sId = userJson.SID;
  
  }

  getSearchData(
      CaseRefNo:String, Sid:String, SAR_VDD :string , CompanyRegNo :String ,
      TradingName:string , exciseCode: string, fromDate:string, toDate :string
  ):Observable<any[]>{  
    var myparams ="?CaseRefNo=" + CaseRefNo + "&Sid=" + Sid + "&SAR_VDD=" +SAR_VDD +
      "&CompanyRegNo=" + CompanyRegNo +"&TradingName=" + TradingName  + '&CustomsExciseCode=' + exciseCode
    + "&DateFrom=" + fromDate + "&DateTo=" + toDate;
    return this._http.get(this._searchUrl+myparams,{withCredentials:true})
    .map((response: Response) => <any[]>response.json())    
    .catch(this.handleError);    
  }



  getData():Observable<any[]>{  
    return this._http.get(this._searchUrl+this.sId,{withCredentials:true})
    .map((response: Response) => <any[]>response.json())    
    .catch(this.handleError);    
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}

  
  
  

