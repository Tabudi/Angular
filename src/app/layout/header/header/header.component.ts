import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userRole:String;
  SID:String;
  name:String;
  Surname:String;

 

 
  constructor() { }

  ngOnInit() {
    
   // if(localStorage.length > 0){
     // let user = localStorage.getItem("User");
     // let userJson = JSON.parse(user);
     // this.userRole = userJson.Role;
      this.SID = "210183230";
      this.name = "Tabudi";
      this.Surname = "Sehlapelo";
      this.userRole = "Superuser";

      
      
   // }
  }
}
