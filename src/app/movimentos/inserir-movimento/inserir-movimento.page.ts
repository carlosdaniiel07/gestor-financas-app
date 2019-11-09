import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { STATUS, Movimento } from './../../models/movimento.model'
import { DateUtils } from 'src/app/utils/date.utils';
import { Conta } from 'src/app/models/conta.model';
import { Categoria } from 'src/app/models/categoria.model';
import { Subcategoria } from 'src/app/models/subcategoria.model';
import { Projeto } from 'src/app/models/projeto.model';
import { MovimentoService } from 'src/app/services/movimento.service';
import { ContaService } from 'src/app/services/conta.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProjetoService } from 'src/app/services/projeto.service';
import { ToastUtils } from 'src/app/utils/toast.utils';
import { CartaoService } from 'src/app/services/cartao.service';
import { Cartao } from 'src/app/models/cartao.model';
import { Fatura } from 'src/app/models/fatura.model';
import { MovimentoDTO } from 'src/app/models/movimento.dto';
import { LoadingUtils } from 'src/app/utils/loading.utils';

@Component({
  selector: 'app-inserir-movimento',
  templateUrl: './inserir-movimento.page.html'
})
export class InserirMovimentoPage implements OnInit {

  movimentoForm: FormGroup

  statusList: { label: string, value: any }[] = STATUS
  contas: Conta[] = []
  categorias: Categoria[] = []
  subcategorias: Subcategoria[] = []
  projetos: Projeto[] = []
  cartoes: Cartao[] = []
  faturas: Fatura[] = []

  constructor(private fb: FormBuilder,
    private movimentoService: MovimentoService,
    private contaService: ContaService,
    private categoriaService: CategoriaService,
    private projetoService: ProjetoService,
    private cartaoCreditoService: CartaoService,
    private toast: ToastUtils,
    private loading: LoadingUtils
  ) {
    this.initForm()
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData()
  }

  /**
   * Insere um novo movimento
   */
  inserir(): void {
    let movimento: MovimentoDTO = {
      descricao: this.descricao.value,
      tipo: this.isCreditoMovimento() ? 'C' : 'D',
      dataContabilizacao: DateUtils.toApiPattern(this.dataContabilizacao.value),
      valor: this.valor.value,
      acrescimo: 0,
      decrescimo: 0,
      status: this.status.value,
      observacao: this.obs.value,
      conta: this.hasCartaoCredito() ? null : this.contas.find((c: Conta) => c.id === this.conta.value),
      categoria: this.categorias.find((c: Categoria) => c.id === this.categoria.value),
      subcategoria: this.subcategorias.find((s: Subcategoria) => s.id === this.subcategoria.value),
      projeto: this.projetos.find((p: Projeto) => p.id === this.projeto.value),
      fatura: this.hasCartaoCredito() ? this.faturas.find((f: Fatura) => f.id === this.fatura.value) : null
    }

    this.loading.showLoading('Processando..')

    this.movimentoService.insert(movimento).subscribe(() => {
      this.loading.dismissLoading()
      this.toast.showToast('Movimento inserido')
      this.resetForm()
    })
  }

  /**
   * Verifica se o movimento que está sendo lançado é do tipo crédito (tipo = 'C')
   */
  isCreditoMovimento(): boolean {
    return this.credito.value
  }

  /**
   * Evento disparado quando a data de contabilização é alterada
   */
  onDataContabilizacaoChanges(): void {
    let dataContabilizacao: string = this.dataContabilizacao.value
    let novoStatus: string = ''

    if(DateUtils.isFuturo(dataContabilizacao)){
      novoStatus = Movimento.getStatusValueByLabel('Agendado')
    } else if (DateUtils.isPassado(dataContabilizacao)){
      novoStatus = Movimento.getStatusValueByLabel('Efetivado')
    } else {
      novoStatus = Movimento.getStatusValueByLabel('Pendente')
    }

    this.status.setValue(novoStatus)
  }

