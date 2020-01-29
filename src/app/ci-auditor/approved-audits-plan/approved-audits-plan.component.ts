import { Component, OnInit } from '@angular/core';
import { CiManagerService } from 'app/ci-manager/ci-manager.service';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { ActivatedRoute, Router } from '@angular/router';

import  swal  from 'sweetalert2';
import { AuditPlanProviderService } from '../../providers/audit-plan-provider.service';


@Component({
  selector: 'app-approved-audits-plan',
  templateUrl: './approved-audits-plan.component.html',
  styleUrls: ['./approved-audits-plan.component.scss']
})
export class ApprovedAuditsPlanComponent implements OnInit {
  auditItems:Array<any> = [];
  errorMessage:String;
  windowLabel:String = "Approved Plans";



  constructor(private ciManageService: CiManagerService, private systemUser: SystemUserProviderService, private _router: ActivatedRoute, private router: Router, private auditplanData:AuditPlanProviderService) { }

  ngOnInit() {
    this. getAllAuditPlansForApproval();
  }

  getAllAuditPlansForApproval(){

    this.ciManageService.getAllApprovedAuditPlans()
    .subscribe(res => {
      if (res != null) {
        this.auditItems = res;
      } else {
        swal("No Records Found!", "", "info");
      }
    },
      error => this.errorMessage = <any>error);
  }

  executeFindings(auditItem){
       auditItem.PlanStage = "Execute Audit Case Findings";
      this.auditplanData.auditPlanStroage = auditItem;
      this.router.navigate(['/auditplanworrework']);
  }
}
