import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Fatura } from 'src/app/models/fatura.model';
import { Conta } from 'src/app/models/conta.model';
import { ContaService } from 'src/app/services/conta.service';
import { FaturaService } from 'src/app/services/fatura.service';
import { DateUtils } from 'src/app/utils/date.utils';
import { PagamentoFaturaDTO } from 'src/app/models/pagamento-fatura.dto';
import { ModalController } from '@ionic/angular';
import { ToastUtils } from 'src/app/utils/toast.utils';

@Component({
  selector: 'app-pagar-fatura',
  templateUrl: './pagar-fatura.component.html'
})
export class PagarFaturaComponent implements OnInit {

  pagamentoForm: FormGroup
  contas: Conta[] = []

  @Input() fatura: Fatura

  constructor(private fb: FormBuilder, private contaService: ContaService, private faturaService: FaturaService, private modalController: ModalController, private toast: ToastUtils) {
    this.initForm()
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadData()
  }

  closeModal(): void {
    this.modalController.dismiss()
  }

  inserir(): void {
    let pagamentoFatura: PagamentoFaturaDTO = {
      fatura: this.fatura,
      conta: this.contas.find((c: Conta) => c.id == this.conta.value),
      dataPagamento: DateUtils.toApiPattern(this.dataPagamento.value),
      valorPago: this.valorPago.value
    }

    this.faturaService.pay(pagamentoFatura).subscribe(() => {
      this.toast.showToast(`Fatura ${this.fatura.referencia} paga com sucesso`)
      this.closeModal()
    })
  }

  loadData(): void {
    this.loadForm(this.fatura)
    this.contaService.getAll().subscribe((dados: Conta[]) => this.contas = dados)
  }

  getMinDate(): string {
    return DateUtils.getDatePickerMinDate()
  }

  getMaxDate(): string {
    return DateUtils.getDatePickerMaxDate()
  }

  initForm(): void {
    this.pagamentoForm = this.fb.group({
      cartaoCredito: [{value: '', disabled: true}],
      referenciaFatura: [{value: '', disabled: true}],
      conta: ['', Validators.required],
      dataPagamento: ['', Validators.required],
      valorPago: ['', Validators.required]
    })
  }

  loadForm(fatura: Fatura): void {
    this.referenciaFatura.setValue(fatura.referencia)
    this.cartaoCredito.setValue(fatura.cartao.nome)
    this.valorPago.setValue(fatura.valor - fatura.valorPago)
  }

  get cartaoCredito() { return this.pagamentoForm.get('cartaoCredito') }
  get referenciaFatura() { return this.pagamentoForm.get('referenciaFatura') }
  get conta() { return this.pagamentoForm.get('conta') }
  get dataPagamento() { return this.pagamentoForm.get('dataPagamento') }
  get valorPago() { return this.pagamentoForm.get('valorPago') }
}
