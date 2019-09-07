import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategoriasPage } from './categorias.page';
import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';
import { SharedModule } from '../shared/shared.module';
import { RouteGuard } from '../route.guard';
import { ListaMovimentosComponent } from '../shared/lista-movimentos/lista-movimentos.component';

const routes: Routes = [
  { path: '', component: CategoriasPage, canActivate: [ RouteGuard ] },
  { path: 'detalhes/:id', loadChildren: './detalhes-categoria/detalhes-categoria.module#DetalhesCategoriaPageModule', canLoad: [ RouteGuard ] },
  { path: 'inserir', loadChildren: './inserir-categoria/inserir-categoria.module#InserirCategoriaPageModule', canLoad: [ RouteGuard ] },
  { path: 'editar/:id', loadChildren: './editar-categoria/editar-categoria.module#EditarCategoriaPageModule', canLoad: [ RouteGuard ] }
];

@NgModule({
  entryComponents: [
    ListaMovimentosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    CategoriasPage,
    ListaCategoriasComponent
  ]
})
export class CategoriasPageModule {}
