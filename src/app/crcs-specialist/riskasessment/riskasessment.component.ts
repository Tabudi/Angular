import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRiskAssessment } from '../risk-assessment';
import { ActivatedRoute } from '@angular/router';
import { DataProvider } from 'app/crcs-specialist/provider/data-provider';
import { RiskAssessmentService } from 'app/crcs-specialist/risk-assessment.service';
import { RiskAssessmentClass } from 'app/crcs-specialist/risk-assessment-class';
import { RegistrationParticularsClass } from 'app/crcs-specialist/registration-particulars-class';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { CustomsTurnOverDetailsClass } from 'app/crcs-specialist/customs-turnover-details-class';
import { DirectorDetailsClass } from 'app/crcs-specialist/director-details-class';
import { IRiskStatementInterface } from '../risk-statement-interface';
import { CustomsRASParticularsClass } from '../customs-particulars-class';
import { RiskStatementClass } from '../risk-statement-class';
import { PagerService } from '../../shared-services/pager.service';
import { UpdateDatagridService } from '../../shared-services/update-datagrid.service';
import { DocumentUploadProviderService } from '../../providers/document-upload-provider.service';
import  swal  from 'sweetalert2';
import { RaApprovalServiceService } from '../../crcs-manager/ra-approval-service.service';
import { CommentsViewDataService } from "app/shared-modules/comments-view/comments-view-data.service";

import { PendCaseDataService } from "app/shared-services/pend-case/pend-case-data.service";



@Component({
  selector: 'app-riskasessment',
  templateUrl: './riskasessment.component.html',
  styleUrls: ['./riskasessment.component.scss']
})
export class RiskasessmentComponent implements OnInit {

  riskAssessment: IRiskAssessment;
  riskAssessmentData: RiskAssessmentClass = new RiskAssessmentClass();
  RegistrationParticularsClass: RegistrationParticularsClass = new RegistrationParticularsClass();
  CustomsParticularsClass: CustomsRASParticularsClass = new CustomsRASParticularsClass();
  CustomsTurnOverDetailsClass: CustomsTurnOverDetailsClass = new CustomsTurnOverDetailsClass();
  DirectorDetailsClass: DirectorDetailsClass = new DirectorDetailsClass();
  riskStatement: RiskStatementClass =  new RiskStatementClass();

  riskArealist: Array<any>;
  riskRatingsLikelihoodList: Array<any>;
  riskRatingsConcernedList: Array<any>;
  HSChapterAppliedList: Array<any>;
  industryList: Array<any>;
  RA_Approval: Boolean;
  RA_Fields: Boolean;
/*yearlyLossList: Array<any>;*/
  
  errorMessage: string;
  repData: any;
  items: Array<any>;

  viewTitle: String;

  originCaseList: any;
  statusValue: String;

  EntityIndex: Number;

  pageNumber: Number = 0;
  currentIndex: Number = 1;
  pagesIndex: Array<Number>;
  SarRefIndex: Number;
  Approval_Status: String;
  commentsCaseId: String = '';

  constructor(private data: DataProvider,private notesService:CommentsViewDataService, private _riskAssessmentService: RiskAssessmentService, private uploadedDocs:DocumentUploadProviderService,private updateData:UpdateDatagridService, private pagerService: PagerService ,private _router:Router) { 
    
    this.onRiskAssessment();
    this.onRiskRatingsLikelihood();
    this.onRiskRatingsConcerned();
    this.onHSChapterApplied();
    this.onIndustry();
    this.onGetOriginCase();

    this.RA_Approval = this._riskAssessmentService.RA_Approval;
    this.RA_Fields = this._riskAssessmentService.RA_Fields;
    //this.Approval_Status
    
  }

  ngOnInit() {
   
    if (this.data.riskAssessmentStorage) {
      this.viewTitle = "Edit Risk Assessment ";
      this.riskAssessmentData = this.data.riskAssessmentStorage;
      this.commentsCaseId = this.riskAssessmentData.RegistrationParticulars.CustomsCode;
      let gridItems = this.pagerService.init(this.data.riskAssessmentStorage.RiskStatement);
   
      this.items = gridItems.items;
      this.pageNumber = gridItems.pageNumber;
      this.currentIndex =  gridItems.currentIndex;
      this.pagesIndex   = gridItems.pagesIndex;
     
    } else {
     // this.statusValue ="New";
      this.viewTitle = "Create New Risk Assessment";
      this.riskAssessmentData;
    
    }

    
  }

  onAddNote() {
    this.commentsCaseId = null;
    swal({
      input: 'textarea',
      title: 'Add Note',
      showCancelButton: true,
      confirmButtonText: 'Save Note'
    }).then((result) => {
      if (result.value) {
        this.notesService.savenote(this.riskAssessmentData.RegistrationParticulars.CustomsCode, result.value)
          .subscribe(res => {
            console.log(res);
            this.repData = res;
            if (this.repData != "0") {
              swal(
                'Record',
                'Note Saved Successfully',
                'success'
              );
              this.commentsCaseId = this.riskAssessmentData.RegistrationParticulars.CustomsCode;
            }
          }, error => swal('Did not Save', <any>error, 'error')
          )
      } else {
        this.commentsCaseId = this.riskAssessmentData.RegistrationParticulars.CustomsCode;
      }
    });
  }

  onRiskAssessment() {
    this._riskAssessmentService.getRiskArea()
      .subscribe(riskArealist => {
        this.riskArealist = riskArealist;
      },
      error => this.errorMessage = <any>error);

  }

