import { Component, OnInit } from '@angular/core';
import { AuditorTemplateService } from '../auditor-template.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { AuditDataproviderService } from '../audit-dataprovider-service.service';
import { AuditorClass } from '../auditor-class';

@Component({
  selector: 'app-workinprogress',
  templateUrl: './AuditPlanWorkinprogress.component.html',
  styleUrls: ['./AuditPlanWorkinprogress.component.scss']
})
export class AuditPlanWorkinprogressComponent implements OnInit {

  caseID: any;
  auditPlans: Array<any>[];
  errorMessage: String;
  windowLabel:String;

  constructor(private auditServices: AuditorTemplateService, private router: Router,
    private storageDataAuditService: AuditDataproviderService,
    private storageData: AuditDataproviderService ) {
    this.getWorkInProgressAuditPlans();
  }

  ngOnInit() {
 
   this.windowLabel = "Saved Audit Plans";
   this.storageDataAuditService.auditDataPlanStorage = null;
  }

  
  getWorkInProgressAuditPlans() {
    this.auditServices.getAuditWorkInProgressPForms()
      .subscribe(res => {
        if (res != null) {
          this.auditPlans = res;
        } else {
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);
  }

  EditAuditPlan(auditPlan){
    this.storageData.auditDataPlanStorage = auditPlan;
    this.router.navigate(['/createauditplan']);

  }
}
