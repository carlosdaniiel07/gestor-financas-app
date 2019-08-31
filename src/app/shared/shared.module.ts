import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { IonicModule } from '@ionic/angular';
import { ListaMovimentosComponent } from './lista-movimentos/lista-movimentos.component';

@NgModule({
  declarations: [
    PageHeaderComponent,
    ListaMovimentosComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    PageHeaderComponent,
    ListaMovimentosComponent
  ]
})
export class SharedModule { }
