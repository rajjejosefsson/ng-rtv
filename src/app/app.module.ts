

import {HeaderComponent} from "./header.component";
import {AppComponent} from "./app.component";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {WatchlistModule} from "./watchlist/watchlist.module";
import {ShowDetailModule} from "./show-detail/show-detail.module";
import {ShowsModule} from "./shows/shows.module";
import {HomeModule} from "./home/home.module";
import {routing} from "./app.routes";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {ShowService} from "./shows/show.service";
import {WatchlistService} from "./watchlist/watchlist.service";
import {AuthService} from "./shared/auth.service";
import { CollapseModule } from 'ng2-bootstrap/components/collapse';

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
        routing,
        HomeModule,
        ShowsModule,
        ShowDetailModule,
        WatchlistModule, CollapseModule

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
