import { Component, OnInit } from '@angular/core';
import { DocumentClass } from './document-class';
import { IDocumentInterface } from './document-interface';
import { DocumentViewerService} from 'app/shared-services/document-viewer-service';
import { Observable } from "rxjs/Observable";
import { DocumentUploadProviderService } from "app/providers/document-upload-provider.service";
import { SystemUserProviderService } from "app/system-user-provider.service";

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})


export class DocumentUploadComponent implements OnInit {

  documentItems: Array<any> = new Array();
  createdCaseId:String;

  constructor(private dvservice: DocumentViewerService, private uploadedDocs:DocumentUploadProviderService, private systemUser:SystemUserProviderService) { }

  ngOnInit() { 
  if(this.uploadedDocs.documentUploadStroage != null){
    this.createdCaseId = this.uploadedDocs.documentUploadStroage[0].CaseId;
      if(this.uploadedDocs.documentUploadStroage.length > 0){
        this.documentItems =  this.uploadedDocs.documentUploadStroage;
      }else{
  
        this.documentItems.push(this.uploadedDocs.documentUploadStroage);      
      }
    }
  
  }

  loadDoc(e, file) {
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return Observable.create(observer => {
      reader.onloadend = () => {
        observer.next(reader.result);
        observer.complete();
      };
    });
  }  

  uploadFile(event: any) {
    let file = event.target.files;
    
    for (var index = 0; index < file.length; index++) {
        var fName = file[index].name;
        var fSize = file[index].size;

        let doc = new DocumentClass;  
        doc.FileName = fName;
        doc.FileSize = fSize;
        this.loadDoc(event, file[index]).subscribe((f) => {
          doc.DocumentContent = f;        
        });
        if( this.createdCaseId != null ){
          doc.CaseId = this.createdCaseId
        }else{
          doc.CaseId = null;
        }
        this.documentItems.push(doc);
       
    }
    this.uploadedDocs.documentUploadStroage = this.documentItems;

  }

  removeDocument(index) {
    
    this.documentItems.splice(index,1);
  }

  getDocumentData (observable) {
     
  }
  viewDocument(index) {
    var document = this.documentItems[index];
    var documentContent = document.DocumentContent;
    
    if (documentContent.toString() !== '' && documentContent !== undefined){
    var result = this.dvservice.getpdfdocument(documentContent.toString());
    window.open(result);
    }
    else
      { 
        alert('Document Did not load Properly');
      }
  }

} 
