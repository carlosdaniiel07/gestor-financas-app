import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TransferenciasPage } from './transferencias.page';
import { RouteGuard } from '../route.guard';
import { SharedModule } from '../shared/shared.module';
import { ListaTransferenciaComponent } from './lista-transferencia/lista-transferencia.component';
import { InserirTransferenciaComponent } from './inserir-transferencia/inserir-transferencia.component';
import { ContasBotoesComponent } from './inserir-transferencia/contas/contas-botoes.component';

const routes: Routes = [
  {
    path: '',
    component: TransferenciasPage,
    canActivate: [ RouteGuard ]
  }
];

@NgModule({
  entryComponents: [
    InserirTransferenciaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    TransferenciasPage,
    ListaTransferenciaComponent,
    InserirTransferenciaComponent,
    ContasBotoesComponent
  ]
})
export class TransferenciasPageModule {}
