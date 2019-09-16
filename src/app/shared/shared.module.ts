import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { IonicModule } from '@ionic/angular';
import { ListaMovimentosComponent } from './lista-movimentos/lista-movimentos.component';
import { CreditCardDayPipe } from '../pipes/credit-card-day.pipe';
import { ListaComponent } from './lista-movimentos/lista/lista.component';
import { AlertaComponent } from './lista-movimentos/alerta/alerta.component';

@NgModule({
  declarations: [
    PageHeaderComponent,
    ListaMovimentosComponent,
    CreditCardDayPipe,
    ListaComponent,
    AlertaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    PageHeaderComponent,
    ListaMovimentosComponent,
    CreditCardDayPipe,
    ListaComponent,
    AlertaComponent
  ]
})
export class SharedModule { }
