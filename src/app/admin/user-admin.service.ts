import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { IUserAdminInterface } from 'app/admin/user-admin-interface';

@Injectable()
export class UserAdminService {

  private getAlluserUrl = "";
  private saveUserUrl = "";
  private getAllrolesUrl = "";
  private getRegionUrl = "";

 /* private getAlluserUrl = "http://ptadviis06:90/PCA_WebApi/api/authentication/getAllUsers";

  private saveUserUrl = "http://ptadviis06:90/PCA_WebApi/api/authentication/saveUser";

  private getAllrolesUrl = "http://ptadviis06:90/PCA_WebApi/api/authentication/getAllSystemRoles";

  private getRegionUrl = "http://ptadviis06:90/PCA_WebApi/api/LookUp/GETRegion";*/

  constructor(private _http:Http ,private systemUser:SystemUserProviderService ) { }


  getAlluser():Observable<any[]> {
    return this._http.get(this.getAlluserUrl,{withCredentials:true})
    .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }

  getAllroles():Observable<any[]> {
    return this._http.get(this.getAllrolesUrl,{withCredentials:true})
    .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }

  getRegion():Observable<any[]> {
    return this._http.get(this.getRegionUrl,{withCredentials:true})
    .map((response:Response) => <any[]>response.json())
    
    .catch(this.handleError);
  }


  
  saveUser(sar:IUserAdminInterface):Observable<IUserAdminInterface[]>{

    let headers = new Headers({ 'Content-Type': 'application/json' });
   
     let options = new RequestOptions({ headers: headers,withCredentials:true });
 
     return this._http.post(this.saveUserUrl,sar,options) 
                      .map((res:Response) => res.json()) 
                      .catch(this.handleError); 
   }

  
  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
