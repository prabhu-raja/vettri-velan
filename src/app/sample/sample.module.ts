import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppSharedModule } from '../app-shared/app-shared.module';
import { SampleBoardComponent } from './sample-board/sample-board.component';
import { BoardMemberComponent } from './board-member/board-member.component';
import { SampleActivateGuard } from '../app-shared/guards/sample-activate.guard';
import { HolderListComponent } from './board-member/holders/holder-list/holder-list.component';
import { HolderLandingComponent } from './board-member/holders/holder-landing/holder-landing.component';

const routes: Routes = [
 { path: '', component: SampleBoardComponent },
 { path: 'members', canActivate: [SampleActivateGuard], component: BoardMemberComponent },
 {
   path: 'holders',
   component: HolderLandingComponent,
   children: [
     {
       path: 'list',
       component: HolderListComponent
     }
   ]
 }
];

@NgModule({
  declarations: [
    SampleBoardComponent,
    BoardMemberComponent,
    HolderListComponent,
    HolderLandingComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SampleModule { }
