import { Component, OnInit } from '@angular/core';
import { AuditorTemplateService } from '../auditor-template.service';
import { LookUpService } from 'app/lookUp/lookup.service';
import { IAuditRequiredLKP, ITypeOfAuditLKP, IVddlLKP } from 'app/lookUp/lookup-interfaces';

import swal from 'sweetalert2';
import { AuditorClass, AuditPlanResult, CheckList } from '../auditor-class';
import { LookupAddress } from 'dns';
import { isError } from 'util';
import { DocumentUploadProviderService } from '../../providers/document-upload-provider.service';
import { Observable } from 'rxjs/Observable';
import { DocumentClass } from '../../shared-modules/document-upload/document-class';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { DocumentViewerService } from '../../shared-services/document-viewer-service';
import { AuditDataproviderService } from '../audit-dataprovider-service.service';
import { AuditPlanProviderService } from '../../providers/audit-plan-provider.service';
import { CommentsViewDataService } from '../../shared-modules/comments-view/comments-view-data.service';
import { CommentsViewComponent } from 'app/shared-modules/comments-view/comments-view/comments-view.component';
import { DebugAppView } from '@angular/core/src/linker/view';


@Component({
  selector: 'app-auditor-rework',
  templateUrl: './auditor-rework.component.html',
  styleUrls: ['./auditor-rework.component.scss']
})
export class AuditorReworkComponent implements OnInit {
  caseID: any;
  auditlistItems: Array<any>[];
  hierarchMenuItems = [];
  errorMessage: String;
  audiDetails: AuditorClass = new AuditorClass();
  toggleCollection = [];
  resultData: any;
  vDLookup: Array<IVddlLKP>[];
  auditRequiredLookup: Array<IAuditRequiredLKP>[];
  typeOfAuditLook: Array<ITypeOfAuditLKP>[];
  documentLetter: any;
  documentItems: Array<any> = new Array();
  commentsCaseId: String = '';
  repData: any;
  windowLabel: String;

  constructor(private auditServices: AuditorTemplateService, private lookUpService: LookUpService,
    private storageDataAuditService: AuditDataproviderService, private dvservice: DocumentViewerService,
    private router: Router, private systemUser: SystemUserProviderService, private auditplanData: AuditPlanProviderService
    , private notesService: CommentsViewDataService) {

    this.getLookUpData();
  }

