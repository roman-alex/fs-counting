import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";


@IonicPage()
@Component({
  selector: 'page-retail-create',
  templateUrl: 'retail-create.html',
})
export class RetailCreatePage {

  timeNow: any;
  private retailCollection: AngularFirestoreCollection<any>;
  private form : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private afs: AngularFirestore) {

    this.retailCollection = afs.collection<any>('retails');
    this.timeNow = this.today();

    this.form = this.formBuilder.group({
      description: ['', Validators.required],
      retail: ['', Validators.required],
      wholesale: ['', Validators.required],
      surcharge: ['', Validators.required],
      time: [ this.timeNow, Validators.required]
    });
  }

  today() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    if(dd<10){
      dd='0'+dd;
    }
    if(mm<10){
      mm='0'+mm;
    }
    today = yyyy+'-'+mm+'-'+dd;
    return today;
  }

  retailForm(){
    this.retailCollection.add(this.form.value);
  }

}
