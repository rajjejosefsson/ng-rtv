import {Component, OnInit, HostBinding, Input} from '@angular/core';
import {ShowService} from "./shows/show.service";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {AuthService} from "./shared/auth.service";
import {WatchlistService} from "./watchlist/watchlist.service";
import {Router} from "@angular/router";

@Component({
  selector: 'rj-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.css']
})
export class HeaderComponent implements OnInit {

  constructor(
      private showService:ShowService,
      private router:Router,
      private authService:AuthService,
      private fb:FormBuilder,
      private watchlistService:WatchlistService) {
  }

  onSearchClick(value:string) {
    this.showService.setTitle(value);
    this.router.navigate(['/detail']);
  }



  /************************/
  /*      AUTH           */
  /************************/
  myForm:FormGroup;
  error = false;
  errorMessage = "";


  ngOnInit():any {
    this.myForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.isAuth();
  }


  onSignin() {
    this.authService.signinUser(this.myForm.value);
  }



  firsttime = true;

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



  public isCollapsed:boolean = false;

  onToggle(){
    this.isCollapsed = !this.isCollapsed;
  }

  public collapsed(event:any):void {
    console.log(event);
  }

  public expanded(event:any):void {
    console.log(event);
  }



}
