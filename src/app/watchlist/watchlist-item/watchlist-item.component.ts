import {Component, OnInit, Input, EventEmitter, OnDestroy} from '@angular/core';
import {Tvshow} from "../../shared/models/show";
import {Subscription} from "rxjs/Rx";
import {WatchlistService} from "../watchlist.service";
import {ShowService} from "../../shows/show.service";

@Component({
    selector: 'rj-watchlist-item',
    templateUrl: 'watchlist-item.component.html',
    styleUrls: ['watchlist-item.css']
})

export class WatchlistItemComponent implements OnInit, OnDestroy {
    @Input() show:Tvshow;

    private posterUrl = 'https://image.tmdb.org/t/p/w342/';
    private subscription:Subscription;
    private showChanged = new EventEmitter<Tvshow>();


    constructor(private showService:ShowService,
                private watchlistService:WatchlistService) {
    }

    ngOnInit() {
        this.subscription = this.showService.queryWithTitle(this.show.name)
            .subscribe(show => {

                let resultArray:Tvshow[];

                resultArray = show['results'];

                this.showService.getShowInfo(resultArray[0].id).subscribe(
                    showInfo => {
                        // *** GET STATUS *** //
                        this.show.status = showInfo['status'];
                    });

                if (resultArray[0] != null) {
                    this.show = new Tvshow(
                        resultArray[0].name,
                        resultArray[0].overview,
                        this.posterUrl + resultArray[0].poster_path,
                        resultArray[0].vote_average,
                        false,
                        resultArray[0].id,
                        []
                    );
                    this.showChanged.emit(this.show);
                }
            });
    }


    onHeart() {
        this.watchlistService.removeFromWatchlist(this.show)
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}


// WITH TVMAZE
/*
 this.subscription = Observable.forkJoin(
 this.showService.queryWithTitle(this.show.name),
 this.showService.getInfoFromTvMaze(this.show.name)
 ).subscribe(show => {

 let resultArray:Tvshow[];
 let tvMazeData:Tvshow;

 resultArray = show[0]['results'];
 tvMazeData = show[1];


 if (resultArray[0] != null) {
 this.show = new Tvshow(
 resultArray[0].name,
 resultArray[0].overview,
 this.posterUrl + resultArray[0].poster_path,
 resultArray[0].vote_average,
 false,
 resultArray[0].id,
 [],
 tvMazeData.status,
 tvMazeData.premiered,
 tvMazeData.schedule,
 tvMazeData.genres
 );
 this.showChanged.emit(this.show);
 }
 });

 */
