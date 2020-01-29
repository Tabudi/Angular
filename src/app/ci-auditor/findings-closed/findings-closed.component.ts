import { Component, OnInit } from '@angular/core';
import { CiManagerService } from 'app/ci-manager/ci-manager.service';
import { SystemUserProviderService } from 'app/system-user-provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuditPlanProviderService } from '../../providers/audit-plan-provider.service';

@Component({
  selector: 'app-findings-closed',
  templateUrl: './findings-closed.component.html',
  styleUrls: ['./findings-closed.component.scss']
})
export class FindingsClosedComponent implements OnInit {

  auditItems: Array<any> = [];
  errorMessage: String;
  windowLabel: String = "Audit Findings Finalized";

  constructor(private ciManageService: CiManagerService, private systemUser: SystemUserProviderService, private _router: ActivatedRoute,
     private router: Router, private auditplanData: AuditPlanProviderService) { }


  ngOnInit() {
    this.getAllFinalizedFindings();
  }

  getAllFinalizedFindings() {

    this.ciManageService.getAllFinalizedFindings()
      .subscribe(res => {
        if (res != null) {
          this.auditItems = res;
        } else {
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);
  }


  executeFindings(auditItem) {
    auditItem.PlanStage = "Audit Findings Finalized and Closed";
    this.auditplanData.auditPlanStroage = auditItem;
    this.router.navigate(['/auditplanworrework']);
  }
}
