import { Component, OnInit } from '@angular/core';


import { VdDlDataService } from '../vd-dl-data.service';
import { IVddl } from '../vd-dl-interface';
import { error } from 'util';
import { Router, ActivatedRoute } from '@angular/router';
import { vddlDataProvider } from 'app/client-interface/provider/data-provider';
import { IVddldetailsInterface } from '../vddldetails-interface';
import  swal  from 'sweetalert2';

@Component({
  selector: 'app-workinprogress',
  templateUrl: './workinprogress.component.html',
  styleUrls: ['./workinprogress.component.scss']
})
export class WorkinprogressComponent implements OnInit {

  pageTitle: string = ' VD/DL Detail';
  errorMessage: string;
  filteredvddlDetails: IVddl[];
  vddlDetails: IVddl[] = [];

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredvddlDetails = this.listFilter ? this.performFilter(this.listFilter) : this.vddlDetails;
  }

  constructor(private _vddlService: VdDlDataService, private _router: Router, private router: ActivatedRoute, private vddlData: vddlDataProvider) {
    router.snapshot.data[1];
   }

  performFilter(filterBy: string): IVddl[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.vddlDetails.filter((vddlDetail: IVddl) =>
      vddlDetail.VddlDetails.TradingName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  ngOnInit(): void {
  
    this._vddlService.getvddls()
      .subscribe(vddlDetails => {
        if(vddlDetails != null){
          this.vddlDetails = vddlDetails;
          this.filteredvddlDetails = this.vddlDetails;
        }else{
          swal("No Records Found!", "", "info");
        }
        
      },
      error => this.errorMessage = <any>error);
      
  }
  // takes you back to vddl screen for editing
  onVddlEdit(vddlDetail) {
    //  console.log(vddlDetail);
    this.vddlData.vddlStorage = vddlDetail;
    this._router.navigate(['/editvddl']);
  }

}
