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
import { CartaoService } from './services/cartao.service';
import { FaturaService } from './services/fatura.service';
import { LoadingUtils } from './utils/loading.utils';
import { BeneficiarioService } from './services/beneficiario.service';
import { CobrancaService } from './services/cobranca.service';
import { TransferenciaService } from './services/transferencia.service';
import { InvestimentoService } from './services/investimento.service';
import { CorretoraService } from './services/corretora.service';
import { ModalidadeInvestimentoService } from './services/modalidade-investimento.service';
import { TaskService } from './services/task.service';

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
    CartaoService,
    FaturaService,
    BeneficiarioService,
    CobrancaService,
    TransferenciaService,
    InvestimentoService,
    CorretoraService,
    ModalidadeInvestimentoService,
    TaskService,
    ToastUtils,
    LoadingUtils,
    RouteGuard
  ]
})
export class CoreModule { }
