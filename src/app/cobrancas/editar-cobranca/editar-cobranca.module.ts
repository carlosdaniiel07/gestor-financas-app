import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditarCobrancaPage } from './editar-cobranca.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouteGuard } from 'src/app/route.guard';

const routes: Routes = [
  {
    path: '',
    component: EditarCobrancaPage,
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
  declarations: [EditarCobrancaPage]
})
export class EditarCobrancaPageModule {}
