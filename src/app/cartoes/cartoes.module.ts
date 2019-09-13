import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CartoesPage } from './cartoes.page';
import { RouteGuard } from '../route.guard';
import { SharedModule } from '../shared/shared.module';
import { ListaCartoesComponent } from './lista-cartoes/lista-cartoes.component';

const routes: Routes = [
  {path: '', component: CartoesPage, canActivate: [ RouteGuard ]},
  {path: 'inserir', loadChildren: './inserir-cartao/inserir-cartao.module#InserirCartaoPageModule', canLoad: [ RouteGuard ] },
  {path: 'editar/:id', loadChildren: './editar-cartao/editar-cartao.module#EditarCartaoPageModule', canLoad: [ RouteGuard ] },
  {path: 'detalhes/:id/faturas', loadChildren: './faturas/faturas.module#FaturasPageModule', canLoad: [ RouteGuard ] }
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
    CartoesPage,
    ListaCartoesComponent
  ]
})
export class CartoesPageModule {}
