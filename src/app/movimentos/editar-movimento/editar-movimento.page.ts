import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movimento, STATUS } from 'src/app/models/movimento.model';
import { ActivatedRoute } from '@angular/router';
import { MovimentoService } from 'src/app/services/movimento.service';
import { Conta } from 'src/app/models/conta.model';
import { Categoria } from 'src/app/models/categoria.model';
import { Subcategoria } from 'src/app/models/subcategoria.model';
import { Projeto } from 'src/app/models/projeto.model';
import { Cartao } from 'src/app/models/cartao.model';
import { Fatura } from 'src/app/models/fatura.model';
import { ContaService } from 'src/app/services/conta.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { ProjetoService } from 'src/app/services/projeto.service';
import { CartaoService } from 'src/app/services/cartao.service';
import { ToastUtils } from 'src/app/utils/toast.utils';
import { DateUtils } from 'src/app/utils/date.utils';
import { LoadingUtils } from 'src/app/utils/loading.utils';

@Component({
  selector: 'app-editar-movimento',
  templateUrl: './editar-movimento.page.html'
})
export class EditarMovimentoPage implements OnInit {

  movimentoForm: FormGroup
  movimento: Movimento

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
    private subcategoriaService: SubcategoriaService,
    private projetoService: ProjetoService,
    private cartaoCreditoService: CartaoService,
    private activatedRoute: ActivatedRoute,
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

  doRefresh(event: any): void {
    this.loadData(event)
  }

  /**
   * Atualiza os dados de um movimento
   */
  atualizar(): void {
    this.movimento.descricao = this.descricao.value
    this.movimento.tipo = this.isCreditoMovimento() ? 'C' : 'D'
    this.movimento.dataContabilizacao = DateUtils.toApiPattern(this.dataContabilizacao.value)
    this.movimento.valor = this.valor.value
    this.movimento.acrescimo = 0
    this.movimento.decrescimo = 0
    this.movimento.status = this.status.value
    this.movimento.observacao = this.obs.value
    this.movimento.conta = this.hasCartaoCredito() ? null : this.contas.find((c: Conta) => c.id === this.conta.value),
    this.movimento.categoria = this.categorias.find((c: Categoria) => c.id === this.categoria.value)
    this.movimento.subcategoria = this.subcategorias.find((s: Subcategoria) => s.id === this.subcategoria.value),
    this.movimento.projeto = this.projetos.find((p: Projeto) => p.id === this.projeto.value),
    this.movimento.fatura =  this.hasCartaoCredito() ? this.faturas.find((f: Fatura) => f.id === this.fatura.value) : null
  
    this.loading.showLoading('Processando..')

    this.movimentoService.update(this.movimento).subscribe(() => {
      this.loading.dismissLoading()
      this.toast.showToast('Movimento atualizado')
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
    if(this.categoria.value !== ''){
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
    this.movimentoForm.reset()
  }

  /**
   * Data máxima para o componente date picker
   */
  getMaxDate(): string {
    return DateUtils.getDatePickerMaxDate()
  }

  /**
   * Carrega os dados (contas, categorias, cartões, etc.)
   * @param event
   */
  private loadData(event: any = null): void {
    let movimentoId: number = this.activatedRoute.snapshot.params['id']

    this.movimentoService.getById(movimentoId).subscribe((dados: Movimento) => {
      this.movimento = dados
      this.loadForm(dados)
    })

    this.contaService.getAll().subscribe((dados: Conta[]) => this.contas = dados)
    this.categoriaService.getAll().subscribe((dados: Categoria[]) => this.categorias = dados)
    this.subcategoriaService.getAll().subscribe((dados: Subcategoria[]) => this.subcategorias = dados)
    this.cartaoCreditoService.getAll().subscribe((dados: Cartao[]) => this.cartoes = dados)
    this.projetoService.getAll().subscribe((dados: Projeto[]) => {
      this.projetos = dados

      if (event !== null) {
        event.target.complete()
      }
    })
  }

  private loadForm(movimento: Movimento): void {
    let conta = (movimento.conta !== null) ? movimento.conta.id : ''
    let categoria = (movimento.subcategoria !== null) ? movimento.subcategoria.categoria.id : ''
    let subcategoria = (movimento.subcategoria !== null) ? movimento.subcategoria.id : ''
    let cartao = (movimento.fatura !== null) ? movimento.fatura.cartao.id : ''
    let fatura = (movimento.fatura !== null) ? movimento.fatura.id : ''
    let projeto = (movimento.projeto !== null) ? movimento.projeto.id : ''

    this.descricao.setValue(movimento.descricao)
    this.credito.setValue(Movimento.isCredito(movimento))
    this.dataInclusao.setValue(movimento.dataInclusao)
    this.dataContabilizacao.setValue(movimento.dataContabilizacao)
    this.valor.setValue(movimento.valor)
    this.status.setValue(movimento.status)
    this.conta.setValue(conta)
    this.categoria.setValue(categoria)
    this.subcategoria.setValue(subcategoria)
    this.cartao.setValue(cartao)
    this.fatura.setValue(fatura)
    this.projeto.setValue(projeto)
    this.obs.setValue(movimento.observacao)
  }

  private initForm(): void {
    this.movimentoForm = this.fb.group({
      descricao: ['', Validators.required],
      credito: [false, Validators.required],
      dataInclusao: [{ value: '', disabled: true }],
      dataContabilizacao: ['', Validators.required],
      valor: ['', Validators.required],
      status: ['', Validators.required],
      conta: [''],
      categoria: [''],
      subcategoria: [''],
      cartao: [''],
      fatura: [''],
      projeto: [''],
      obs: ['']
    })
  }

  get descricao() { return this.movimentoForm.get('descricao') }
  get credito() { return this.movimentoForm.get('credito') }
  get dataInclusao() { return this.movimentoForm.get('dataInclusao') }
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
