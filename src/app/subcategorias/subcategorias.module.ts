import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SubcategoriasPage } from './subcategorias.page';
import { SharedModule } from '../shared/shared.module';
import { ListaSubcategoriasComponent } from './lista-subcategorias/lista-subcategorias.component';
import { RouteGuard } from '../route.guard';
import { ListaMovimentosComponent } from '../shared/lista-movimentos/lista-movimentos.component';

const routes: Routes = [
  { path: '', component: SubcategoriasPage, canActivate: [ RouteGuard ] },
  { path: 'detalhes/:id', loadChildren: './detalhes-subcategoria/detalhes-subcategoria.module#DetalhesSubcategoriaPageModule', canLoad: [ RouteGuard ] },
  { path: 'inserir', loadChildren: './inserir-subcategoria/inserir-subcategoria.module#InserirSubcategoriaPageModule', canLoad: [ RouteGuard ] },
  { path: 'editar/:id', loadChildren: './editar-subcategoria/editar-subcategoria.module#EditarSubcategoriaPageModule', canLoad: [ RouteGuard ] }
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
    SubcategoriasPage,
    ListaSubcategoriasComponent
  ]
})
export class SubcategoriasPageModule {}
