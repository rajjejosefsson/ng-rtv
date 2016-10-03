import {Component, OnInit} from '@angular/core';
import {WatchlistService} from "./watchlist.service";
import {Tvshow} from "../shows/show";

@Component({
    selector: 'rj-watchlist',
    templateUrl: 'watchlist.component.html',
    styles: [` 
 
 
 
 
/* Medium devices (desktops, 992px and up) */
@media (max-width: 992px) {
    .container {
    margin: 30px auto;   
     }
}

 

`]
})
export class WatchlistComponent implements OnInit {
    watchlist:Tvshow[];

    constructor(private watchlistService:WatchlistService) {
    }

    ngOnInit() {
        this.watchlist = this.watchlistService.getWatchlist();
    }

}
