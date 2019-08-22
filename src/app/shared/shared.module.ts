import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { IonicModule } from '@ionic/angular';
import { MovimentsComponent } from './moviments/moviments.component';

@NgModule({
  declarations: [
    PageHeaderComponent,
    MovimentsComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    PageHeaderComponent,
    MovimentsComponent
  ]
})
export class SharedModule { }
