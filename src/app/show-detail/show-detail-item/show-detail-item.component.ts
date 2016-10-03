import {Component, Input, AfterViewInit,} from '@angular/core';
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
import {Tvshow} from "../../shows/show";
import {WatchlistService} from "../../watchlist/watchlist.service";

@Component({
  selector: 'rj-show-detail-item',
  templateUrl: 'show-detail-item.component.html',
  styleUrls: ['show-detail-item.css']
})
export class ShowDetailItemComponent implements AfterViewInit {
  @Input() show:Tvshow;
  url:SafeResourceUrl;

  constructor(private watchlistService:WatchlistService,
              private sanitizer:DomSanitizer ) {
  }


  ngAfterViewInit():any {
    if (this.show != null) {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://youtube.com/embed/' + this.show.videoLinkKey);
    }
  }


  saveToWatchlist() {
    this.watchlistService.addToWatchlist(this.show);
  }


  onHeart() {
    this.show.isHearted = !this.show.isHearted;
    if (this.show.isHearted) {
      this.watchlistService.addToWatchlist(this.show);
    } else {
      this.watchlistService.removeFromWatchlist(this.show)
    }
  }
}
