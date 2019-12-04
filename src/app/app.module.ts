import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ScrollBarComponent } from './scroll-bar/scroll-bar.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SampleModule } from './sample/sample.module';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'scroll', component: ScrollBarComponent },
  { path: '**', component: NotfoundComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ScrollBarComponent,
    HomeComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    SampleModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
