import {Component, OnInit, EventEmitter, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs/Rx";
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
import {Tvshow} from "../shows/show";
import {ShowService} from "../shows/show.service";
import {WatchlistService} from "../watchlist/watchlist.service";

@Component({
    selector: 'rj-detail-show',
    template: `
        <rj-jumbotron><h1>Detail Information</h1></rj-jumbotron>


   <div class="container">
              <div class="loading" *ngIf="myShow == null">       
                 <div class="ui segment">
                   <div class="ui active inverted dimmer">
                    <div class="huge ui text loader">Loading</div>
                   </div>
                 </div>
              </div>
                             
              <div *ngIf="myShow != null">
              <rj-show-detail-item [show]="myShow"></rj-show-detail-item> 
              </div> 
              
        </div>
 

       
       


`,
    styles: [`  
   .ui.huge.loader{
   margin-top: 120px;
   }    
   
   .container { 
   margin-top: 0px;
   background-color: white;
   }

   




   
   
`]
})


export class ShowDetailComponent implements OnInit, OnDestroy {
    private subscription:Subscription;

    constructor(private showService:ShowService,
                private watchlistService:WatchlistService,
                private sanitizer:DomSanitizer) {
    }

    private myShow:Tvshow;
    private posterUrl = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/';
    private showChanged = new EventEmitter<Tvshow>();
    private cast:any[];
    private watchlist:Tvshow[];
    private airdates:any[] = [];
    private title:string;
    videoChanged = new EventEmitter();
    url:SafeResourceUrl;


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

            let resultArray:Tvshow[] = [];
            let heart:boolean = false;
            let showInfoArray:any[] = [];
            let seasonsInfo:any[] = [];
            let latestseason:string;
            let seasonStatus:string;
            let seasonId:string;
            let latestSeasonNumber:string;

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
                        let genresArray:any = [];

                        for (let i = 0; i < genres.length; i++) {
                            genresArray.push(genres[i].name)
                        }
                        this.myShow.genres = genresArray;

                        // Get show premier year
                        var date = showInfo['first_air_date'];
                        var first_air_date = new Date(date);
                        var firstYear = first_air_date.getFullYear();
                        this.myShow.first_air_date = firstYear.toString();
                    });


                this.showService.getExternalIds(resultArray[0].id).subscribe(externalId => {
                    this.myShow.imdb_id = externalId['imdb_id'];
                });


                this.showService.getShowVideo(resultArray[0].id).subscribe(videoLinkKey => {
                    if (videoLinkKey.results != null && videoLinkKey.results.length > 0) {
                        this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://youtube.com/embed/' + videoLinkKey.results[0].key);
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