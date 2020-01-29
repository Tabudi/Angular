import { Component, OnInit } from '@angular/core';
import { UserClass } from './user-class';
import { Iuser } from './user-interface';
import { SarProvider } from 'app/user/sar-provider';
import { UserService } from 'app/user/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { RefDetailsClass } from './ref-details-class';
import { EntityDetailsClass } from './entity-details-class';
import { ResidentailBusinessAddressClass } from 'app/user/residentail-business-address-class';
import { NoncomplianceDetailsClass } from 'app/user/noncompliance-details-class';
import { ReportedPersonClass } from 'app/user/reported-person-class';
import { Observable } from 'rxjs/Observable';

import  swal  from 'sweetalert2';
import { UpdateDatagridService } from '../shared-services/update-datagrid.service';
import { PagerService } from '../shared-services/pager.service';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { CommentsViewDataService } from "app/shared-modules/comments-view/comments-view-data.service";
import { DocumentUploadProviderService } from '../providers/document-upload-provider.service';


@Component({
  selector: 'app-activityreport',
  templateUrl: './activityreport.component.html',
  styleUrls: ['./activityreport.component.scss']
})
export class ActivityreportComponent implements OnInit {

  sar: Iuser;
  sarData: UserClass = new UserClass();
  errorMessage: string;
  refDetailsData: RefDetailsClass = new RefDetailsClass();
  entityDetailsData: EntityDetailsClass = new EntityDetailsClass();
  reportedPersonData: ReportedPersonClass = new ReportedPersonClass();
  residentialBusinessData: ResidentailBusinessAddressClass = new ResidentailBusinessAddressClass();
  nonComplianceData: NoncomplianceDetailsClass = new NoncomplianceDetailsClass();

  disableAddButton: boolean = false;

  travellerList: Array<any>;
  companiesList: Array<any>;
  provincesList: Array<any>;
  timeFrameList: Array<any>;
  yearlyLossList: Array<any>;
  viewTitle: String;
  regionItems:Array<any>;

  items:Array<any>;

  pageNumber: number = 0;
  currentIndex: number = 1;
  pagesIndex: Array<number>;

  // no Compliance vars
  nonComItems:Array<any>;
  nonComPageNumber: number = 0;
  nonComCurrentIndex: number = 1;
  nonComPagesIndex: Array<number>;

  // residentail bus Address vars
  resItems:Array<any>;
  resPageNumber: number = 0;
  resCurrentIndex: number = 1;
  resPagesIndex: Array<number>;

  // reported person vars
  repItems:Array<any>;
  repPageNumber: number = 0;
  repCurrentIndex: number = 1;
  repPagesIndex: Array<number>;

  // entity type vars

  entItems:Array<any>;
  entPageNumber: number = 0;
  entCurrentIndex: number = 1;
  entPagesIndex: Array<number>;

  // index for the object from the datagrid
  SarRefIndex: number;
  NonComIndex: number;
  ResBusIndex:number;
  RepPersonIndex:number;
  EntityIndex:number;

  repType:any;
  userRole:String;

  constructor(private data: SarProvider, private notesService:CommentsViewDataService, private uploadedDocs:DocumentUploadProviderService,private _Tbdervice: UserService, private _router: Router, private pagerService: PagerService,private updateData:UpdateDatagridService ,private systemUser:SystemUserProviderService) {

    this.onTraveller();
    this.onCompanies();
    this.onProvinces();
    this.onTimeFrame();
    this.onYearlyLoss();
    this.getRegion();
    this.userRole  = this.systemUser.systemUserStorage.Role;
  }

  ngOnInit() {


    if (this.data.Tbdtorage) {
      this.viewTitle = "Suspicious Activity Report Edit";
      this.sarData = this.data.Tbdtorage;
   //   this.filteredItems = this.data.Tbdtorage.TbdRefDetails;

      // inti for each datagrid items
      let gridItems = this.pagerService.init(this.data.Tbdtorage.TbdRefDetails);
   
      this.items = gridItems.items;
      this.pageNumber = gridItems.pageNumber;
      this.currentIndex =  gridItems.currentIndex;
      this.pagesIndex   = gridItems.pagesIndex;

    } else {

      this.viewTitle = "Suspicious Activity Report ";
      this.sarData;
      this.onTraveller();
      this.onCompanies();
      this.onProvinces();
      this.onTimeFrame();
      this.onYearlyLoss();
    }

  }

