import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InvestimentosPage } from './investimentos.page';
import { RouteGuard } from '../route.guard';
import { SharedModule } from '../shared/shared.module';
import { ListaInvestimentosComponent } from './lista-investimentos/lista-investimentos.component';

const routes: Routes = [
  {
    path: '',
    component: InvestimentosPage,
    canActivate: [RouteGuard]
  }
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
    InvestimentosPage,
    ListaInvestimentosComponent
  ]
})
export class InvestimentosPageModule {}
