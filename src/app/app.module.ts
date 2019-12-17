import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadingStrategy, Route } from '@angular/router';

import { AppComponent } from './app.component';
import { ScrollBarComponent } from './scroll-bar/scroll-bar.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { Observable, of } from 'rxjs';
import { AppSharedModule } from './app-shared/app-shared.module';
import { SampleLoadGuard } from './app-shared/guards/sample-load.guard';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';
// import { SampleModule } from './sample/sample.module';

export class CustomPreload implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    return route.data && route.data.isPreload ? fn() : of(null);
  }
}

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'scroll', component: ScrollBarComponent },
  { path: 'countdown', component: CountdownTimerComponent},
  {
    path: 'sample',
    data: {
      isPreload: true
    },
    canLoad: [SampleLoadGuard],
    loadChildren: './sample/sample.module#SampleModule'
  },
  { path: '**', component: NotfoundComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ScrollBarComponent,
    HomeComponent,
    NotfoundComponent,
    CountdownTimerComponent
  ],
  imports: [
    BrowserModule,
    AppSharedModule,
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
