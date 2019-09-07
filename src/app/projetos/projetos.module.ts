import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProjetosPage } from './projetos.page';
import { RouteGuard } from '../route.guard';
import { ListaProjetosComponent } from './lista-projetos/lista-projetos.component';
import { SharedModule } from '../shared/shared.module';
import { ListaMovimentosComponent } from '../shared/lista-movimentos/lista-movimentos.component';

const routes: Routes = [
  { path: '', component: ProjetosPage, canActivate: [ RouteGuard ] },
  { path: 'inserir', loadChildren: './inserir-projeto/inserir-projeto.module#InserirProjetoPageModule', canLoad: [ RouteGuard ] },
  { path: 'detalhes/:id', loadChildren: './detalhes-projeto/detalhes-projeto.module#DetalhesProjetoPageModule', canLoad: [ RouteGuard ] },
  { path: 'editar/:id', loadChildren: './editar-projeto/editar-projeto.module#EditarProjetoPageModule', canLoad: [ RouteGuard ] }
];

@NgModule({
  entryComponents: [
    ListaMovimentosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    ProjetosPage,
    ListaProjetosComponent
  ]
})
export class ProjetosPageModule {}
