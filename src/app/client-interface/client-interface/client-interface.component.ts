import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized, NavigationEnd } from '@angular/router';
import { IVddl } from '../vd-dl-interface';
import { vddlDataProvider } from 'app/client-interface/provider/data-provider';
import { VdDlDataService } from 'app/client-interface/vd-dl-data.service';
import { VdDlClass } from 'app/client-interface/vd-dl-class';
import swal from 'sweetalert2';
import { SystemUserProviderService } from '../../system-user-provider.service';
import { DocumentUploadProviderService } from '../../providers/document-upload-provider.service';
import { CommentsViewDataService } from "app/shared-modules/comments-view/comments-view-data.service";

import { PendCaseDataService } from "app/shared-services/pend-case/pend-case-data.service";
import 'rxjs/add/operator/pairwise';
import { IncometaxValidationService } from '../../shared-services/validations/incometax-validation.service';
import { VatValidationService } from '../../shared-services/validations/vat-validation.service';
import { FieldLengthDirective } from '../../directives/field-length.directive';

@Component({
  selector: 'app-client-interface',
  templateUrl: './client-interface.component.html',
  styleUrls: ['./client-interface.component.scss'],
})

export class ClientInterfaceComponent implements OnInit {

  Vddl: IVddl;
  vddlData: VdDlClass = new VdDlClass();
  errorMessage: string;
  repData: any;

  viewTitle: String;

  originCaseList: any;
  customsExciseLists: any;
  statusValue: String;
  commentsCaseId: String = '';
  fromView: String;
  caseIdFromView: String;

  callingUrl: string;

  constructor(private data: vddlDataProvider, private _vddlService: VdDlDataService, private _router: Router, private router: ActivatedRoute, private systemUser: SystemUserProviderService, private uploadedDocs: DocumentUploadProviderService, private notesService: CommentsViewDataService, private pendCaseService: PendCaseDataService, private incomeValService:IncometaxValidationService , private vatValService:VatValidationService) {
    this.onGetOriginCase();
    this.getCustomsExcise();
    // router.snapshot.data[1];
    // 
    this.fromView = router.snapshot.params["view"];
    this.caseIdFromView = router.snapshot.params["data"];

    this._router.events
      .filter(event => event instanceof RoutesRecognized).pairwise()
      .subscribe((x: any[]) =>
        this.callingUrl = x[0].urlAfterRedirects);
  }

  ngOnInit() {

    if (this.data.vddlStorage) {
      this.viewTitle = "Edit VD/DL ";
      this.vddlData.VddlDetails = this.data.vddlStorage.VddlDetails;
      this.uploadedDocs.documentUploadStroage = this.data.vddlStorage.UploadedFiles;
      this.commentsCaseId = this.vddlData.VddlDetails.CaseId;
      // swal("WorKing ");

    } else {
      if (this.fromView == "auditPlan" || this.fromView =="approvedauditplansview") {
        this.viewTitle = "View VD/DL"
        this.getVddlFormByCaseId();
      } else {
        this.statusValue = "New";
        this.viewTitle = "Create New VD/DL";
        this.vddlData.VddlDetails;
        // swal("WorKing ");
      }

    }

  }

  onCancel() {
    // clear fields
    if (this.data.vddlStorage) {
      this.data.vddlStorage.VddlDetails = null;
    }

    this._router.navigate(['/dashboard']);

  }

  onSave(vddlDetail) {
    this.vddlData.VddlDetails.Sid = this.systemUser.systemUserStorage.SID;
    this.vddlData.VddlDetails.RegionId = this.systemUser.systemUserStorage.RegionId;
    if (this.vddlData.VddlDetails.CaseId == null) {
      this.vddlData.IsEdit = false;
    } else {
      vddlDetail.IsEdit = true;

    }

    this.vddlData.UploadedFiles = this.uploadedDocs.documentUploadStroage;
    // this.vddlData.UploadedFiles[0].DocumentContent = null;
    this._vddlService.addVddl(this.vddlData)
      .subscribe(res => {
        console.log(res);
        this.repData = res;
        if (this.repData == "1") {
          swal(
            'Record',
            'VD/DL Saved Successfully',
            'success'
          )
          this.vddlData = new VdDlClass();
          this.uploadedDocs.documentUploadStroage = null;
          if(this.fromView == "auditPlan"){
            this._router.navigate(["/createauditplan"]);
          }else{
            this.onCancel();
          }
         
        }

        else
        {
          swal(
            'Record',
            'Failed to save VD/DL - ' + res,
            'error'
          )
        }

      },
        error => this.errorMessage = <any>error);

  }
  onsubmit(vddlDstail) {

    this.vddlData.VddlDetails.Sid = this.systemUser.systemUserStorage.SID;
    this.vddlData.VddlDetails.RegionId = this.systemUser.systemUserStorage.RegionId;
    this.vddlData.UploadedFiles = this.uploadedDocs.documentUploadStroage;
    this._vddlService.submitVddl(vddlDstail)
      .subscribe(any => {
        swal(
          'Record',
          'VD/DL Submitted Successfully',
          'success'
        )
        this.vddlData = new VdDlClass();
        this.uploadedDocs.documentUploadStroage = null;
        this.onCancel();
      },
        error => this.errorMessage = <any>error);
  }

