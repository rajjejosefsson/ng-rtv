import {NgModule}       from '@angular/core';
import {WatchlistComponent} from "./watchlist.component";
import {WatchlistItemComponent} from "./watchlist-item/watchlist-item.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    declarations: [
        WatchlistComponent,
        WatchlistItemComponent,
    ],
    imports: [
        CommonModule,
        SharedModule
    ]
})

export class WatchlistModule {
}
