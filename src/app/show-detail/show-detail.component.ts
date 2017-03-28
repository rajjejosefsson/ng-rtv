import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Rx";
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Tvshow } from "../shared/models/show";
import { ShowService } from "../shows/show.service";
import { WatchlistService } from "../watchlist/watchlist.service";

@Component({
    selector: 'rj-detail-show',
    templateUrl: 'show-detail.component.html',
    styleUrls: ['show-detail.component.css']

})

export class ShowDetailComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    private myShow: Tvshow;
    private posterUrl = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/';
    private showChanged = new EventEmitter<Tvshow>();
    private watchlist: Tvshow[];
    private title: string;
    videoChanged = new EventEmitter();
    url: SafeResourceUrl;

    constructor(private showService: ShowService,
        private watchlistService: WatchlistService,
        private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.watchlist = this.watchlistService.getWatchlist();
        this.subscription = this.showService.getNavChangeEmitter().subscribe(
            showTitle => {
                this.title = showTitle;
                this.fetchShowData();
            });
        this.fetchShowData();
    }


    fetchShowData() {
        this.title = this.showService.getTitle();

        this.subscription = this.showService.queryWithTitle(this.title).subscribe(show => {
            let resultArray: Tvshow[] = [];
            let heart = false;
            resultArray = show['results'];

            if (resultArray[0] != null) {
                // *** GET CASTING *** //
                this.showService.getCasting(resultArray[0].id)
                    .subscribe(castingData => {
                        this.myShow.cast = castingData['cast'];
                    });

                // GET SHOW INFO
                this.showService.getShowInfo(resultArray[0].id).subscribe(
                    showInfo => {

                        // *** GET STATUS *** //
                        this.myShow.status = showInfo['status'];

                        // *** GET GENRES *** //
                        let genres = showInfo['genres'];
                        let genresArray: any = [];

                        for (let i = 0; i < genres.length; i++) {
                            genresArray.push(genres[i].name)
                        }
                        this.myShow.genres = genresArray;

                        // Get show premier year
                        let date = showInfo['first_air_date'];
                        let first_air_date = new Date(date);
                        let firstYear = first_air_date.getFullYear();
                        this.myShow.first_air_date = firstYear.toString();
                    });


                this.showService.getExternalIds(resultArray[0].id).subscribe(externalId => {
                    this.myShow.imdb_id = externalId['imdb_id'];
                });


                this.showService.getShowVideo(resultArray[0].id).subscribe(videoLinkKey => {
                    if (videoLinkKey.results != null && videoLinkKey.results.length > 0) {
                        this.url = this.sanitizer.
                            bypassSecurityTrustResourceUrl('https://youtube.com/embed/' + videoLinkKey.results[0].key);
                        this.myShow.videoLinkKey = this.url;
                    }
                });


                // *** GET FAVORITES*** //
                for (let i = 0; i < resultArray.length; i++) {
                    // Add the heart symbol to those shows from the watchlist
                    if (this.watchlist != null) {
                        for (let j = 0; j < this.watchlist.length; j++) {
                            if (this.watchlist[j].name === resultArray[i].name) {
                                heart = true;
                            }
                        }
                    }
                }


                // GENERATE TE SHOW
                this.myShow = new Tvshow(
                    resultArray[0].name,
                    resultArray[0].overview,
                    this.posterUrl + resultArray[0].poster_path,
                    resultArray[0].vote_average,
                    heart,
                    resultArray[0].id,
                    [],
                    resultArray[0].backdrop_path
                );
                this.showChanged.emit(this.myShow);
            }
            heart = false;
        });
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}