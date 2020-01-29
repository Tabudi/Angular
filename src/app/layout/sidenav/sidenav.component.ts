import { Component, OnInit } from '@angular/core';
import { SystemUserProviderService } from '../../system-user-provider.service';
import { Router } from '@angular/router';
import  swal  from 'sweetalert2';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  userRole:String;
 
  constructor() { }

  ngOnInit() {
    
   /* if(localStorage.length > 0){
      let user = localStorage.getItem("User");
      let userJson = JSON.parse(user);
      this.userRole = 'Superuser';
    }*/

    this.userRole = 'Superuser';
  }

}