  onCancel() {
    // clear fields
    this.data.Tbdtorage = null;
    this._router.navigate(['/dashboard']);

  }

  addRefDetails(refDetails : NgForm) {
    this.sarData.TbdRefDetails.push(refDetails.value);
    refDetails.resetForm();
    let addedIitmes  = this.pagerService.init( this.sarData.TbdRefDetails);
    this.items = addedIitmes.items;
    this.pageNumber =addedIitmes.pageNumber;
    this.currentIndex =  addedIitmes.currentIndex;
    this.pagesIndex   =addedIitmes.pagesIndex;
     
  }

  addEntityDetails(entityDetails : NgForm){
    this.sarData.EntityTypeDetails.push(entityDetails.value);
    entityDetails.resetForm();
    let addedIitmes  = this.pagerService.init( this.sarData.EntityTypeDetails);
    this.entItems = addedIitmes.items;
    this.pageNumber =addedIitmes.pageNumber;
    this.currentIndex =  addedIitmes.currentIndex;
    this.pagesIndex   =addedIitmes.pagesIndex;

  }
  addReportedPersonDetails(reportedPerson : NgForm){
    this.sarData.ReportedPersonDetails.push(reportedPerson.value);
    reportedPerson.resetForm();
    let addedIitmes  = this.pagerService.init( this.sarData.ReportedPersonDetails);
    this.repItems = addedIitmes.items;
    this.pageNumber =addedIitmes.pageNumber;
    this.currentIndex =  addedIitmes.currentIndex;
    this.pagesIndex   =addedIitmes.pagesIndex;

  }

  addResBusinessAddress(resBus :NgForm){
    this.sarData.ResidentialBusinessAddress.push(resBus.value);
    resBus.resetForm();
    let addedIitmes  = this.pagerService.init( this.sarData.ResidentialBusinessAddress);
    this.resItems = addedIitmes.items;
    this.pageNumber =addedIitmes.pageNumber;
    this.currentIndex =  addedIitmes.currentIndex;
    this.pagesIndex   =addedIitmes.pagesIndex;

  }

  addNonComplianceDetails(nonCompliance :NgForm){

    this.sarData.NonComplianceDetails.push(nonCompliance.value);
    nonCompliance.resetForm();
    let addedIitmes  = this.pagerService.init( this.sarData.NonComplianceDetails);
    this.nonComItems = addedIitmes.items;
    this.nonComPageNumber =addedIitmes.pageNumber;
    this.nonComCurrentIndex =  addedIitmes.currentIndex;
    this.nonComPagesIndex   =addedIitmes.pagesIndex;
  }

  

  onRefDetailsRemove() {

  }

  onRefDetailsEdit(TbdRefDetail, refDetails: NgForm, i) {

    this.SarRefIndex = i
    if( this.refDetailsData){
        this.refDetailsData
    }
    this.refDetailsData = TbdRefDetail;

  }

  entityDetailsEdit(entityDetail, entityDetails, i){
    this.EntityIndex = i

    this.entityDetailsData = entityDetail;

  }
  reportedPersonDetailsEdit(reportedPersonDetail, reportedPerson, i){
    this.RepPersonIndex = i;

    this.reportedPersonData = reportedPersonDetail;

  }

  resBusinessAddressEdit(residentialBusinessDeatils, resBus, i){
    this.ResBusIndex = i;

    this.residentialBusinessData = residentialBusinessDeatils;

  }

  NonComplianceDetailsEdit(nonComDetail, nonCompliance, i){
    this.NonComIndex = i;
    this.nonComplianceData = nonComDetail;
  }


  onDoneEditDetails(dataObj, refDetails) {

    let oldData = this.sarData.TbdRefDetails;

    let updatedobject =  refDetails.value;
    
    this.updateData.onupdateOfGrid(dataObj, updatedobject, oldData, this.SarRefIndex);

    this.refDetailsData  = new RefDetailsClass();
   
  }
  // onSubmit(){
  //   this._Tbdervice.submitSar(this.sarData)
  //   .subscribe(any => {
  //   },
  //   error => this.errorMessage = <any>error);


  // }

  // onRefDetailsEdit(TbdRefDetail , refDetails :  NgForm){
  //   this.disableAddButton = true;
  //   this.refDetailsData = TbdRefDetail;

  // }

