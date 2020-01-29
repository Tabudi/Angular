import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { AuditplanComponent } from './auditplan.component';
import { AllocateCasesViewComponent } from './allocate-cases-view/allocate-cases-view.component';
import { AuditorTemplateService } from './auditor-template.service';
import { AuditDataproviderService } from './audit-dataprovider-service.service';
import { ApprovedAuditsPlanComponent } from './approved-audits-plan/approved-audits-plan.component';
import { AuditPlanWorkinprogressComponent } from './workinprogress/AuditPlanWorkinprogress.component';
import { AuditorReworkComponent } from './auditor-rework/auditor-rework.component';
// import { DocumentUploadComponent } from 'app/shared-modules/document-upload/document-upload.component'
import { CommentsViewModule } from '../shared-modules/comments-view/comments-view.module';
import { FindingsApprovalsComponent } from './findings-approvals/findings-approvals.component';
import { FundingsApprovedComponent } from './fundings-approved/fundings-approved.component';
import { FindingsLettersComponent } from './findings-letters/findings-letters.component';
import { FindingsReworkComponent } from './findings-rework/findings-rework.component';
import { FindingsRejectedComponent } from './findings-rejected/findings-rejected.component';
import { FindingsClosedComponent } from './findings-closed/findings-closed.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CommentsViewModule
  ],
  declarations: [AuditplanComponent, AllocateCasesViewComponent, AuditPlanWorkinprogressComponent,
                 AuditorReworkComponent, ApprovedAuditsPlanComponent, FindingsApprovalsComponent, FundingsApprovedComponent, FindingsLettersComponent, FindingsReworkComponent, FindingsRejectedComponent, FindingsClosedComponent],
  providers:[AuditorTemplateService, AuditDataproviderService]

})
export class CiAuditorModule { }
