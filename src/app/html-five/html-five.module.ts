import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaggyComponent } from 'src/app/html-five/taggy/taggy.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TaggyComponent,
    children: [
      {
        path: '',
        redirectTo: '/html-five',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  declarations: [TaggyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HtmlFiveModule { }
