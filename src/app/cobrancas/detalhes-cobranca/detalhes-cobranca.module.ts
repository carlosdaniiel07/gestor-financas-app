import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalhesCobrancaPage } from './detalhes-cobranca.page';
import { RouteGuard } from 'src/app/route.guard';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: DetalhesCobrancaPage,
    canActivate: [ RouteGuard ]
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
  declarations: [DetalhesCobrancaPage]
})
export class DetalhesCobrancaPageModule {}
