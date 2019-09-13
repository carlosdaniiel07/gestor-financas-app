import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { IonicModule } from '@ionic/angular';
import { ListaMovimentosComponent } from './lista-movimentos/lista-movimentos.component';
import { CreditCardDayPipe } from '../pipes/credit-card-day.pipe';

@NgModule({
  declarations: [
    PageHeaderComponent,
    ListaMovimentosComponent,
    CreditCardDayPipe
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    PageHeaderComponent,
    ListaMovimentosComponent,
    CreditCardDayPipe
  ]
})
export class SharedModule { }
