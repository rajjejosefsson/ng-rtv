import {Component, Input} from '@angular/core';
import {Tvshow} from '../../shared/models/show';
import {WatchlistService} from "../../watchlist/watchlist.service";
import {Router} from "@angular/router";
import {ShowService} from "../show.service";

@Component({
  selector: 'rj-show-item',
  templateUrl: 'show-item.html',
  styleUrls: ['show-item.css'],
})

export class ShowItemComponent {
  @Input() show: Tvshow;

  constructor(private watchlistService: WatchlistService,
              private showService: ShowService,
              private router: Router) {
  }

  onHeart() {
    this.show.isHearted = !this.show.isHearted;
    if (this.show.isHearted) {
      this.watchlistService.addToWatchlist(this.show);
    } else {
      this.watchlistService.removeFromWatchlist(this.show);
    }
  }

  onDetail() {
    this.showService.setTitle(this.show.name);
    this.router.navigate(['/detail']);
  }
}
