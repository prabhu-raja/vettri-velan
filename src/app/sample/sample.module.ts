import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppSharedModule } from 'src/app/app-shared/app-shared.module';
import { SampleBoardComponent } from 'src/app/sample/sample-board/sample-board.component';
import { BoardMemberComponent } from 'src/app/sample/board-member/board-member.component';
import { SampleActivateGuard } from 'src/app/app-shared/guards/sample-activate.guard';
import { HolderListComponent } from 'src/app/sample/board-member/holders/holder-list/holder-list.component';
import { HolderLandingComponent } from 'src/app/sample/board-member/holders/holder-landing/holder-landing.component';

const routes: Routes = [
 {
   path: '',
   component: SampleBoardComponent,
   children: [
     {
       path: '',
       redirectTo: '/sample',
       pathMatch: 'full'
     },
     {
       path: 'holders',
       component: HolderLandingComponent
     }
   ]
  },
 { path: 'members', canActivate: [SampleActivateGuard], component: BoardMemberComponent }
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
