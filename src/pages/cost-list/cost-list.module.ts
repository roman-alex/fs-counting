import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CostListPage } from './cost-list';

@NgModule({
  declarations: [
    CostListPage,
  ],
  imports: [
    IonicPageModule.forChild(CostListPage),
  ],
})
export class CostListPageModule {}
