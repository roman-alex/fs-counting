import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Retail} from "../../models/retail";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase/app";


@IonicPage()
@Component({
  selector: 'page-retail-create',
  templateUrl: 'retail-create.html',
})
export class RetailCreatePage {
  timeNow: any;
  private retailCollection: AngularFirestoreCollection<Retail>;
  private form : FormGroup;
  itemRetail: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    public toastCtrl: ToastController) {
      this.timeNow = this.today();
      this.afAuth.authState.subscribe((user: firebase.User) => {
        if (user) {
          this.retailCollection = this.afs.doc<any>(`users/${user.uid}`).collection<Retail>(`retails`);
        }
        if(this.navParams.data.type === 'update') {
          this.retailCollection.doc(this.navParams.data.key).valueChanges().subscribe(data => {
            this.itemRetail =  data;
            this.form = this.formBuilder.group({
              description: [ this.itemRetail.description || '' , Validators.required],
              retail: [ this.itemRetail.retail || '', Validators.required],
              wholesale: [ this.itemRetail.wholesale || '', Validators.required],
              surcharge: [ this.itemRetail.surcharge || '', Validators.required],
              time: [  this.itemRetail.time || this.timeNow, Validators.required]
            });
          });
        }
      });
      this.form = this.formBuilder.group({
        description: [ '' , Validators.required],
        retail: [ '', Validators.required],
        wholesale: [ '', Validators.required],
        surcharge: [ '', Validators.required],
        time: [ this.timeNow, Validators.required]
      });
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

  retailForm(){
    if(this.navParams.data.type === 'create') {
      this.retailCollection.add(this.form.value).then(res => {
        let toast = this.toastCtrl.create({
          message: 'Позиция создана. Можете создать еще.',
          duration: 2000,
          position: 'top'
        });
        toast.present();
        this.form.controls.description.reset();
        this.form.controls.retail.reset();
        this.form.controls.wholesale.reset();
      });
    } else if(this.navParams.data.type === 'update') {
      this.retailCollection.doc(this.navParams.data.key).update(this.form.value);
      let toast = this.toastCtrl.create({
        message: 'Позиция обновлена',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      this.navCtrl.pop();
    } else {
      let toast = this.toastCtrl.create({
        message: 'Не найден тип операции',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    }
  }

}
