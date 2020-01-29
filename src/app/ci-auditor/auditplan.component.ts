import { Component, OnInit } from '@angular/core';
import { AuditorTemplateService } from './auditor-template.service';
import { LookUpService } from 'app/lookUp/lookup.service';
import { IAuditRequiredLKP, ITypeOfAuditLKP, IVddlLKP } from 'app/lookUp/lookup-interfaces';

import swal from 'sweetalert2';
import { AuditorClass, AuditPlanResult } from './auditor-class';
import { IAuditcheckListInterface } from './auditcheck-list-interface';
import { LookupAddress } from 'dns';
import { isError } from 'util';
import { AuditDataproviderService } from './audit-dataprovider-service.service';
import { DocumentUploadProviderService } from '../providers/document-upload-provider.service';
import { Observable } from 'rxjs/Observable';
import { DocumentClass } from '../shared-modules/document-upload/document-class';
import { DocumentViewerService } from '../shared-services/document-viewer-service';
import { Router } from '@angular/router';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { vddlDataProvider } from '../client-interface/provider/data-provider';

@Component({
  selector: 'app-auditplan',
  templateUrl: './auditplan.component.html',
  styleUrls: ['./auditplan.component.scss']
})
export class AuditplanComponent implements OnInit {

  caseID: any;
  auditlistItems: Array<any>[];
  errorMessage: String;
  audiDetails: AuditorClass = new AuditorClass();
  toggleCollection = [];
  resultData: any;
  vDLookup: Array<IVddlLKP>[];
  auditRequiredLookup: Array<IAuditRequiredLKP>[];
  typeOfAuditLook: Array<ITypeOfAuditLKP>[];
  documentLetter: any;
  documentItems: Array<any> = new Array() ;

  constructor(private auditServices: AuditorTemplateService, private lookUpService: LookUpService,
    private storageDataAuditService: AuditDataproviderService, private dvservice: DocumentViewerService,
    private router: Router, private systemUser:SystemUserProviderService,private data: vddlDataProvider ) {

    this.getLookUpData();
  }

  ngOnInit() {
    
    this.toggleCollection = [{Value : true, DisplayText : "Yes"}, {Value : false, DisplayText : "No"}];

    let  _opendAuditPlan = this.storageDataAuditService.auditDataPlanStorage;
    let _auditDataStorage = this.storageDataAuditService.auditDataStorage;

    if(_auditDataStorage)
    {
        this.caseID = _auditDataStorage.VddlDetails.CaseId;
    }

    if (_opendAuditPlan) {
      this.documentItems = _opendAuditPlan.AuditDocuments; // documents
      this.audiDetails = _opendAuditPlan.AuditTemplate; // the actual template
      this.auditlistItems = _opendAuditPlan.CheckList; // these are checklist items.
      this.caseID = _opendAuditPlan.CaseId;
    }

    // tslint:disable-next-line:one-line
    else{
      this.getcompleteAuditPlanQuestions();
    }

  }

  //#region Save/Update Methods

  getLookUpData() {
    this.lookUpService.getVddlLKP()
      .subscribe(res => {
        if (res != null) {
          this.vDLookup = res;
        }
      },
        error => this.errorMessage = <any>error);

    this.lookUpService.getAuditRequiredLKP()
      .subscribe(res => {
        if (res != null) {
          this.auditRequiredLookup = res;
        }
      },
        error => this.errorMessage = <any>error);

    this.lookUpService.getTypeOfAuditLKP()
     .subscribe(res => {
        if (res != null) {
          this.typeOfAuditLook = res;
        }
      },
        error => this.errorMessage = <any>error);

  }

