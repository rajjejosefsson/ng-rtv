import { HeaderComponent } from "./header/header.component";
import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { WatchlistModule } from "./watchlist/watchlist.module";
import { ShowDetailModule } from "./show-detail/show-detail.module";
import { ShowsModule } from "./shows/shows.module";
import { HomeModule } from "./home/home.module";
import { AppRoutingModule } from './app.routes';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ShowService } from "./shows/show.service";
import { WatchlistService } from "./watchlist/watchlist.service";
import { AuthService } from './auth/auth.service';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HomeModule,
        ShowsModule,
        ShowDetailModule,
        WatchlistModule
    ],
    providers: [
        ShowService,
        WatchlistService,
        AuthService
    ],
    bootstrap: [AppComponent],
})

export class AppModule {
}
