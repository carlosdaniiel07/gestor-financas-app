import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalhesCategoriaPage } from './detalhes-categoria.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovimentsComponent } from 'src/app/shared/moviments/moviments.component';
import { DetalhesCategoriaGeralComponent } from './detalhes-categoria-geral/detalhes-categoria-geral.component';
import { RouteGuard } from 'src/app/route.guard';

const routes: Routes = [
  {
    path: '',
    component: DetalhesCategoriaPage, children: [
      {path: '', redirectTo: 'geral', pathMatch: 'full'},
      {path: 'geral', component: DetalhesCategoriaGeralComponent, canActivate: [ RouteGuard ]},
      {path: 'movimentos', component: MovimentsComponent, canActivate: [ RouteGuard ]}
    ],
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
  declarations: [
    DetalhesCategoriaPage, 
    DetalhesCategoriaGeralComponent
  ]
})
export class DetalhesCategoriaPageModule {}
