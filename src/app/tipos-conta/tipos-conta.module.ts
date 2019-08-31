import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TiposContaPage } from './tipos-conta.page';
import { SharedModule } from '../shared/shared.module';
import { RouteGuard } from '../route.guard';
import { ListaTiposContaComponent } from './lista-tipos-conta/lista-tipos-conta.component';
import { InserirTipoContaComponent } from './inserir-tipo-conta/inserir-tipo-conta.component';
import { EditarTipoContaComponent } from './editar-tipo-conta/editar-tipo-conta.component';

const routes: Routes = [
  { path: '', component: TiposContaPage, canActivate: [ RouteGuard ]}
];

@NgModule({
  entryComponents: [
    InserirTipoContaComponent,
    EditarTipoContaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    TiposContaPage,
    ListaTiposContaComponent,
    InserirTipoContaComponent,
    EditarTipoContaComponent
  ]
})
export class TiposContaPageModule {}
