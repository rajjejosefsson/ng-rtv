import {Component, OnInit} from '@angular/core';
import {WatchlistService} from "./watchlist.service";
import {Tvshow} from "../shows/show";

@Component({
  selector: 'rj-watchlist',
  templateUrl: 'watchlist.component.html',
  styles: [` 

`]
})
export class WatchlistComponent implements OnInit{
  watchlist:Tvshow[];

  constructor(private watchlistService:WatchlistService) {}

  ngOnInit(){
    this.watchlist = this.watchlistService.getWatchlist();
  }

}
