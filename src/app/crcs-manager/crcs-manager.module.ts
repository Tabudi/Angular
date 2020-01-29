import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaApprovalComponent } from './ra-approval/ra-approval.component';
import { RaApprovalRejectionComponent } from './ra-approval-rejection/ra-approval-rejection.component';
import { RaApprovalScreenComponent } from './ra-approval-screen/ra-approval-screen.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RaApprovalComponent, RaApprovalRejectionComponent, RaApprovalScreenComponent]
})
export class CrcsManagerModule { }
