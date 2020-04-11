import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Movimento } from 'src/app/models/movimento.model';
import { ActivatedRoute } from '@angular/router';
import { MovimentoService } from 'src/app/services/movimento.service';
import { NavController, AlertController } from '@ionic/angular';
import { LoadingUtils } from 'src/app/utils/loading.utils';

@Component({
  selector: 'app-detalhes-movimento',
  templateUrl: './detalhes-movimento.page.html'
})
export class DetalhesMovimentoPage implements OnInit {

  movimentoForm: FormGroup
  movimento: Movimento = null

  constructor(
      private fb: FormBuilder, 
      private activatedRoute: ActivatedRoute, 
      private movimentoService: MovimentoService,
      private navController: NavController,
      private alertController: AlertController,
      private loading: LoadingUtils) {
    this.initForm()
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData()
  }

  loadData(event: any = null): void {
    let movimentoId: number = this.activatedRoute.snapshot.params['id']

    this.loading.showLoading('Recuperando dados..')

    this.movimentoService.getById(movimentoId).subscribe((dados: Movimento) => {
      this.movimento = dados
      this.loadForm(dados)
      
      this.loading.dismissLoading()
    })
  }

  editar(): void {
    this.navController.navigateForward(`/movimentos/editar/${this.movimento.id}`)
  }

  remover(): void {
    this.alertController.create({
      header: 'Confirmar',
      message: 'Deseja realmente excluir este movimento?',
      buttons: [
        {text: 'Não'},
        {text: 'Sim', handler: () => 
          this.movimentoService.delete(this.movimento.id).subscribe(() => this.navController.navigateForward('/movimentos'))
        }
      ]
    }).then((alert) => alert.present())
  }

  hasCartaoCredito(): boolean {
    return this.movimento !== null ? Movimento.hasCartaoCredito(this.movimento) : false
  }

  doRefresh(event: any): void {
    this.loadData(event)
  }

  private initForm(): void {
    this.movimentoForm = this.fb.group({
      descricao: [{ value: '', disabled: true }],
      credito: [{ value: false, disabled: true }],
      dataInclusao: [{ value: false, disabled: true }],
      dataContabilizacao: [{ value: '', disabled: true }],
      valor: [{ value: '', disabled: true }],
      status: [{ value: '', disabled: true }],
      conta: [{ value: '', disabled: true }],
      categoria: [{ value: '', disabled: true }],
      subcategoria: [{ value: '', disabled: true }],
      cartao: [{ value: '', disabled: true }],
      fatura: [{ value: '', disabled: true }],
      projeto: [{ value: '', disabled: true }],
      obs: [{ value: '', disabled: true }]
    })
  }

  private loadForm(movimento: Movimento): void {
    let conta = (movimento.conta !== null) ? movimento.conta.nome : ''
    let categoria = (movimento.categoria !== null) ? movimento.categoria.nome : ''
    let subcategoria = (movimento.subcategoria !== null) ? movimento.subcategoria.nome : ''
    let cartao = (movimento.fatura !== null) ? movimento.fatura.cartao.nome : ''
    let fatura = (movimento.fatura !== null) ? movimento.fatura.referencia : ''
    let projeto = (movimento.projeto !== null) ? movimento.projeto.nome : ''

    this.descricao.setValue(movimento.descricao)
    this.credito.setValue(Movimento.isCredito(movimento))
    this.dataInclusao.setValue(movimento.dataInclusao)
    this.dataContabilizacao.setValue(movimento.dataContabilizacao)
    this.valor.setValue(movimento.valor)
    this.status.setValue(Movimento.transformStatus(movimento.status))
    this.conta.setValue(conta)
    this.categoria.setValue(categoria)
    this.subcategoria.setValue(subcategoria)
    this.cartao.setValue(cartao)
    this.fatura.setValue(fatura)
    this.projeto.setValue(projeto)
    this.obs.setValue(movimento.observacao)
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
