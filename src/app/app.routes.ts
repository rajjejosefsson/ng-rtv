import { HomeComponent } from "./home/home.component";
import { ShowsComponent } from "./shows/shows.component";
import { ShowDetailComponent } from "./show-detail/show-detail.component";
import { WatchlistComponent } from "./watchlist/watchlist.component";
import { SignupComponent } from './auth/signup/signup.component';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shows', component: ShowsComponent },
  { path: 'detail', component: ShowDetailComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'signup', component: SignupComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})


export class AppRoutingModule { }