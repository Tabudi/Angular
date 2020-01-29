import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { DocumentUploadComponent } from './document-upload.component';
import {DocumentUploadComponent} from 'app/shared-modules/document-upload/document-upload.component';


@NgModule({
  imports: [
    CommonModule
  ],
  exports:[DocumentUploadComponent],
  declarations: [DocumentUploadComponent]
})
export class DocumentUploadModule { }