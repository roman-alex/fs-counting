import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WholesaleListPage } from './wholesale-list';

@NgModule({
  declarations: [
    WholesaleListPage,
  ],
  imports: [
    IonicPageModule.forChild(WholesaleListPage),
  ],
})
export class WholesaleListPageModule {}
