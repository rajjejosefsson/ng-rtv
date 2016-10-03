import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {Tvshow} from "../shows/show";
import {AuthService} from "../shared/auth.service";
declare var firebase:any;


@Injectable()
export class WatchlistService {

    constructor(private http:Http, private authService:AuthService) {
    }

    private watchlist:Tvshow[] = [];
    watchlistChanged = new EventEmitter<Tvshow[]>();


    addToWatchlist(tvshow:Tvshow) {
        if (this.watchlist == null || this.watchlist.length == 0) {
            this.watchlist = [];
        }
        this.watchlist.push(tvshow);
        this.storeWatchlist();
    }


    getWatchlist() {
        if (this.watchlist == null) {
            this.watchlist = [];
        }
        if (this.watchlist.length == 0) {
            this.fetchStoredWatchlist();
        }
        return this.watchlist;
    }


    removeFromWatchlist(tvshow:Tvshow) {
        for (let i = 0; i < this.watchlist.length; i++) {
            if (this.watchlist[i].name === tvshow.name) {
                this.watchlist.splice(i, 1);
                this.watchlistChanged.emit(this.watchlist);
            }
        }
        this.storeWatchlist();
    }


    /************************/
    /*  Save and Reterive  */
    /*      from db        */
    /************************/


    storeWatchlist() {
        if (this.authService.isAuthenticated()) {
            let uid = this.authService.getUserInfo()['uid'];
            const body = JSON.stringify(this.watchlist);
            const headers = new Headers({'content-type': 'application/json'});
            return this.http.put('https://rtv-watcher.firebaseio.com/users/' + uid + '.json?auth=GPwCJsdXtVdjjho8BJp7wczn3x8wIzo4KCDCsqt3', body, {headers: headers}).subscribe(data => data);
        }
    }


    fetchStoredWatchlist() {
        if (this.authService.isAuthenticated()) {
            let uid = this.authService.getUserInfo()['uid'];
            return this.http.get('https://rtv-watcher.firebaseio.com/users/' + uid + '.json?auth=GPwCJsdXtVdjjho8BJp7wczn3x8wIzo4KCDCsqt3')
                .map((response:Response) => response.json())
                .subscribe((data:Tvshow[]) => {
                    this.watchlist = data;
                });
        }
    }
}
