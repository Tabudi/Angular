import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsViewComponent } from './comments-view/comments-view.component';
import { CommentsViewDataService } from './comments-view-data.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CommentsViewComponent],
  exports : [CommentsViewComponent],
  providers: [CommentsViewDataService]  
})

export class CommentsViewModule { }
