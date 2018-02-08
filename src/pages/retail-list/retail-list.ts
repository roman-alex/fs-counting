import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Retail} from "../../models/retail";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase/app";

@IonicPage()
@Component({
  selector: 'page-retail-list',
  templateUrl: 'retail-list.html',
})
export class RetailListPage {

  private retailCollection: AngularFirestoreCollection<Retail>;
  retails: Observable<any[]>;
  countItems = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.retailCollection = this.afs.doc<any>(`users/${user.uid}`).collection<Retail>('retails', ref => {
          return ref.orderBy('time')
        });
        this.retails = this.retailCollection.snapshotChanges().map(actions => {
          this.countItems = actions.length;
          return actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }));
        });;
      }
    });
  }

  createItem() {
    this.navCtrl.push('RetailCreatePage', {
      type: 'create'
    });
  }

  updateItem(key) {
    this.navCtrl.push('RetailCreatePage', {
      type: 'update',
      key: key
    });
  }

  deleteItem(key) {
    this.retailCollection.doc(key).delete();
  }

}
