import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { ToastUtils } from './utils/toast.utils';
import { RouteGuard } from './route.guard';
import { CategoriaService } from './services/categoria.service';
import { SubcategoriaService } from './services/subcategoria.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    CategoriaService,
    SubcategoriaService,
    ToastUtils,
    RouteGuard
  ]
})
export class CoreModule { }
