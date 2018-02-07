import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-retail-list',
  templateUrl: 'retail-list.html',
})
export class RetailListPage {

  private retailCollection: AngularFirestoreCollection<any>;
  retails: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: AngularFirestore ) {
    this.retailCollection = afs.collection<any>('retails');
    this.retails = this.retailCollection.valueChanges();
  }

  createItem() {
    this.navCtrl.push('RetailCreatePage');
  }

}
