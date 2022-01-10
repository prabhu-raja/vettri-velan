import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoItComponent } from './do-it/do-it.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DoItComponent,
    children: [
      {
        path: '',
        redirectTo: '/rxjs-2',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  declarations: [DoItComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class WorkReactivexModule { }
