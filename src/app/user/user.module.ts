import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivityreportComponent } from './activityreport.component';
import { UserWorkingprogressComponent } from './user-workingprogress/user-workingprogress.component';
import { UserService } from 'app/user/user.service';
import { SarProvider } from 'app/user/sar-provider';
import { CommentsViewModule } from '../shared-modules/comments-view/comments-view.module';
import { DocumentUploadModule } from '../shared-modules/document-upload/document-upload.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DocumentUploadModule,
    CommentsViewModule
  ],

  declarations: [ActivityreportComponent, UserWorkingprogressComponent],

  providers:[UserService,SarProvider]
  
})

export class UserModule { }