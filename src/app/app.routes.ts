import {HomeComponent} from "./home/home.component";
import {ShowsComponent} from "./shows/shows.component";
import {ShowDetailComponent} from "./show-detail/show-detail.component";
import {WatchlistComponent} from "./watchlist/watchlist.component";
import {SignupComponent} from "./home/signup.component";
import {Routes, RouterModule} from "@angular/router";

export const routes:Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'shows', component: ShowsComponent},
    {path: 'detail', component: ShowDetailComponent},
    {path: 'watchlist', component: WatchlistComponent},
    {path: 'signup', component: SignupComponent},
];

export const routing = RouterModule.forRoot(routes);
