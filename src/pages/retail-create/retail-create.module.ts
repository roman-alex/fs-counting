import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RetailCreatePage } from './retail-create';

@NgModule({
  declarations: [
    RetailCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(RetailCreatePage),
  ],
})
export class RetailCreatePageModule {}
