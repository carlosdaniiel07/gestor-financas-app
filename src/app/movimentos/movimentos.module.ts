import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MovimentosPage } from './movimentos.page';
import { RouteGuard } from '../route.guard';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: MovimentosPage, canActivate:  [ RouteGuard ] },
  { path: 'inserir',  loadChildren: './inserir-movimento/inserir-movimento.module#InserirMovimentoPageModule', canLoad: [ RouteGuard ] },
  { path: 'detalhes/:id',  loadChildren: './detalhes-movimento/detalhes-movimento.module#DetalhesMovimentoPageModule', canLoad: [ RouteGuard ] },
  { path: 'editar/:id',  loadChildren: './editar-movimento/editar-movimento.module#EditarMovimentoPageModule', canLoad: [ RouteGuard ] }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [MovimentosPage]
})
export class MovimentosPageModule {}
