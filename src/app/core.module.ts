import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { ToastUtils } from './utils/toast.utils';
import { RouteGuard } from './route.guard';
import { CategoriaService } from './services/categoria.service';
import { SubcategoriaService } from './services/subcategoria.service';
import { ContaService } from './services/conta.service';
import { TipoContaService } from './services/tipo-conta.service';
import { MovimentoService } from './services/movimento.service';
import { ProjetoService } from './services/projeto.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    CategoriaService,
    SubcategoriaService,
    ContaService,
    TipoContaService,
    MovimentoService,
    ProjetoService,
    ToastUtils,
    RouteGuard
  ]
})
export class CoreModule { }
