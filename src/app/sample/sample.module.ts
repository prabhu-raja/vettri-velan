import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppSharedModule } from '../app-shared/app-shared.module';
import { SampleBoardComponent } from './sample-board/sample-board.component';
import { BoardMemberComponent } from './board-member/board-member.component';
import { SampleActivateGuard } from '../app-shared/guards/sample-activate.guard';

const routes: Routes = [
 { path: '', component: SampleBoardComponent },
 { path: 'members', canActivate: [SampleActivateGuard], component: BoardMemberComponent }
];

@NgModule({
  declarations: [
    SampleBoardComponent,
    BoardMemberComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SampleModule { }
