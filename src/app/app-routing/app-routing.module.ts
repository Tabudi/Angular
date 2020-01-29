import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashBoardComponent } from 'app/dash-board/dash-board/dash-board.component';
import { ClientInterfaceComponent } from 'app/client-interface/client-interface/client-interface.component';
import { AuditplanComponent } from 'app/ci-auditor/auditplan.component';
import { ActivityreportComponent } from 'app/user/activityreport.component';
import { WorkinprogressComponent } from 'app/client-interface/workinprogress/workinprogress.component';
import { UserWorkingprogressComponent } from 'app/user/user-workingprogress/user-workingprogress.component';
import { RiskasessmentComponent } from 'app/crcs-specialist/riskasessment/riskasessment.component';
import { CrcsworkinprogressComponent } from 'app/crcs-specialist/crcsworkinprogress/crcsworkinprogress.component';
import { ErrorViewComponent } from '../error-view/error-view.component';
import { AdminViewComponent } from 'app/admin/admin-view/admin-view.component';
import { CiManagerComponent } from '../ci-manager/ci-manager/ci-manager.component';
import { AllocateCasesViewComponent } from '../ci-auditor/allocate-cases-view/allocate-cases-view.component';
import { DocumentUploadComponent } from 'app/shared-modules/document-upload/document-upload.component';
import { AuditPlanWorkinprogressComponent } from '../ci-auditor/workinprogress/AuditPlanWorkinprogress.component';
import { AuditApprovalsComponent } from '../ci-manager/audit-approvals/audit-approvals.component';
import { AuditorReworkComponent } from '../ci-auditor/auditor-rework/auditor-rework.component';
import { RaApprovalComponent } from '../crcs-manager/ra-approval/ra-approval.component';
import { ApprovedAuditsPlanComponent } from '../ci-auditor/approved-audits-plan/approved-audits-plan.component';
import { RaApprovalScreenComponent } from '../crcs-manager/ra-approval-screen/ra-approval-screen.component';
import { SearchComponent } from '../search/search-view/search-view.component';
import { FindingsApprovalsComponent } from '../ci-auditor/findings-approvals/findings-approvals.component';
import { FundingsApprovedComponent } from '../ci-auditor/fundings-approved/fundings-approved.component';
import { FindingsLettersComponent } from '../ci-auditor/findings-letters/findings-letters.component';
import { FindingsRejectedComponent } from '../ci-auditor/findings-rejected/findings-rejected.component';
import { FindingsReworkComponent } from '../ci-auditor/findings-rework/findings-rework.component';
import { FindingsApprovalsLetterComponent } from '../ci-manager/findings-approvals-letter/findings-approvals-letter.component';
import { FindingsClosedComponent } from '../ci-auditor/findings-closed/findings-closed.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([

      { path: 'dashboard', component: DashBoardComponent },
      { path: 'createvddl', component: ClientInterfaceComponent },
      { path: 'createauditplan', component: AuditplanComponent },

      { path: 'createsar', component: ActivityreportComponent },
      { path: 'editsar', component: ActivityreportComponent },
      { path: "sarworkinprogress", component: UserWorkingprogressComponent },

      { path: 'editvddl', component: ClientInterfaceComponent },
      { path: 'viewvddl', component: ClientInterfaceComponent },
      { path: 'vddlworkinprogress', component: WorkinprogressComponent },
      { path: 'createauditplan', component: AuditplanComponent },
      { path: 'cimanagerAllocate', component: CiManagerComponent ,data:{role: 'Allocate'}},
      { path: 'cimanagerReallocate', component: CiManagerComponent,data:{role: 'ReAllocate'} },
      { path: 'cimanagerAuditApproval', component: AuditApprovalsComponent,data:{role: 'AuditApproval'} },
      { path: 'auditplanworkinprogress', component: AuditPlanWorkinprogressComponent },
      { path: 'auditplanworrework', component: AuditorReworkComponent },
      { path: 'auditallocation', component: AllocateCasesViewComponent,data:{link: 'AuditAllocationVddl'} },
      { path: 'auditapproved', component: ApprovedAuditsPlanComponent ,data:{link: 'AuditApprovedVddl'}},
      { path: 'findingsApproval', component: FindingsApprovalsComponent,data:{link: 'findingsApproval'} },
      { path: 'findingsApproved', component: FundingsApprovedComponent, data: { link: 'findingsApproved' } },

      { path: 'findingsrework', component: FindingsReworkComponent, data: { link: 'findingsrework' } },
      { path: 'findingsrejected', component: FindingsRejectedComponent, data: { link: 'findingsrejected' } },
      { path: 'findingsletters', component: FindingsLettersComponent, data: { link: 'findingsletters' } },
      { path: 'findingsApprveletters', component: FindingsApprovalsLetterComponent, data: { link: 'findingsApprveletters' } },
      { path: 'findingsclosed', component: FindingsClosedComponent, data: { link: 'findingsclosed' } },


      { path: 'admin', component: AdminViewComponent },

      { path: 'createcrcs', component: RiskasessmentComponent },
      { path: 'crcrcsworkinprogresscs', component: CrcsworkinprogressComponent },
      { path: 'raaproval', component: RaApprovalComponent },
      { path: 'raaprovalscreen', component: RaApprovalScreenComponent },
      { path: 'search', component: SearchComponent},
      // { path: 'errorpage', component: ErrorViewComponent },
      /*Always at the bottom */
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ])
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
