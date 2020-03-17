import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TestOneComponent } from 'src/app/sample/test/test-one/test-one.component';


const routes: Routes = [
  {
    path: '',
    component: TestOneComponent
  }
];

@NgModule({
  declarations: [TestOneComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TestModule { }
