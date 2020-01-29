import { Component, OnInit } from '@angular/core';
import { SearchDataService } from 'app/search/search-data.service';
import { ISearch } from 'app/search/search-interface';
import {Router} from  '@angular/router';
import  swal  from 'sweetalert2';
import { VdDlDataService } from "app/client-interface/vd-dl-data.service";
import { vddlDataProvider } from "app/client-interface/provider/data-provider";
import { IVddl } from 'app/client-interface/vd-dl-interface';
import { UserService } from "app/user/user.service";
import { SarProvider } from "app/user/sar-provider";

@Component({
  selector: 'app-search',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.scss']
})
export class SearchComponent implements OnInit {
  viewTitle:String;
  filteredSearchResults: ISearch[];
  searchResults: ISearch[] =[] ;
  errorMessage: string;
  refNumber:string ='';
  exciseCode:string ='';
  companyNumber:string ='';
  tradingName:string ='';
  sid:string ='';
  startDate:string ='';
  endDate:string ='';
  searchVal:string ='VDD';
  selectedVddl : IVddl; 
  _listFilter: string;

  constructor(private searchData: SearchDataService, private _router:Router,
    private _vddlService: VdDlDataService,private vddlData: vddlDataProvider,
    private data: SarProvider, private _Tbdervice: UserService) { }

  ngOnInit() {  
  }
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredSearchResults = this.listFilter ? this.performFilter(this.listFilter) : this.searchResults;
  }
  performFilter(filterBy: string): ISearch[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.searchResults.filter((searchResult: ISearch) =>
    searchResult.TradingName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }


  onSearch(){
    this.viewTitle = "Search View ";
    this.searchData.getSearchData(this.refNumber,this.sid,this.searchVal,this.companyNumber, this.tradingName, this.exciseCode,this.startDate, this.endDate) 
    .subscribe(results => {
      if(results != null){
        var temp = results; 
        
        this.searchResults = results;
        this.filteredSearchResults = this.searchResults;
      }else{
        swal("No Records Found!", "", "info");
      }
    
    },
    error => this.errorMessage = <any>error);    
  }

  onLoadDetails(search:ISearch ){
    if (search.SAR_VDD === 'VDD')
      {
        var tempVdl = this._vddlService.getvddlbycaseid(search.CaseId)
          .subscribe(vddlDetails =>{
              if (vddlDetails != null) {
                 this.selectedVddl = vddlDetails;
                // this.selectedVddl.reduce()
                this.vddlData.vddlStorage = this.selectedVddl;
                this._router.navigate(['/editvddl']);
              }
            }
          );                
      }else { 
        swal("No yet Developed","This function has not been created!","info");
        //this._router.navigate(['/editsar']);
      }
  }
}


