import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CobrancaService } from 'src/app/services/cobranca.service';
import { Cobranca } from 'src/app/models/cobranca.model';

@Component({
  selector: 'app-detalhes-cobranca',
  templateUrl: './detalhes-cobranca.page.html'
})
export class DetalhesCobrancaPage implements OnInit {

  cobrancaForm: FormGroup
  cobranca: Cobranca

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private cobrancaService: CobrancaService) {
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

  private loadData(event: any = null): void {
    let cobrancaId: number = this.activatedRoute.snapshot.params['id']

    this.cobrancaService.getById(cobrancaId).subscribe((dados: Cobranca) => {
      this.cobranca = dados
      this.loadForm(dados)

      if(event !== null){
        event.target.complete()
      }
    })
  }

  private loadForm(cobranca: Cobranca): void {
    this.descricao.setValue(cobranca.descricao)
    this.parcela.setValue(cobranca.parcela)
    this.dataVencimento.setValue(cobranca.dataVencimento)
    this.dataAgendamento.setValue(cobranca.dataAgendamento)
    this.dataPagamento.setValue(cobranca.dataPagamento)
    this.valor.setValue(cobranca.valor)
    this.saldo.setValue(cobranca.saldo)
    this.juros.setValue(cobranca.juros)
    this.desconto.setValue(cobranca.desconto)
    this.beneficiario.setValue(cobranca.beneficiario.id)
    this.status.setValue(Cobranca.transformStatus(cobranca.status))
    this.obs.setValue(cobranca.observacao)
  }

  private initForm(): void {
    this.cobrancaForm = this.fb.group({
      descricao: [{value: '', disabled: true}],
      parcela: [{value: '', disabled: true}],
      dataVencimento: [{value: '', disabled: true}],
      dataAgendamento: [{value: '', disabled: true}],
      dataPagamento: [{value: '', disabled: true}],
      valor: [{value: '', disabled: true}],
      saldo: [{value: '', disabled: true}],
      juros: [{value: '', disabled: true}],
      desconto: [{value: '', disabled: true}],
      beneficiario: [{value: '', disabled: true}],
      status: [{value: '', disabled: true}],
      obs: [{value: '', disabled: true}]
    })
  }

  get descricao() { return this.cobrancaForm.get('descricao') }
  get parcela() { return this.cobrancaForm.get('parcela') }
  get dataVencimento() { return this.cobrancaForm.get('dataVencimento') }
  get dataAgendamento() { return this.cobrancaForm.get('dataAgendamento') }
  get dataPagamento() { return this.cobrancaForm.get('dataPagamento') }
  get valor() { return this.cobrancaForm.get('valor') }
  get juros() { return this.cobrancaForm.get('juros') }
  get desconto() { return this.cobrancaForm.get('desconto') }
  get saldo() { return this.cobrancaForm.get('saldo') }
  get beneficiario() { return this.cobrancaForm.get('beneficiario') }
  get status() { return this.cobrancaForm.get('status') }
  get obs() { return this.cobrancaForm.get('obs') }

}