  ngOnInit() {
    this.toggleCollection = [{ Value: true, DisplayText: 'Yes' }, { Value: false, DisplayText: 'No' }];

    let _opendAuditPlan = this.auditplanData.auditPlanStroage;
    let _auditDataStorage = this.storageDataAuditService.auditDataStorage;

    if (_auditDataStorage) {
      this.caseID = _auditDataStorage.VddlDetails.CaseId;
      this.commentsCaseId = _auditDataStorage.VddlDetails.CaseId;
    }

    if (_opendAuditPlan) {
      this.documentItems = _opendAuditPlan.AuditDocuments; // documents
      this.audiDetails = _opendAuditPlan.AuditTemplate; // the actual template
      this.auditlistItems = _opendAuditPlan.CheckList; // these are checklist items.
      this.caseID = _opendAuditPlan.CaseId;
      this.commentsCaseId = _opendAuditPlan.CaseId;
      this.windowLabel = _opendAuditPlan.PlanStage;

     // if(_opendAuditPlan.PlanStage  == "Execute Audit Case Findings")
      if (_opendAuditPlan.PlanStage != 'Audit Case Approval')
      {
        try {

        var lastKnownParentOrder = null;
        var lastKnownParentIndex = 0;
        
        this.hierarchMenuItems = [];
        var self = this;

        _opendAuditPlan.CheckList.forEach(function (menuItem, index) {
         if(index !== 0 && menuItem.SortOrder < lastKnownParentOrder)
         {

          if(menuItem.SortOrder === 1)
          {
            self.hierarchMenuItems[lastKnownParentIndex - 1].ChildMenuItems = [];
            self.hierarchMenuItems[lastKnownParentIndex - 1].Expandable = true;
          }
            self.hierarchMenuItems[lastKnownParentIndex - 1].ChildMenuItems.push(menuItem);
         }

         else {

          lastKnownParentOrder = menuItem.SortOrder;
          lastKnownParentIndex = lastKnownParentIndex + 1;
            self.hierarchMenuItems.push(menuItem);
         }

        });

        } catch (error) {
             swal("CheckListError", "Could not build question menu","error");
        }

      }

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


  getDocumentGenerationLetter(letterType) {
    let audtDocLetter = new DocumentClass();
    audtDocLetter.CaseId = this.caseID;
    audtDocLetter.UploadedBy = this.systemUser.systemUserStorage.SID;
    audtDocLetter.DocumentType = letterType;

    this.auditServices.getDocumentGenerationLetter(audtDocLetter)
      .subscribe(res => {
        if (res != null) {
          this.documentItems.push(res);
          // this.documentLetter = res;
        } else {
          swal("Letter not found", "", "info");
        }
      },
        error => this.errorMessage = <any>error);
  }


  onCancel() {
    this.storageDataAuditService.auditDataPlanStorage = null;
    this.router.navigate(['/dashboard']);
  }


  ReworkPlan() {
    this.auditServices.submitReworkPlan(this.getAuditPlanResult())
      .subscribe(res => {
        this.resultData = res;
        if (this.resultData == "1") {
          swal(
            'AuditPlan',
            'Audit submitted for rework',
            'success'
          );
          this.onCancel();
        }

        else {
          swal(
            'AuditPlan',
            'failed to submit audit plan for rework - ' + res,
            'error'
          );
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

  ApprovePlan() {

    this.auditServices.submitApprovePlan(this.getAuditPlanResult())
      .subscribe(res => {
        this.resultData = res;
        if (this.resultData == "1") {
          swal(
            'AuditPlan',
            'Audit Plan Successfully Approved',
            'success'
          );
          this.onCancel();
        }

        else {
          swal(
            'AuditPlan',
            'failed to submit audit plan for approval - ' + res,
            'error'
          );
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
  RejectPlan() {
    this.auditServices.submitRejectPlan(this.getAuditPlanResult())
      .subscribe(res => {
        this.resultData = res;
        if (this.resultData == "1") {
          swal(
            'AuditPlan',
            'Audit Plan Successfully Rejected',
            'success'
          );
          this.onCancel();
        }

        else {
          swal(
            'AuditPlan',
            'failed to submit audit plan for rejection - ' + res,
            'error'
          );
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


  onAddNote() {
    this.commentsCaseId = null;
    swal({
      input: 'textarea',
      title: 'Add Note',
      showCancelButton: true,
      confirmButtonText: 'Save Note'
    }).then((result) => {
      if (result.value) {
        this.notesService.savenote(this.caseID, result.value)
          .subscribe(res => {
            console.log(res);
            this.repData = res;
            if (this.repData != "0") {
              swal(
                'Record',
                'Note Saved Successfully',
                'success'
              );
              this.commentsCaseId = this.caseID;
            }
          }, error => swal('Did not Save', <any>error, 'error')
          )
      } else {
        this.commentsCaseId = this.caseID;
      }
    });
  }

  getAuditPlanResult() {
    let auditPlanResult = new AuditPlanResult();
    auditPlanResult.AuditDocuments = this.documentItems;
    auditPlanResult.AuditTemplate = this.audiDetails;
    auditPlanResult.CaseId = this.caseID;
    auditPlanResult.IsEdit = this.storageDataAuditService.auditDataPlanStorage == null ? false : true;

    if(this.windowLabel  === "Execute Audit Case Findings")
    {
      auditPlanResult.CheckList = [];
       this.hierarchMenuItems.forEach(element => {
        auditPlanResult.CheckList.push(element);

         if(element.ChildMenuItems && element.ChildMenuItems.length > 0)
         {
           element.ChildMenuItems.forEach(childElement => {
            auditPlanResult.CheckList.push(childElement);
           });
         }
       });
    }
    else{
      auditPlanResult.CheckList = this.auditlistItems;
    }

    return auditPlanResult;
  }


  //#endregion

  
  //#region Execute Findigs

  ReportCheckList() {
     

  }

  SaveFindings() {
      

  }

  SubmitExecuteReview() {
    this.auditServices.submitExecuteReview(this.getAuditPlanResult())
    .subscribe(res => {
      this.resultData = res;
      if (this.resultData == "1") {
        swal(
          'Execute Findings',
          'Execute findings successfully submitted',
          'success'
        );
        this.onCancel();
      }

      else
      {
        swal(
          'Execute Findings',
          'Failed to submit findings - ' + res ,
          'error'
        );
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

  //#endregion


  //#region Review Findings
    
  ReworkFindings() {

    this.auditServices.reworkFindings(this.getAuditPlanResult())
      .subscribe(res => {
        this.resultData = res;
        if (this.resultData == "1") {
          swal(
            'Execute Findings',
            'Audit case findings successfully reworked',
            'success'
          );
          this.onCancel();
        }

        else {
          swal(
            'Execute Findings',
            'Failed to submit findings - ' + res,
            'error'
          );
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

  AcceptFindings() {
    this.auditServices.acceptFindings(this.getAuditPlanResult())
      .subscribe(res => {
        this.resultData = res;
        if (this.resultData == "1") {
          swal(
            'Execute Findings',
            'Audit case findings successfully submitted',
            'success'
          );
          this.onCancel();
        }

        else {
          swal(
            'Execute Findings',
            'Failed to submit findings - ' + res,
            'error'
          );
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

  SubmitApproveIntentLetter(){
    this.auditServices.SubmitApproveIntentLetter(this.getAuditPlanResult())
    .subscribe(res => {
      this.resultData = res;
      if (this.resultData == "1") {
        swal(
          'Execute Findings',
          'Audit case findings successfully submitted',
          'success'
        );
        this.onCancel();
      }

      else {
        swal(
          'Execute Findings',
          'Failed to submit findings - ' + res,
          'error'
        );
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

    SubmitDemandIntentLetter()
    {
      this.auditServices.SubmitApproveDemandLetter(this.getAuditPlanResult())
      .subscribe(res => {
        this.resultData = res;
        if (this.resultData == "1") {
          swal(
            'Execute Findings',
            'Audit case findings successfully submitted',
            'success'
          );
          this.onCancel();
        }
  
        else {
          swal(
            'Execute Findings',
            'Failed to submit findings - ' + res,
            'error'
          );
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
  
      ApproveDemandLetter() {
    this.auditServices.ApproveDemandLetter(this.getAuditPlanResult())
    .subscribe(res => {
      this.resultData = res;
      if (this.resultData == "1") {
        swal(
          'Execute Findings',
          'Audit case findings successfully submitted',
          'success'
        );
        this.onCancel();
      }

      else {
        swal(
          'Execute Findings',
          'Failed to submit findings - ' + res,
          'error'
        );
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

  ApproveIntentLetter() {

    this.auditServices.ApproveIntentLetter(this.getAuditPlanResult())
    .subscribe(res => {
      this.resultData = res;
      if (this.resultData == "1") {
        swal(
          'Execute Findings',
          'Audit case findings successfully submitted',
          'success'
        );
        this.onCancel();
      }

      else {
        swal(
          'Execute Findings',
          'Failed to submit findings - ' + res,
          'error'
        );
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

  RejectFindings() {
    
    this.auditServices.rejectFindings(this.getAuditPlanResult())
      .subscribe(res => {
        this.resultData = res;
        if (this.resultData == "1") {
          swal(
            'Execute Findings',
            'Audit case findings successfully rejected',
            'success'
          );
          this.onCancel();
        }

        else {
          swal(
            'Execute Findings',
            'Failed to submit findings - ' + res,
            'error'
          );
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
  //#endregion



  //#region FinalizeFindings

   finalizeFindings(){

     this.auditServices.finalizeFindings(this.getAuditPlanResult())
       .subscribe(res => {
         this.resultData = res;
         if (this.resultData == "1") {
           swal(
             'Execute Findings',
             'Audit case findings successfully finalized',
             'success'
           );
           this.onCancel();
         }

         else {
           swal(
             'Execute Findings',
             'Failed to submit findings - ' + res,
             'error'
           );
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

   CloseFindings() {
    this.auditServices.closeFindings(this.getAuditPlanResult())
    .subscribe(res => {
      this.resultData = res;
      if (this.resultData == "1") {
        swal(
          'Execute Findings',
          'Audit case findings successfully finalized',
          'success'
        );
        this.onCancel();
      }

      else {
        swal(
          'Execute Findings',
          'Failed to submit findings - ' + res,
          'error'
        );
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
  //#endregion


  viewVddl(){
    this.router.navigate(['/viewvddl',{view:"approvedauditplansview",data:this.caseID }]);
  }

}
