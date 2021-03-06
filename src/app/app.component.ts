import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Config, Nav, Platform } from 'ionic-angular';

import {FirstRunPage, MainPage} from '../pages/pages';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase/app";

@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar color="primary">
        <div class="header-menu">
          <h3></h3>
          <img class="header-menu__logo" src="{{this.user?.photoURL}}" alt="">
          <h3 class="header-menu__text">{{this.user?.displayName}}</h3>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
        <button menuClose ion-item (click)="signOut()">
          <ion-icon color="primary" name="exit" item-start></ion-icon>
          Выход
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any;
  user: firebase.User;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    // { title: 'Welcome', component: 'WelcomePage' },
    // { title: 'Tabs', component: 'TabsPage' },
  ]

  constructor(platform: Platform, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen,  private afAuth: AngularFireAuth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (!user) {
        this.rootPage = FirstRunPage;
      } else {
        this.user = user;
        //console.log(user);
        this.rootPage = MainPage;
      }
    });

    this.config.set('ios', 'backButtonText', 'назад');
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
