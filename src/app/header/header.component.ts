import {Component, OnInit, HostBinding, Input} from '@angular/core';
import {ShowService} from "../shows/show.service";
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {AuthService} from "../auth/auth.service";
import {WatchlistService} from "../watchlist/watchlist.service";
import {Router} from "@angular/router";

@Component({
  selector: 'rj-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.css']
})

export class HeaderComponent implements OnInit {
  myForm: FormGroup;
  error = false;
  errorMessage = '';
  firsttime = true;
  isCollapsed = true;

  constructor(
      private showService: ShowService,
      private router: Router,
      private authService: AuthService,
      private fb: FormBuilder,
      private watchlistService: WatchlistService) {
  }

  onSearchClick(value: string) {
    this.showService.setTitle(value);
    this.router.navigate(['/detail']);
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.isAuth();
  }

  onSignin() {
    this.authService.signinUser(this.myForm.value);
  }

  isAuth() {
    if (this.authService.isAuthenticated()) {
      // Get watchlist ready after this before go to watchlist
      if (this.firsttime) {
        this.firsttime = false;
        this.watchlistService.getWatchlist();
      }
    }
    return this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.logout();
  }





}
