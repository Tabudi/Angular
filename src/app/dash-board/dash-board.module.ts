import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { DashboardServiceService } from './dashboard-service.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DashBoardComponent],
  providers: [DashboardServiceService]
})
export class DashBoardModule { }