  /**
   * Evento disparado quando o tipo de movimento (campo Crédito) é alterado
   * @param event 
   */
  onCreditoChange(): void {
    let tipo: string = this.isCreditoMovimento() ? 'C' : 'D'

    this.categoria.setValue('')
    this.subcategoria.setValue('')
    this.subcategoria.disable()

    this.categoriaService.getAllByTipo(tipo).subscribe((dados: Categoria[]) => {
      this.categorias = dados

      if(dados.length === 0){
        this.toast.showToast('Nenhuma categoria cadastrada para este tipo de movimento')
      }
    })
  }

  /**
   * Evento disparado quando o valor do campo Categoria é alterado
   * @param event 
   */
  onCategoriaChange(): void {
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

  /**
   * Evento disparado quando o valor do campo 'Cartão de crédito' é alterado
   */
  onCartaoChange(): void {
    if(this.hasCartaoCredito()){
      let cartaoId: number = this.cartao.value
      this.cartaoCreditoService.getFaturas(cartaoId).subscribe((dados: Fatura[]) => this.faturas = dados)

      // Limpa e desabilita o campo 'Conta'
      this.conta.setValue('')
      this.conta.disable()

      // Altera o status p/ 'Efetivado'
      this.status.setValue(Movimento.getStatusValueByLabel('Efetivado'))
      this.status.disable()
    } else {
      this.conta.enable()
      this.status.enable()
    }
  }

  /**
   * Verifica se existe algum cartão de crédito selecionado
   */
  hasCartaoCredito(): boolean {
    return this.cartao.value !== null && this.cartao.value !== ''
  }

  /**
   * Reseta o formulário
   */
  resetForm(): void {
    this.movimentoForm.reset({
      credito: false,
      dataContabilizacao: DateUtils.getNowAsJson(),
      status: Movimento.getStatusValueByLabel('Pendente')
    })
  }

  /**
   * Data máxima para o componente date picker
   */
  getMaxDate(): string {
    return DateUtils.getDatePickerMaxDate()
  }

  doRefresh(event: any): void {
    this.loadData(event)
  }

  // showCartaoCreditoModal(): void {

  // }

  /**
   * Carrega os dados (contas, categorias, cartões, etc.)
   * @param event
   */
  private loadData(event: any = null): void {
    this.contaService.getAll().subscribe((dados: Conta[]) => this.contas = dados)
    this.categoriaService.getAllByTipo('D').subscribe((dados: Categoria[]) => this.categorias = dados)
    //this.subcategoriaService.getAll().subscribe((dados: Subcategoria[]) => this.subcategorias = dados)
    this.cartaoCreditoService.getAll().subscribe((dados: Cartao[]) => this.cartoes = dados)
    this.projetoService.getAll().subscribe((dados: Projeto[]) => {
      this.projetos = dados

      if (event !== null) {
        event.target.complete()
      }
    })
  }

  private initForm(): void {
    let defaultStatus = Movimento.getStatusValueByLabel('Pendente')

    this.movimentoForm = this.fb.group({
      descricao: ['', Validators.required],
      credito: [false, Validators.required],
      dataContabilizacao: [DateUtils.getNowAsJson(), Validators.required],
      valor: ['', Validators.required],
      status: [defaultStatus, Validators.required],
      conta: [''],
      categoria: [''],
      subcategoria: [{value: '', disabled: true}],
      cartao: [''],
      fatura: [''],
      projeto: [''],
      obs: ['']
    })
  }

  get descricao() { return this.movimentoForm.get('descricao') }
  get credito() { return this.movimentoForm.get('credito') }
  get dataContabilizacao() { return this.movimentoForm.get('dataContabilizacao') }
  get valor() { return this.movimentoForm.get('valor') }
  get status() { return this.movimentoForm.get('status') }
  get conta() { return this.movimentoForm.get('conta') }
  get categoria() { return this.movimentoForm.get('categoria') }
  get subcategoria() { return this.movimentoForm.get('subcategoria') }
  get cartao() { return this.movimentoForm.get('cartao') }
  get fatura() { return this.movimentoForm.get('fatura') }
  get projeto() { return this.movimentoForm.get('projeto') }
  get obs() { return this.movimentoForm.get('obs') }
}
