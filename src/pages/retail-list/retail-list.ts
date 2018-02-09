import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Retail} from "../../models/retail";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase/app";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

@IonicPage()
@Component({
  selector: 'page-retail-list',
  templateUrl: 'retail-list.html',
})
export class RetailListPage {

  private retailCollection: AngularFirestoreCollection<Retail>;
  retails: Observable<any[]>;
  countItems: number;
  income: number;
  retail: number;
  wholesale: number;
  surcharge: number;
  fromDate: string;
  toDate: string;
  dateFilter$ = new BehaviorSubject(null);

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.fromDate = this.tomonth();
        this.toDate = this.today();
        this.retailCollection = this.afs.doc<any>(`users/${user.uid}`).collection<Retail>(`retails`);
        this.getRetails(user.uid);
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

  getRetails(uid) {
    this.retails = Observable.combineLatest(
      this.dateFilter$
    ).switchMap(() =>
      this.afs.doc<any>(`users/${uid}`).collection<Retail>('retails', ref => {
        if(this.toDate === this.fromDate) {
          return ref.where('time', '==', this.fromDate);
        } else {
          return ref.where('time', '<=', this.toDate).where('time', '>=', this.fromDate).orderBy('time', 'desc');
        }
      }).snapshotChanges().map(actions => {
        this.countItems = actions.length;
        this.income = 0;
        this.retail = 0;
        this.wholesale = 0;
        this.surcharge = 0;
        actions.map(action => {
          this.income = this.income + (action.payload.doc.data().retail - action.payload.doc.data().wholesale - action.payload.doc.data().surcharge);
          this.retail = this.retail + (+action.payload.doc.data().retail);
          this.wholesale = this.wholesale + (+action.payload.doc.data().wholesale);
          this.surcharge = this.surcharge + (+action.payload.doc.data().surcharge);
        });
        return actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }));
      })
    );
  }

  searchByDate() {
    this.dateFilter$.next(null);
  }

  today() {
    let today: any = new Date();
    let dd: any = today.getDate();
    let mm: any = today.getMonth()+1;
    let yyyy: any = today.getFullYear();
    if(dd<10){
      dd='0'+dd;
    }
    if(mm<10){
      mm='0'+mm;
    }
    today = yyyy+'-'+mm+'-'+dd;
    return today;
  }

  tomonth() {
    let today: any = new Date();
    let mm: any = today.getMonth()+1;
    let yyyy: any = today.getFullYear();
    if(mm<10){
      mm='0'+mm;
    }
    today = yyyy+'-'+mm+'-'+'01';
    return today;
  }

}
