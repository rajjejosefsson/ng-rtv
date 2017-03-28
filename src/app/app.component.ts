import { WatchlistService } from './watchlist/watchlist.service';
import { AuthService } from './auth/auth.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
    selector: 'rj-root',
    template: `
    <div class="mypage">
        <rj-header></rj-header>
        <router-outlet></router-outlet>
    </div>
`
})
export class AppComponent implements OnInit {

    constructor() {
    }
    
    ngOnInit() {
        firebase.initializeApp({
            apiKey: 'AIzaSyCCZOdGCP0f2r4NmzIxhISaqenfQzIrUaM',
            authDomain: 'rtv-watcher.firebaseapp.com',
        });
    }

}
