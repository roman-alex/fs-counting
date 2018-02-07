import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  displayName;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private fb: Facebook, private platform: Platform) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (!user) {
        this.displayName = null;
        return;
      }
      this.displayName = user.displayName;
    });
  }

  login() {
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

  // signOut() {
  //   this.afAuth.auth.signOut();
  // }

  // signup() {
  //   this.navCtrl.push('SignupPage');
  // }
}
