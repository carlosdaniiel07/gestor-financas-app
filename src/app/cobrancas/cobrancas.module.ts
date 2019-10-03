import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CobrancasPage } from './cobrancas.page';
import { RouteGuard } from '../route.guard';
import { SharedModule } from '../shared/shared.module';
import { ListaCobrancasComponent } from './lista-cobrancas/lista-cobrancas.component';

const routes: Routes = [
  { path: '', component: CobrancasPage, canActivate: [ RouteGuard ] },
  { path: 'inserir', loadChildren: './inserir-cobranca/inserir-cobranca.module#InserirCobrancaPageModule', canLoad: [ RouteGuard ] },
  { path: 'editar/:id', loadChildren: './editar-cobranca/editar-cobranca.module#EditarCobrancaPageModule', canLoad: [ RouteGuard ] },
  { path: 'detalhes/:id', loadChildren: './detalhes-cobranca/detalhes-cobranca.module#DetalhesCobrancaPageModule', canLoad: [ RouteGuard ] },
  { path: 'pagar/:id', loadChildren: './pagar-cobranca/pagar-cobranca.module#PagarCobrancaPageModule', canLoad: [ RouteGuard ] },
  { path: 'remover/:id', loadChildren: './remover-cobranca/remover-cobranca.module#RemoverCobrancaPageModule', canLoad: [ RouteGuard ] }
]; 

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    CobrancasPage,
    ListaCobrancasComponent
  ]
})
export class CobrancasPageModule {}
