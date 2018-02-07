import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RetailListPage } from './retail-list';

@NgModule({
  declarations: [
    RetailListPage,
  ],
  imports: [
    IonicPageModule.forChild(RetailListPage),
  ],
})
export class RetailListPageModule {}
