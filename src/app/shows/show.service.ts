import {Injectable, EventEmitter, Output} from '@angular/core';
import {Http, Response} from "@angular/http";
import {env} from "../../environments/env";
import 'rxjs/Rx';

@Injectable()
export class ShowService {

  constructor(private http:Http) {
  }

  private API_ADRESS_TMDb = 'https://api.themoviedb.org/3';
  private SEARCH_TV = '/search/tv';
  private QUERY = '&query=';
  private popularShows = "https://api.themoviedb.org/3/tv/popular";
  private page:string = '&page=';
  private API_KEY = env.API_KEY_TMDB;

  /************************/
  /*  Navigation Search   */
  /*       Emitter        */
  /************************/

  @Output() navChangeEmitter = new EventEmitter<string>();
  getNavChangeEmitter() {
    return this.navChangeEmitter;
  }


  /***** Get and Set title *****/
  private title;

  getTitle() {
    return this.title;
  }

  setTitle(title:string) {
    this.title = title;
    this.navChangeEmitter.emit(this.title);
  }


  /************************/
  /*     Show info        */
  /*     from TMDb        */
  /************************/

  queryWithTitle(searchTerm:string) {
    return this.http.get(this.API_ADRESS_TMDb + this.SEARCH_TV + "?api_key=" + this.API_KEY + this.QUERY + searchTerm)
      .map((response:Response) => response.json());
  }


  /************************/
  /*     More Show info   */
  /*     from TMDb        */
  /************************/

  getShowInfo(id:string) {
    return this.http.get(
      this.API_ADRESS_TMDb + '/tv/' + id + "?api_key=" + this.API_KEY).map((data:Response) => data.json());
  }


  /************************/
  /*     Popular Shows    */
  /*     from TMDb        */
  /************************/
  getPopularShowsDemo(pagenumber:number) {
    return this.http.get(this.popularShows + "?api_key=" + this.API_KEY + '&page=' + pagenumber)
      .map((data:Response) => data.json())
  }


  getPopularShows(fromYear: any, pagenumber:number){
    return this.http.get(this.DISCOVER_TV + "?api_key=" + this.API_KEY + '&with_genres=' + '&first_air_date.gte=' + fromYear + '&popularity.desc' + '&page=' + pagenumber)
      .map((data:Response) => data.json())
  }


  /*************************/
  /*     Popular Shows     */
  /*   by genres from TMDb */
  /*************************/

  private DISCOVER_TV = "https://api.themoviedb.org/3/discover/tv";
  // http://api.themoviedb.org/3/discover/tv?api_key=xxxx&with_genres=18&first_air_date.gte=2015-01-01&popularity.desc
// genres=10762&first_air_date.gte=2015-01-01&po


  getPopularByGenre(genreID: number, fromYear: any, pagenumber:number){
    return this.http.get(this.DISCOVER_TV + "?api_key=" + this.API_KEY + '&with_genres=' + genreID + '&first_air_date.gte=' + fromYear + '&popularity.desc' + '&page=' + pagenumber)
      .map((data:Response) => data.json())
  }


  /************************/
  /*      Casting         */
  /*     from TMDb        */
  /************************/

  getCasting(id:string) {
    return this.http.get(
      this.API_ADRESS_TMDb + '/tv/' + id + '/credits' + "?api_key=" + this.API_KEY).map((data:Response) => data.json());
  }


  /************************/
  /*      Season Info     */
  /*     from TMDb        */
  /************************/
  // http://api.themoviedb.org/3/tv/id/season/season_number
  // http://api.themoviedb.org/3/tv/31917/videos?api_key=xxxx


  getSeasonInfo(id:string, season_number:string) {
    return this.http.get(
      this.API_ADRESS_TMDb + '/tv/' + id + '/season/' + season_number + "?api_key=" + this.API_KEY).map((data:Response) => data.json());
  }

  getShowVideo(id:string) {
    return this.http.get(
      this.API_ADRESS_TMDb + '/tv/' + id + '/videos' + "?api_key=" + this.API_KEY).map((data:Response) => data.json());
  }


  /************************/
  /*     External IDs    */
  /*     from TMDb        */
  /************************/
  // http://api.themoviedb.org/3/tv/id/external_ids

  getExternalIds(id:string) {
    return this.http.get(
      this.API_ADRESS_TMDb + '/tv/' + id + '/external_ids' + "?api_key=" + this.API_KEY).map((data:Response) => data.json());
  }



  // TV MAZE DOEST SUPPORT HTTPS YEY
  /************************/
  /*    Other Show info   */
  /*     from Tv Maze     */
  /************************/

  /*

   getInfoFromTvMaze(title:string) {
   return this.http.get(
   'http://api.tvmaze.com/singlesearch/shows?q=' + title).map(data => data.json());
   }



   */

  // {"apikey":"xxxxxx"}

  /*
   token: string;

   getTVDB(){

   const body = { };
   const headers = new Headers(
   {
   'content-type': 'application/json',
   'apikey': 'xxxxxx'
   });
   return this.http.post('https://api.thetvdb.com/login', body, {headers: headers})
   .subscribe((response: Response) => {
   this.token = response.json();
   console.log(this.token);
   });

   }
   */


}
