import { Injectable } from '@angular/core';
import {User} from "./user.interface";
import {Router} from "@angular/router";


declare var firebase: any;

@Injectable()
export class AuthService {

  constructor(private router: Router) {}




  signupUser(user: User){
    firebase.auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .catch(function(error) {
        console.log(error);
      });
    this.router.navigate(['/shows'])
  }



  signinUser(user: User){
    firebase.auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .catch(function(error) {
        console.log(error);
      });
  }


  isAuthenticated() {
    var user = firebase.auth().currentUser;

    if (user) {
      return true;
    } else {
      return false;
    }
  }


  logout(){
    firebase.auth().signOut();
    this.router.navigate(['/home']);
  }


  getUserInfo(){
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                       // you have one. Use User.getToken() instead.

      return user;

    }
  }



}
