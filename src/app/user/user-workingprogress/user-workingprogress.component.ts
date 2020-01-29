import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/user/user.service';
import { Router } from '@angular/router';
import { SarProvider } from 'app/user/sar-provider';
import { Iuser } from '../user-interface';

@Component({
  selector: 'app-user-workingprogress',
  templateUrl: './user-workingprogress.component.html',
  styleUrls: ['./user-workingprogress.component.scss']
})
export class UserWorkingprogressComponent implements OnInit {

  constructor(private _TbdServics: UserService ,private _router: Router,private sarData:SarProvider ,) { }

  cpageTitle: string = ' SAR Detail';
  errorMessage: string;
  filteredsarDetails: Iuser [];
  sarDetails: Iuser[] = [];

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredsarDetails = this.listFilter ? this.performFilter(this.listFilter) : this.sarDetails;
  }

 

  performFilter(filterBy: string): Iuser[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.sarDetails.filter((sarDetails: Iuser) =>
    sarDetails.CaseDetails.ReferenceNumber.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  
  ngOnInit(){
  
    this._TbdServics.getTbd()
      .subscribe(sarDetails => {
        this.sarDetails = sarDetails;
        this.filteredsarDetails = this.sarDetails;
      },
      error => this.errorMessage = <any>error);
      
  }
  // takes you back to sar screen for editing
  onSarEdit(sarDetails) {
    //  console.log(vddlDetail);
    this.sarData.Tbdtorage = sarDetails;
     this._router.navigate(['/editsar']);
  }


}
