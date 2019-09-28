import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BeneficiariosPage } from './beneficiarios.page';
import { RouteGuard } from '../route.guard';
import { SharedModule } from '../shared/shared.module';
import { ListaBeneficiariosComponent } from './lista-beneficiarios/lista-beneficiarios.component';

const routes: Routes = [
  {path: '', component: BeneficiariosPage, canActivate: [ RouteGuard ]},
  {path: 'inserir', loadChildren: './inserir-beneficiario/inserir-beneficiario.module#InserirBeneficiarioPageModule', canLoad: [ RouteGuard ]},
  {path: 'editar/:id', loadChildren: './editar-beneficiario/editar-beneficiario.module#EditarBeneficiarioPageModule', canLoad: [ RouteGuard ]},
  {path: 'detalhes/:id', loadChildren: './detalhes-beneficiario/detalhes-beneficiario.module#DetalhesBeneficiarioPageModule', canLoad: [ RouteGuard ]}
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
    BeneficiariosPage,
    ListaBeneficiariosComponent
  ]
})
export class BeneficiariosPageModule {}
