import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppSharedModule } from 'src/app/app-shared/app-shared.module';
import { SampleBoardComponent } from 'src/app/sample/sample-board/sample-board.component';
import { BoardMemberComponent } from 'src/app/sample/board-member/board-member.component';
import { HolderListComponent } from 'src/app/sample/board-member/holders/holder-list/holder-list.component';
import { HolderLandingComponent } from 'src/app/sample/board-member/holders/holder-landing/holder-landing.component';
import { SampleActivateGuard } from 'src/app/app-shared/guards/sample-activate.guard';
import { SampleActivateChildGuard } from 'src/app/app-shared/guards/sample-activate-child.guard';
import { SampleDeactivateGuard } from 'src/app/app-shared/guards/sample-deactivate.guard';
import { RxRateLimitingComponent } from 'src/app/sample/rx-rate-limiting/rx-rate-limiting.component';
import { RxTransformationComponent } from 'src/app/sample/rx-transformation/rx-transformation.component';
import { RxCombinationComponent } from './rx-combination/rx-combination.component';
import { MortgageCalculatorComponent } from './mortgage-calculator/mortgage-calculator.component';

const routes: Routes = [
 {
   path: '',
   component: SampleBoardComponent,
   canActivateChild: [SampleActivateChildGuard],
   children: [
     {
       path: '',
       redirectTo: '/sample',
       pathMatch: 'full'
     },
     {
       path: 'holders',
       component: HolderLandingComponent,
       canDeactivate: [SampleDeactivateGuard]
     },
     {
       path: 'rate-limiting',
       component: RxRateLimitingComponent
     },
     {
       path: 'transformation',
       component: RxTransformationComponent
     },
     {
       path: 'combination',
       component: RxCombinationComponent
     },
     {
       path: 'mortgage',
       component: MortgageCalculatorComponent
     }
   ]
  },
  {
    path: 'members',
    canActivate: [SampleActivateGuard],
    component: BoardMemberComponent
  }
];

@NgModule({
  declarations: [
    SampleBoardComponent,
    BoardMemberComponent,
    HolderListComponent,
    HolderLandingComponent,
    RxRateLimitingComponent,
    RxTransformationComponent,
    RxCombinationComponent,
    MortgageCalculatorComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SampleModule { }
