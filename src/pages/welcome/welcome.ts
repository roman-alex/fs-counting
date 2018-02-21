import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController} from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import {GooglePlus} from "@ionic-native/google-plus";

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  displayName;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private fb: Facebook, private platform: Platform, public menu: MenuController, private googlePlus: GooglePlus) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (!user) {
        this.displayName = null;
        return;
      }
      this.displayName = user.displayName;
    });
  }

  loginFacebook() {
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => console.log(res));
    }
  }

  loginGoogle() {
    this.googlePlus.login({
      'webClientId': '830297659502-45fjuqjamdfpa8u0hbe8dtbi51mbkd77.apps.googleusercontent.com'
    })
      .then(res => {
        const firecreds = firebase.auth.GoogleAuthProvider.credential(res.idToken);
        return firebase.auth().signInWithCredential(firecreds);
      })
      .catch(err => console.error(err));
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }
}
