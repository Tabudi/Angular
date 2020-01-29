import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientInterfaceComponent } from './client-interface/client-interface.component';
import { WorkinprogressComponent } from './workinprogress/workinprogress.component';
import { VdDlDataService } from 'app/client-interface/vd-dl-data.service';
import { vddlDataProvider } from 'app/client-interface/provider/data-provider';

import { DocumentUploadModule } from '../shared-modules/document-upload/document-upload.module';
import { CommentsViewModule } from '../shared-modules/comments-view/comments-view.module';
import { PendCaseModule } from "app/shared-services/pend-case/pend-case-module";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DocumentUploadModule,
    CommentsViewModule,
    PendCaseModule
  ],
  declarations: [ClientInterfaceComponent, WorkinprogressComponent],
  providers:[VdDlDataService,vddlDataProvider]
})
export class ClientInterfaceModule { }
