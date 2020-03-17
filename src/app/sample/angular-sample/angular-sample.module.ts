import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AngularDashboardComponent } from './angular-dashboard/angular-dashboard.component';
import { ContentProjectionComponent } from './content-projection/content-projection.component';
import { AuthFormComponent } from './content-projection/auth-form/auth-form.component';
import { LoginPageComponent } from './content-projection/login-page/login-page.component';
import { CreateAccountPageComponent } from './content-projection/create-account-page/create-account-page.component';

const routes: Routes = [
  {
    path: '',
    component: AngularDashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'angular-dashboard',
        pathMatch: 'full'
      },
      {
        path: 'content-projection',
        component: ContentProjectionComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    AngularDashboardComponent,
    ContentProjectionComponent,
    AuthFormComponent,
    LoginPageComponent,
    CreateAccountPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AngularSampleModule { }