  /*onTraveller(){
    this._Tbdervice.getTraveller()
      .subscribe(travellerlist => {
        this.travellerList = travellerlist; 
      },
      error => this.errorMessage = <any>error);

  }

  onCompanies(){
    this._Tbdervice.getCompanies()
      .subscribe(companieslist => {
        this.companiesList = companieslist; 
      },
      error => this.errorMessage = <any>error);

  }
  onProvinces(){
    this._Tbdervice.getProvinces()
      .subscribe(provinceslist => {
        this.provincesList = provinceslist; 
      },
      error => this.errorMessage = <any>error);

  }
  onTimeFrame(){
    this._Tbdervice.getTimeFrame()
      .subscribe(timeFramelist => {
        this.timeFrameList = timeFramelist; 
      },
      error => this.errorMessage = <any>error);

  }
  onYearlyLoss(){
    this._Tbdervice.getYearlyLoss()
      .subscribe(yearlyLosslist => {
        this.yearlyLossList = yearlyLosslist; 
      },
      error => this.errorMessage = <any>error);

  }*/


  doneEntityDetailsEdit(dataObj,entityDetails){

    let oldData = this.sarData.EntityTypeDetails;

    let updatedobject =  entityDetails.value;
    
    this.updateData.onupdateOfGrid(dataObj, updatedobject, oldData, this.EntityIndex);

    this.entityDetailsData  = new EntityDetailsClass();

  }
  doneReportedPersonDetailsEdit(dataObj,reportedPerson){
    let oldData = this.sarData.ReportedPersonDetails;

    let updatedobject =  reportedPerson.value;
    
    this.updateData.onupdateOfGrid(dataObj, updatedobject, oldData, this.RepPersonIndex);

    this.reportedPersonData  = new ReportedPersonClass();

  }

  doneResBusinessAddressEdit(dataObj,resBus){
    let oldData = this.sarData.ResidentialBusinessAddress;

    let updatedobject =  resBus.value;
    
    this.updateData.onupdateOfGrid(dataObj, updatedobject, oldData, this.ResBusIndex);

    this.residentialBusinessData  = new ResidentailBusinessAddressClass();

  }

  doenNonComplianceDeatilsEdit(dataObj,nonComDetails){
    let oldData = this.sarData.NonComplianceDetails;
    let updatedobject =  nonComDetails.value;
    
    this.updateData.onupdateOfGrid(dataObj, updatedobject, oldData, this.NonComIndex);

    this.nonComplianceData = new NoncomplianceDetailsClass()

    
  }


  onSave(sarObj) {
    if(sarObj.CaseDetails.ReferenceNumber == null){
      sarObj.CaseDetails.IsEdit = false;
      sarObj.CaseDetails.RegionId = this.systemUser.systemUserStorage.RegionId;
    }else{
      sarObj.CaseDetails.IsEdit = true;
    }
 
    this._Tbdervice.saveSar(sarObj)
      .subscribe(res => {
        this.repType = res;
        if(this.repType != 0){
          this.items = [];
          this.sarData = new UserClass();
          swal(
            'Record',
            'SAR Saved Successfully',
            'success' 
          )
          
        }
       
       
      },
      error => this.errorMessage = <any>error);

  }
  submitSar() {
    this._Tbdervice.submitSar(this.sarData)
      .subscribe(res => {
        this.repType = res;
        if(this.repType != 0){
          this.sarData = new UserClass();
          swal(
            'Record',
            'SAR Submitted Successfully',
            'success'
          )
        }
        
      },
      error => this.errorMessage = <any>error);


  }

