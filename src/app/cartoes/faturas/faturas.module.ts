import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FaturasPage } from './faturas.page';
import { RouteGuard } from 'src/app/route.guard';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListaFaturasComponent } from './lista-faturas/lista-faturas.component';
import { InserirFaturaComponent } from './inserir-fatura/inserir-fatura.component';
import { ListaMovimentosComponent } from 'src/app/shared/lista-movimentos/lista-movimentos.component';
import { PagarFaturaComponent } from './pagar-fatura/pagar-fatura.component';

const routes: Routes = [
  {
    path: '',
    component: FaturasPage,
    canActivate: [ RouteGuard ]
  }
];

@NgModule({
  entryComponents: [
    InserirFaturaComponent,
    ListaMovimentosComponent,
    PagarFaturaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    FaturasPage,
    ListaFaturasComponent,
    InserirFaturaComponent,
    PagarFaturaComponent
  ]
})
export class FaturasPageModule {}
