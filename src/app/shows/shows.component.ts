import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {ShowService} from "./show.service";
import {Tvshow} from "./show";
import {WatchlistService} from "../watchlist/watchlist.service";
import {Subscription} from "rxjs/Rx";
@Component({
  selector: 'rj-shows',
  templateUrl: 'shows.component.html',
  styles: [`
        .loader {
            margin-top: 100px;
            color: white;
        }
    
/* Extra small devices (portrait phones, less than 544px) */
@media (max-width: 543px) {
            
        }
      

`]
})

export class ShowsComponent implements OnInit,OnDestroy {
  private shows:Tvshow[] = [];
  private watchlist:Tvshow[];
  private subscription:Subscription;
  private pageNR:number = 1;
  private posterUrl = 'https://image.tmdb.org/t/p/w342/';


  constructor(private showService:ShowService,
              private watchlistService:WatchlistService) {}


  ngOnInit() {
    this.watchlist = [];
    this.watchlist = this.watchlistService.getWatchlist();

    // STANDARD START ALL
    this.fetchAllPopularShows();
  }

  private isStart = true;

  onScroll(){
    console.log(this.pageNR);
    this.pageNR += 1;
    if (this.isStart){
      this.fetchAllPopularShows();
    } else {
      this.fetchPopularShowByGenre()
    }
  }




  private selectedGenre;

  getSelectedGenre(value) {
    this.pageNR = 1;
    this.shows = [];
    console.log(value);

    if(value == 0){
      console.log('VALUE IS NOLLL');
      this.isStart = true;
      this.fetchAllPopularShows();
    } else {
      console.log('är genre!!');
      this.isStart = false;
      this.selectedGenre = value;
      this.fetchPopularShowByGenre();
    }
  }

  private selectedFromYear = 0;

  getSelectedYear(value){
    this.shows = [];

    if(value === 'All'){
      this.selectedFromYear = 0;
    } else {
      this.selectedFromYear = value;
    }

    if(this.isStart){
      this.fetchAllPopularShows();
    } else {
      this.fetchPopularShowByGenre();

    }
  }


  pageNumberEmitter($event) {
    this.pageNR = $event;
    console.log($event);
    this.fetchAllPopularShows();
  }


  fetchAllPopularShows() {
    this.subscription = this.showService.getPopularShows(this.selectedFromYear ,this.pageNR).subscribe(data => {
      let resultArray:Tvshow[] = [];
      let heart:boolean = false;
      resultArray = data['results'];

      for (let i = 0; i < resultArray.length; i++) {
        // Add the heart symbol to those shows from the watchlist
        if (this.watchlist !== null) {
          for (let j = 0; j < this.watchlist.length; j++) {
            if (this.watchlist[j].name === resultArray[i].name) {
              heart = true;
            }
          }
        }
        this.shows.push(new Tvshow(
          resultArray[i].name,
          resultArray[i].overview,
          this.posterUrl + resultArray[i].poster_path,
          resultArray[i].vote_average, heart
        ));
        heart = false;
      }
    });
  }


  fetchPopularShowByGenre() {

    if (this.selectedFromYear == null){
      this.selectedFromYear = 0;
    }


    if (this.selectedGenre == 0){
      this.fetchAllPopularShows();
      this.isStart = true;
      console.log('SELECTED GENRE IS 0');
    } else {

    this.showService.getPopularByGenre(this.selectedGenre, this.selectedFromYear , this.pageNR).subscribe(showGenre => {

      console.log(showGenre['results']);
      let resultArray:Tvshow[] = [];
      let heart:boolean = false;

      resultArray = showGenre['results'];


      for (let i = 0; i < resultArray.length; i++) {
        // Add the heart symbol to those shows from the watchlist
        if (this.watchlist != null) {
          for (let j = 0; j < this.watchlist.length; j++) {
            if (this.watchlist[j].name === resultArray[i].name) {
              heart = true;
            }
          }
        }
        this.shows.push(new Tvshow(
          resultArray[i].name,
          resultArray[i].overview,
          this.posterUrl + resultArray[i].poster_path,
          resultArray[i].vote_average, heart
        ));
        heart = false;

      }
    });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
