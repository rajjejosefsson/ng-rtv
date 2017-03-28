import { Component, OnInit } from '@angular/core';
import { WatchlistService } from "./watchlist.service";
import { Tvshow } from "../shared/models/show";

@Component({
    selector: 'rj-watchlist',
    templateUrl: 'watchlist.component.html',
    styleUrls: ['watchlist.component.css']
})

export class WatchlistComponent implements OnInit {
    watchlist: Tvshow[];

    constructor(private watchlistService: WatchlistService) {
    }

    ngOnInit() {
        this.watchlist = this.watchlistService.getWatchlist();
    }
}