  onGetOriginCase() {
    this._vddlService.getOriginoCase()
      .subscribe(originCaseList => {
        this.originCaseList = originCaseList;
      },
        error => this.errorMessage = <any>error);

  }

  getCustomsExcise() {
    this._vddlService.getCustomsExcise()
      .subscribe(res => {
        this.customsExciseLists = res;
      },
        error => this.errorMessage = <any>error);

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
        this.notesService.savenote(this.vddlData.VddlDetails.CaseId, result.value)
          .subscribe(res => {
            console.log(res);
            this.repData = res;
            if (this.repData != "0") {
              swal(
                'Record',
                'Note Saved Successfully',
                'success'
              );
              this.commentsCaseId = this.vddlData.VddlDetails.CaseId;
            }
          }, error => swal('Did not Save', <any>error, 'error')
          )
      } else {
        this.commentsCaseId = this.vddlData.VddlDetails.CaseId;
      }
    });
  }

  onPend() {
    var dateFormat = require('dateformat');
    var today = new Date;
    today.setDate(today.getDate() + 1);

    today = dateFormat(today, 'yyyy-mm-dd')
    swal({
      title: 'Pend Case',
      html: 'Select date to pend case: <input type="date" id="datepicker" value="' + today + '" min="' + today + '"  >',
      //        onOpen: function() {$('#datepicker').datepicker();},
      type: 'question'
    }).then((result) => {
      if (result.value) {
        var selectedDate = new Date((document.getElementById('datepicker') as HTMLInputElement).value);
        //         var selectedDate =new Date($('#datepicker').val());
        var day = selectedDate.getDay();
        if (day === 0 || day == 6) {
          swal('Pend Result', 'Pend Case failed: <br>Weekend Not Allowed', 'error');
        }
        else {
          this.pendCaseService.onPendCase(this.vddlData.VddlDetails.CaseId, selectedDate)
            .then(
              this._router.navigate(['/vddlworkinprogress']))
            .catch(
              swal("Failed to pend case", "Case did not pend, please try again later", "error")
            );
        }
      }
    }
    )
  }

  getVddlFormByCaseId() {
    this._vddlService.getVddlFormByCaseId(this.caseIdFromView)
      .subscribe(res => {
        if (res != null) {
          this.vddlData.VddlDetails = res.VddlDetails;
          this.uploadedDocs.documentUploadStroage = res.UploadedFiles;
          this.commentsCaseId = this.vddlData.VddlDetails.CaseId;
        } else {
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);

  }

  // field validation

  incomeValidation(incomeTax):void{
    if(incomeTax.value.toString.length> 0){
      var that = this;
      this.incomeValService.incomeNumberValidator(incomeTax).then(function() {
        incomeTax.pristine = true;
        },function(){
        swal("The Income Number you have entered does not seem to be valid ", "", "error");
        that.vddlData.VddlDetails.IncomeTax = null; 
          incomeTax.valid = false;
      });
   }
  }
  vatValidation(vatNumber): void {
    if (vatNumber.value.toString.length > 0) {
      var that = this;
      this.vatValService.vatNumberValidation(vatNumber).then(function() {
        vatNumber.pristine = true;
        vatNumber.valid = true;
          }, function () {
         swal("The VAT Number you have entered does not seem to be valid ", "", "error");
          that.vddlData.VddlDetails.VATNumber = null;       
          vatNumber.valid = false;
      });
    }

  }

  goBack() {

    if (this.fromView == "auditPlan") {
      this._router.navigate(["/createauditplan"]);
    } 
    if(this.fromView == "approvedauditplansview"){
    //auditplanworrework
    this._router.navigate(["/auditplanworrework"]);
    }
  }
}
