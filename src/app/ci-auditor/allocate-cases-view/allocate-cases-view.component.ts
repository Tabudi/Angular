import { Component, OnInit } from '@angular/core';
import { AuditorTemplateService } from '../auditor-template.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { AuditDataproviderService } from '../audit-dataprovider-service.service';

@Component({
  selector: 'app-allocate-cases-view',
  templateUrl: './allocate-cases-view.component.html',
  styleUrls: ['./allocate-cases-view.component.scss']
})
export class AllocateCasesViewComponent implements OnInit {

  filteredvddlDetails:Array<any>[];
  vddlItems:Array<any>;
  errorMessage:String;
  whichLinkWasclicked:String;
  windowLabel:String;

  constructor(private auditservice:AuditorTemplateService ,private ActivatedRouter: ActivatedRoute ,private router: Router, private systemUser: SystemUserProviderService, private storageData:AuditDataproviderService) { 
   // find out which link was clicked
    this.whichLinkWasclicked = ActivatedRouter.snapshot.data["link"];
  }

  ngOnInit() {
    if(this.whichLinkWasclicked =="AuditWorkprogressVddl"){
      this.getAuditTemplateWIP();
        
    }
    if(this.whichLinkWasclicked =="AuditAllocationVddl"){
      this.windowLabel = "Allocated Cases";
      this.getCompleteAuditPlanList();
        
    }
    // if(this.whichLinkWasclicked =="AuditApprovedVddl"){
    //     this.getManagerAllocatedVDDL()
    // }
   
  }
  getCompleteAuditPlanList(){
    this.auditservice.getCompleteAuditPlanList()
    .subscribe(res => {
      if (res != null) { 
        this.vddlItems = res;
      } else {
        swal("No Records Found!", "", "info");
      }
    },
    error => this.errorMessage = <any>error);

  }

  getManagerAllocatedVDDL(){
    this.auditservice.getManagerAllocatedVDDL()
    .subscribe(res => {
      if (res != null) { 
        this.vddlItems = res;
      } else {
        swal("No Records Found!", "", "info");
      }
    },
    error => this.errorMessage = <any>error);

  }

  getAuditTemplateWIP(){
    this.auditservice.getAuditTemplateWIP()
    .subscribe(res => {
      if (res != null) { 
        this.vddlItems = res;
      } else {
        swal("No Records Found!", "", "info");
      }
    },
    error => this.errorMessage = <any>error);

  }

  createAudit(audit){
    this.storageData.auditDataStorage = audit;
    this.storageData.auditDataPlanStorage = null;
    this.router.navigate(['/createauditplan']);
    
  }

}