  getRegion() {
    this._Tbdervice.getRegion()
      .subscribe(res => {
        if (res != null) {
          this.regionItems = res;
        } else {
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);

  }



  onTraveller() {
    this._Tbdervice.getTraveller()
      .subscribe(travellerlist => {
        this.travellerList = travellerlist;
      },
      error => this.errorMessage = <any>error);

  }

  onCompanies() {
    this._Tbdervice.getCompanies()
      .subscribe(companieslist => {
        this.companiesList = companieslist;
      },
      error => this.errorMessage = <any>error);

  }
  onProvinces() {
    this._Tbdervice.getProvinces()
      .subscribe(provinceslist => {
        this.provincesList = provinceslist;
      },
      error => this.errorMessage = <any>error);

  }
  onTimeFrame() {
    this._Tbdervice.getTimeFrame()
      .subscribe(timeFramelist => {
        this.timeFrameList = timeFramelist;
      },
      error => this.errorMessage = <any>error);

  }
  onYearlyLoss() {
    this._Tbdervice.getYearlyLoss()
      .subscribe(yearlyLosslist => {
        this.yearlyLossList = yearlyLosslist;
      },
      error => this.errorMessage = <any>error);

  }

  prevPage() {

    let prevpage = this.pagerService.prevPage();
    this.items =prevpage.items;
    this.pagesIndex = prevpage.pagesIndex;
    this.pageNumber = prevpage.pageNumber;
    this.currentIndex = prevpage.currentIndex;

  }

  nextPage() {

    let nextpage = this.pagerService.prevPage();
    this.items =nextpage.items;
    this.pagesIndex = nextpage.pagesIndex;
    this.pageNumber = nextpage.pageNumber;
    this.currentIndex = nextpage.currentIndex;


  }

  setPage(index) {

    let setpage = this.pagerService.setPage(index);
    this.items = setpage.items;
    this.pagesIndex = setpage.pagesIndex;
    this.pageNumber = setpage.pageNumber;
    this.currentIndex = setpage.currentIndex;

  }

  prevPageEnty() {

    let prevpage = this.pagerService.prevPage();
    this.items =prevpage.items;
    this.pagesIndex = prevpage.pagesIndex;
    this.pageNumber = prevpage.pageNumber;
    this.currentIndex = prevpage.currentIndex;

  }

  nextPageEnty() {

    let nextpage = this.pagerService.prevPage();
    this.items =nextpage.items;
    this.pagesIndex = nextpage.pagesIndex;
    this.pageNumber = nextpage.pageNumber;
    this.currentIndex = nextpage.currentIndex;


  }

  setPageEnty(index) {

    let setpage = this.pagerService.setPage(index);
    this.items = setpage.items;
    this.pagesIndex = setpage.pagesIndex;
    this.pageNumber = setpage.pageNumber;
    this.currentIndex = setpage.currentIndex;

  }

  prevPagePer() {

    let prevpage = this.pagerService.prevPage();
    this.items =prevpage.items;
    this.pagesIndex = prevpage.pagesIndex;
    this.pageNumber = prevpage.pageNumber;
    this.currentIndex = prevpage.currentIndex;

  }

  nextPagePer() {

    let nextpage = this.pagerService.prevPage();
    this.items =nextpage.items;
    this.pagesIndex = nextpage.pagesIndex;
    this.pageNumber = nextpage.pageNumber;
    this.currentIndex = nextpage.currentIndex;


  }

  setPagePer(index) {

    let setpage = this.pagerService.setPage(index);
    this.items = setpage.items;
    this.pagesIndex = setpage.pagesIndex;
    this.pageNumber = setpage.pageNumber;
    this.currentIndex = setpage.currentIndex;

  }

  prevPageResBus() {

    let prevpage = this.pagerService.prevPage();
    this.items =prevpage.items;
    this.pagesIndex = prevpage.pagesIndex;
    this.pageNumber = prevpage.pageNumber;
    this.currentIndex = prevpage.currentIndex;

  }

  nextPageResBus() {

    let nextpage = this.pagerService.prevPage();
    this.items =nextpage.items;
    this.pagesIndex = nextpage.pagesIndex;
    this.pageNumber = nextpage.pageNumber;
    this.currentIndex = nextpage.currentIndex;


  }

  setPageResBus(index) {

    let setpage = this.pagerService.setPage(index);
    this.items = setpage.items;
    this.pagesIndex = setpage.pagesIndex;
    this.pageNumber = setpage.pageNumber;
    this.currentIndex = setpage.currentIndex;

  }

  prevPageNonCom() {

    let prevpage = this.pagerService.prevPage();
    this.items =prevpage.items;
    this.pagesIndex = prevpage.pagesIndex;
    this.pageNumber = prevpage.pageNumber;
    this.currentIndex = prevpage.currentIndex;

  }

  nextPageNonCom() {

    let nextpage = this.pagerService.prevPage();
    this.items =nextpage.items;
    this.pagesIndex = nextpage.pagesIndex;
    this.pageNumber = nextpage.pageNumber;
    this.currentIndex = nextpage.currentIndex;


  }

  setPageNonCom(index) {

    let setpage = this.pagerService.setPage(index);
    this.items = setpage.items;
    this.pagesIndex = setpage.pagesIndex;
    this.pageNumber = setpage.pageNumber;
    this.currentIndex = setpage.currentIndex;

  }


}
