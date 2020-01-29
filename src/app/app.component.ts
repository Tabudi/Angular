import { Component , OnInit } from '@angular/core';

import  swal  from 'sweetalert2';
import { Router } from '@angular/router';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { AuthenticationService } from './shared-services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

 
  errorMessage:String;

  constructor(private systemUser:SystemUserProviderService , private authService:AuthenticationService, private _router:Router) { }

  ngOnInit() {
    this.authService.getLoggedInUser()
    .subscribe(res => {

      if(res instanceof Object){
       // this.systemUser.systemUserStorage = res[0];
        let user = JSON.stringify(res);
        localStorage.setItem('User',user);
        this._router.navigate(['/']);

      }else{
        swal(res[0].Role);
        this._router.navigate(['/errorpage']);
      }
    },
    error => this.errorMessage = <any>error);

  }
      

}
