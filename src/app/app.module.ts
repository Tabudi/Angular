import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }  from '@angular/forms';
import { HttpModule } from '@angular/http';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { DashBoardModule } from './dash-board/dash-board.module';
import { SidenavComponent } from 'app/layout/sidenav/sidenav.component';
import { ClientInterfaceModule } from './client-interface/client-interface.module';
import { HeaderComponent } from './layout/header/header/header.component';
import { CiAuditorModule } from 'app/ci-auditor/ci-auditor.module';
import { UserModule } from 'app/user/user.module';
import { CrcsSpecialistModule } from 'app/crcs-specialist/crcs-specialist.module';
/*import { PagerService } from './pager.service';
import { UpdateDatagridService } from './update-datagrid.service';
import { AuthenticationService } from './authentication.service';*/


import { ErrorViewComponent } from './error-view/error-view.component';
import { SystemUserProviderService } from './system-user-provider.service';
import { AdminModule } from './admin/admin.module';
import { CiManagerModule } from 'app/ci-manager/ci-manager.module';
import { CiAuditorManagerModule } from 'app/ci-auditor-manager/ci-auditor-manager.module';
import { UpdateDatagridService } from './shared-services/update-datagrid.service';
import { AuthenticationService } from './shared-services/authentication.service';
import { DocumentViewerService } from './shared-services/document-viewer-service';
import { SearchDataService } from './search/search-data.service';

import { PagerService } from './shared-services/pager.service';
import { SepcialCharacterDirective } from './directives/sepcial-character.directive';
import {LookUpService} from 'app/lookUp/lookup.service';

import { DocumentUploadProviderService } from './providers/document-upload-provider.service';
import { CommentsViewDataService } from "app/shared-modules/comments-view/comments-view-data.service";
import { AllocateViewService } from 'app/shared-modules/allocate/allocate-view.service';
import { DocumentUploadModule } from './shared-modules/document-upload/document-upload.module';
import { AuditPlanProviderService } from './providers/audit-plan-provider.service';
import { CrcsManagerModule } from './crcs-manager/crcs-manager.module';
import { SearchComponent } from './search/search-view/search-view.component';
import { PendCaseDataService } from "app/shared-services/pend-case/pend-case-data.service";
import { IncometaxValidationService } from './shared-services/validations/incometax-validation.service';
import { VatValidationService } from './shared-services/validations/vat-validation.service';
import { FieldLengthDirective } from './directives/field-length.directive';




@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HeaderComponent,
    ErrorViewComponent,
    SepcialCharacterDirective,
    SearchComponent,
    FieldLengthDirective,
   // AllocateViewComponent    
  ],

  exports: [
    DocumentUploadModule,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    DocumentUploadModule,
    DashBoardModule,
    ClientInterfaceModule,
    CiAuditorModule,
    CiAuditorManagerModule,
    UserModule,
    CrcsSpecialistModule,
    AdminModule,
    CiManagerModule,
    CrcsManagerModule,
    //Always at the bottom
    AppRoutingModule  
  
  ],
  providers: [PagerService, 
              UpdateDatagridService, 
              AuthenticationService, 
              SystemUserProviderService,
              DocumentViewerService,
              LookUpService,
              DocumentUploadProviderService,
              CommentsViewDataService,
              AllocateViewService,
              AuditPlanProviderService,
              SearchDataService,
              PendCaseDataService,
              IncometaxValidationService,
              VatValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
