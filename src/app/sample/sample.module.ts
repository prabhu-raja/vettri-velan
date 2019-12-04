import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleBoardComponent } from './sample-board/sample-board.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 { path: '', component: SampleBoardComponent }
];

@NgModule({
  declarations: [
    SampleBoardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SampleModule { }
