import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { UserAdminService } from './user-admin.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  providers:[UserAdminService],
  declarations: [AdminViewComponent]
})
export class AdminModule { }
