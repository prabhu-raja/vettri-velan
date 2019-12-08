import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadingStrategy, Route } from '@angular/router';

import { AppComponent } from './app.component';
import { ScrollBarComponent } from './scroll-bar/scroll-bar.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { Observable, of } from 'rxjs';
// import { SampleModule } from './sample/sample.module';

export class CustomPreload implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    return route.data && route.data.isPreload ? fn() : of(null);
  }
}

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'scroll', component: ScrollBarComponent },
  {
    path: 'sample',
    data: {
      isPreload: true
    },
    loadChildren: './sample/sample.module#SampleModule'
  },
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
    // SampleModule,
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules // * This will preload all lazy load modules
      preloadingStrategy: CustomPreload // * This is custom preload
    })
  ],
  providers: [CustomPreload],
  bootstrap: [AppComponent]
})
export class AppModule {}