  getcompleteAuditPlanQuestions() {

    this.auditServices.getcompleteAuditPlanQuestions()
      .subscribe(res => {
        if (res != null) {
          this.auditlistItems = res;
        } else {
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);
  }

  getDocumentGenerationLetter() {
    let audtDocLetter = new DocumentClass();
    audtDocLetter.CaseId = this.caseID;
    audtDocLetter.UploadedBy = this.systemUser.systemUserStorage.SID;
    audtDocLetter.DocumentType = "PCA_CI_Notification_of_Audit_Letter";

    this.auditServices.getDocumentGenerationLetter(audtDocLetter)
      .subscribe(res => {
        if (res != null) {
          this.documentItems = [];
          this.documentItems.push(res);
          // this.documentLetter = res;
        } else {
          swal("Letter not found", "", "info");
        }
      },
        error => this.errorMessage = <any>error);
  }

  saveCompletedAuditPlan() {
    console.log(this.audiDetails);
    this.auditServices.saveAuditPlan(this.audiDetails)
      .subscribe(res => {
        this.resultData = res;
        if (this.resultData == "1") {
          swal(
            'AuditPlan',
            'Audit Saved Successfully',
            'success'
          );
          this.onCancel();
        }

      },
        error => {
          this.errorMessage = <any>error;
          swal(
            'AuditPlan',
            this.errorMessage.toString(),
            'error'
          );
        });
  }

  onCancel() {
    this.storageDataAuditService.auditDataPlanStorage = null;
    this.router.navigate(['/dashboard']);
  }

  saveCompleteAuditPlanAllInOne() {

    this.auditServices.saveCompleteAuditPlanAllInOne(this.getAuditPlanResult())
      .subscribe(res => {
        this.resultData = res;
        if (this.resultData == "1") {
          swal(
            'AuditPlan',
            'Audit Saved Successfully',
            'success'
          );
          this.onCancel();
        }

      },
        error => {
          this.errorMessage = <any>error;
          swal(
            'AuditPlan',
            this.errorMessage.toString(),
            'error'
          );
        });

  }

  submitAuditPlan(){

    this.auditServices.submitAuditPlan(this.getAuditPlanResult())
    .subscribe(res => {
      this.resultData = res;
      if (this.resultData == "1") {
        swal(
          'AuditPlan',
          'Audit Plan Successfully Submitted for Approval',
          'success'
        );
        this.onCancel();
      }

    },
      error => {
        this.errorMessage = <any>error;
        swal(
          'AuditPlan',
          this.errorMessage.toString(),
          'error'
        );
      });

  }

  getAuditPlanResult(){
    let auditPlanResult = new AuditPlanResult();
    auditPlanResult.AuditDocuments = this.documentItems;
    auditPlanResult.AuditTemplate = this.audiDetails;
    auditPlanResult.CaseId = this.caseID;
    auditPlanResult.IsEdit = this.storageDataAuditService.auditDataPlanStorage == null ? false : true;
    auditPlanResult.CheckList = this.auditlistItems;

    return auditPlanResult;
  }

  //#endregion

  //#region Events Helpers

  onToggleChange(sender, value) {
    var booleanValue = value === 'Yes' ? true : false;
    this.audiDetails['' + sender + ''] = booleanValue

  }

  //#endregion

  //#region Letter Generation
  loadDoc(e, file) {

    const reader = new FileReader();
    reader.readAsDataURL(file);
    return Observable.create(observer => {
      reader.onloadend = () => {
        observer.next(reader.result);
        observer.complete();
      };
    });
  }

  uploadFile(event: any) {
    let file = event.target.files;

    for (var index = 0; index < file.length; index++) {
      var fName = file[index].name;
      var fSize = file[index].size;
      let doc = new DocumentClass;
      this.loadDoc(event, file[index]).subscribe((f) => {
        doc.DocumentContent = f;
        doc.FileName = fName;
        doc.FileSize = fSize;
      });
      this.documentItems.push(doc);
    }
  }

  removeDocument(index) {

    this.documentItems.splice(index, 1);
  }

  viewDocument(index) {
    var document = this.documentItems[index];
    var documentContent = document.DocumentContent;

    if (documentContent.toString() !== '' && documentContent !== undefined) {
      var result = this.dvservice.getpdfdocument(documentContent.toString());
      window.open(result);
    }
    else {
      alert('Document Did not load Properly');
    }
  }

  viewVddl(){
    this.router.navigate(['/viewvddl',{view:"auditPlan",data:this.caseID }]);
  }
  //#endregion

}
