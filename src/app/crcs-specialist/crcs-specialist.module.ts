import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RiskasessmentComponent } from './riskasessment/riskasessment.component';
import { RiskAssessmentService } from 'app/crcs-specialist/risk-assessment.service';
import { DataProvider } from 'app/crcs-specialist/provider/data-provider';
import { CrcsworkinprogressComponent } from './crcsworkinprogress/crcsworkinprogress.component';
import { DocumentUploadModule } from '../shared-modules/document-upload/document-upload.module';
import { CommentsViewModule } from '../shared-modules/comments-view/comments-view.module';
// import { DocumentUploadComponent } from '../shared-modules/document-upload/document-upload.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DocumentUploadModule,
    CommentsViewModule
  ],
  declarations: [RiskasessmentComponent, CrcsworkinprogressComponent
  ],
  providers: [RiskAssessmentService, DataProvider]
})
export class CrcsSpecialistModule { }
