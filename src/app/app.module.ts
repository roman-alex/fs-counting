import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {IonicApp, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {Facebook} from "@ionic-native/facebook";
import {AngularFirestore} from "angularfire2/firestore";
import {GooglePlus} from "@ionic-native/google-plus";

export const firebaseConfig = {
  apiKey: "AIzaSyABUgtvcgM7My8m6MeIfFrigHuUkiZZiVQ",
  authDomain: "test-2d107.firebaseapp.com",
  databaseURL: "https://test-2d107.firebaseio.com",
  projectId: "test-2d107",
  storageBucket: "test-2d107.appspot.com",
  messagingSenderId: "830297659502"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    SplashScreen,
    StatusBar,
    Facebook,
    GooglePlus,
    AngularFirestore
  ]
})
export class AppModule {
}