  calculateOverallRiskRating() {
    let total = 0;
    if (this.riskStatement.RiskRatingLikelihoodId && this.riskStatement.RiskRatingConcernedId){
      const RiskRatingLikelihoodId = this.riskStatement.RiskRatingLikelihoodId;
      const RiskRatingConcernedId = this.riskStatement.RiskRatingConcernedId;
      total = Number(RiskRatingLikelihoodId) * Number(RiskRatingConcernedId);
      this.riskStatement.OveralRiskRating = total.toString();
    }
  }

  onDoneEditDetails(dataObj, riskStatementDetails) {

    let oldData = this.riskAssessmentData.RiskStatement;

    let updatedobject =  riskStatementDetails.value;
    
    this.updateData.onupdateOfGrid(dataObj, updatedobject, oldData, this.SarRefIndex);

    this.riskStatement  = new RiskStatementClass();
   
  }

  addRefDetails(refDetails : NgForm) {
    this.riskAssessmentData.RiskStatement.push(refDetails.value);
    refDetails.resetForm();
    let addedIitmes  = this.pagerService.init( this.riskAssessmentData.RiskStatement);
    this.items = addedIitmes.items;
    this.pageNumber =addedIitmes.pageNumber;
    this.currentIndex =  addedIitmes.currentIndex;
    this.pagesIndex   = addedIitmes.pagesIndex;
  }

  onRiskRatingsLikelihood() {
    this._riskAssessmentService.getRiskRatingsLikelihood()
      .subscribe(riskRatingsLikelihoodList => {
        this.riskRatingsLikelihoodList = riskRatingsLikelihoodList;
      },
      error => this.errorMessage = <any>error);

  }

  
  onRiskRatingsConcerned() {
    this._riskAssessmentService.getRiskRatingsConcerned()
      .subscribe(riskRatingsConcernedList => {
        this.riskRatingsConcernedList = riskRatingsConcernedList;
      },
      error => this.errorMessage = <any>error);
  }

  onHSChapterApplied() {
    this._riskAssessmentService.getHSChapterApplied()
      .subscribe(industryList => {
        this.industryList = industryList;
      },
      error => this.errorMessage = <any>error);
  }

  onIndustry() {
    this._riskAssessmentService.getIndustry()
      .subscribe(HSChapterAppliedList => {
        this.HSChapterAppliedList = HSChapterAppliedList;
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

  onCancel() {
    // clear fields
    this.data.riskAssessmentStorage = null;
    this._router.navigate(['/dashboard']);

  }

  onRefDetailsRemove() {

  }

  onRefDetailsEdit(TbdRefDetail, refDetails: NgForm, i){

    this.SarRefIndex = i;
    if( this.riskStatement){
        this.riskStatement;
    }
    this.riskStatement = TbdRefDetail;

  }

  entityDetailsEdit(entityDetail, entityDetails, i){
    this.EntityIndex = i;

    this.riskAssessmentData = entityDetail;

  }

  onSave(sarObj) {

    if(this.riskAssessmentData.RegistrationParticulars.IBRCustomsNr == null){
      this.riskAssessmentData.RegistrationParticulars.IsEdit = false;
    } else {
      this.riskAssessmentData.RegistrationParticulars.IsEdit = true;
    }

    this._riskAssessmentService.addriskAssment(sarObj);
    this.riskAssessmentData.UploadedFiles =this.uploadedDocs.documentUploadStroage; 
    this._riskAssessmentService.addRADocs(this.riskAssessmentData)
      .subscribe(res => {
        this.repData = res;
        if( this.repData != "0"){
          swal(
            'Record',
            'Risk Assessment Saved Successfully',
            'success'
          )
         this.riskAssessmentData = new RiskAssessmentClass();
         this.uploadedDocs.documentUploadStroage = null;
         this.onCancel();
        }
      },
      error => this.errorMessage = <any>error);

  }

  onsubmit(riskAssessmentDstail) {

    this._riskAssessmentService.submitriskAssment(riskAssessmentDstail)
      .subscribe(riskAssessmentDstail => {
      },
      error => this.errorMessage = <any>error);
  }

  onGetOriginCase(){
    this._riskAssessmentService.getOriginoCase()
      .subscribe(originCaseList => {
        this.originCaseList = originCaseList; 
      },
      error => this.errorMessage = <any>error);

  }

  onAccept(raDetails) {
    this._riskAssessmentService.approveAssment(raDetails);
    this.data.riskAssessmentStorage = null;
    this._router.navigate(['/dashboard']);
  }

  onrework(raDetails) {
    this._riskAssessmentService.reworkAssment(raDetails);
    this.data.riskAssessmentStorage = null;
    this._router.navigate(['/dashboard']);
  }

  onReject(raDetails) {
    this._riskAssessmentService.rejectAssment(raDetails);
    this.data.riskAssessmentStorage = null;
    this._router.navigate(['/dashboard']);
  }

  getVddlFormByCaseId(IBRnumber) {
    this._riskAssessmentService.getRAbyIBRNumber(IBRnumber)
      .subscribe(res => {
        if (res != null) {
          this.riskAssessmentData = res;
          this.uploadedDocs.documentUploadStroage = res.UploadedFiles;
          this.commentsCaseId = this.riskAssessmentData.RegistrationParticulars.CustomsCode;
        } else {
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);

  }

}
