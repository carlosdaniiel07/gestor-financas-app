import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CobrancaService } from 'src/app/services/cobranca.service';
import { ContaService } from 'src/app/services/conta.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProjetoService } from 'src/app/services/projeto.service';
import { CartaoService } from 'src/app/services/cartao.service';
import { Conta } from 'src/app/models/conta.model';
import { Categoria } from 'src/app/models/categoria.model';
import { Subcategoria } from 'src/app/models/subcategoria.model';
import { Projeto } from 'src/app/models/projeto.model';
import { Cartao } from 'src/app/models/cartao.model';
import { Fatura } from 'src/app/models/fatura.model';
import { ToastUtils } from 'src/app/utils/toast.utils';
import { Cobranca } from 'src/app/models/cobranca.model';
import { DateUtils } from 'src/app/utils/date.utils';
import { CobrancaPagamentoDTO } from 'src/app/models/cobranca-pagamento.dto';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pagar-cobranca',
  templateUrl: './pagar-cobranca.page.html'
})
export class PagarCobrancaPage implements OnInit {

  cobrancaForm: FormGroup
  cobranca: Cobranca

  contas: Conta[] = []
  categorias: Categoria[] = []
  subcategorias: Subcategoria[] = []
  projetos: Projeto[] = []
  cartoes: Cartao[] = []
  faturas: Fatura[] = []
  
  constructor(private fb: FormBuilder, 
              private activatedRoute: ActivatedRoute,
              private navController: NavController, 
              private cobrancaService: CobrancaService,
              private contaService: ContaService,
              private categoriaService: CategoriaService,
              private projetoService: ProjetoService,
              private cartaoService: CartaoService,
              private toast: ToastUtils) {
      this.initForm()
  }
  
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData()
  }

  doRefresh(event: any): void {
    this.loadData(event)
  }

  pagar(): void {
    let cobrancaPagamento: CobrancaPagamentoDTO = {
      cobranca: this.cobranca,
      dataPagamento: DateUtils.toApiPattern(this.dataPagamento.value),
      conta: this.contas.find((c: Conta) => c.id === this.conta.value),
      valorPago: this.valor.value,
      categoria: this.categorias.find((c: Categoria) => c.id === this.categoria.value),
      subcategoria: this.subcategorias.find((s: Subcategoria) => s.id === this.subcategoria.value),
      projeto: this.projetos.find((p: Projeto) => p.id === this.projeto.value),
      fatura: this.faturas.find((f: Fatura) => f.id === this.fatura.value)
    }

    this.cobrancaService.pay(cobrancaPagamento).subscribe(() => {
      this.cobrancaForm.reset()
      this.toast.showToast('Cobrança paga')
      this.navController.navigateForward('/cobrancas')
    })
  }

  onCategoriaChange(event: any): void {
    if(this.categoria.value !== null && this.categoria.value !== ''){
      let categoriaId: number = this.categoria.value

      this.categoriaService.getSubcategorias(categoriaId).subscribe((dados: Subcategoria[]) => {
        this.subcategorias = dados
        
        if(dados.length === 0){
          this.toast.showToast('Não há nenhuma subcategoria para esta categoria')
          this.subcategoria.disable()
        } else {
          this.subcategoria.enable()
        }
      })
    }
  }

  onCartaoChange(event: any): void {
    if(this.hasCartaoCredito()){
      this.cartaoService.getFaturas(this.cartao.value).subscribe((dados: Fatura[]) => {
        this.faturas = dados

        if(dados.length > 0){
          this.fatura.enable()
        } else {
          this.toast.showToast(`Nenhuma fatura encontrada para o cartão de crédito ${this.faturas[0].cartao.nome}`)
          this.fatura.disable()
        }
      })
    }
  }

  hasCartaoCredito(): boolean {
    return this.cartao.value !== null && this.cartao.value !== ''
  }

  getMaxDate(): string {
    return DateUtils.getDatePickerMaxDate()
  }

  private loadData(event: any = null): void {
    // Carrega os dados da cobrança
    let cobrancaId: number = this.activatedRoute.snapshot.params['id']

    this.cobrancaService.getById(cobrancaId).subscribe((dados: Cobranca) => {
      this.cobranca = dados
      
      this.descricao.setValue(dados.descricao)
      this.valor.setValue(dados.saldo)
    })

    // Carrega outros dados
    this.contaService.getAll().subscribe((dados: Conta[]) => this.contas = dados)
    this.categoriaService.getAll().subscribe((dados: Categoria[]) => this.categorias = dados)
    this.projetoService.getAll().subscribe((dados: Projeto[]) => {
      this.projetos = dados
    
      if(event !== null){
        event.target.complete()
      }
    })
  }

  private initForm(): void {
    this.cobrancaForm = this.fb.group({
      descricao: ['', Validators.required],
      dataPagamento: ['', Validators.required],
      conta: [''],
      valor: ['', Validators.required],
      categoria: [''],
      subcategoria: [{value: '', disabled: true}],
      projeto: [''],
      cartao: [],
      fatura: [{value: '', disabled: true}]
    })
  }

  get descricao() { return this.cobrancaForm.get('descricao') }
  get dataPagamento() { return this.cobrancaForm.get('dataPagamento') }
  get conta() { return this.cobrancaForm.get('conta') }
  get valor() { return this.cobrancaForm.get('valor') }
  get categoria() { return this.cobrancaForm.get('categoria') }
  get subcategoria() { return this.cobrancaForm.get('subcategoria') }
  get projeto() { return this.cobrancaForm.get('projeto') }
  get cartao() { return this.cobrancaForm.get('cartao') }
  get fatura() { return this.cobrancaForm.get('fatura') }  
}
