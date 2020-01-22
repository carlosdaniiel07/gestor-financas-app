import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { SharedModule } from '../shared/shared.module';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';
import { ConfigPageComponent } from './config-page/config-page.component';

@NgModule({
  entryComponents: [
    MeuPerfilComponent,
    ConfigPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    SharedModule
  ],
  declarations: [
    HomePage,
    MeuPerfilComponent,
    ConfigPageComponent
  ]
})
export class HomePageModule {}
