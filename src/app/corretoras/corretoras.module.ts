import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CorretorasPage } from './corretoras.page';
import { RouteGuard } from '../route.guard';
import { SharedModule } from '../shared/shared.module';
import { ListaCorretorasComponent } from './lista-corretoras/lista-corretoras.component';
import { InserirCorretoraComponent } from './inserir-corretora/inserir-corretora.component';

const routes: Routes = [
  {
    path: '',
    component: CorretorasPage,
    canActivate: [ RouteGuard ]
  }
];

@NgModule({
  entryComponents: [
    InserirCorretoraComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    CorretorasPage,
    ListaCorretorasComponent,
    InserirCorretoraComponent
  ]
})
export class CorretorasPageModule {}
