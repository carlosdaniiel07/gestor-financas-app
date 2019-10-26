import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Conta } from 'src/app/models/conta.model';
import { ContaService } from 'src/app/services/conta.service';
import { TransferenciaDTO } from 'src/app/models/transferencia.dto';
import { DateUtils } from 'src/app/utils/date.utils';
import { STATUS, Transferencia } from 'src/app/models/transferencia.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferenciaService } from 'src/app/services/transferencia.service';
import { ToastUtils } from 'src/app/utils/toast.utils';

@Component({
  selector: 'app-inserir-transferencia',
  templateUrl: './inserir-transferencia.component.html'
})
export class InserirTransferenciaComponent implements OnInit {

  contas: Conta[] = []
  statusList: { value: string, label: string }[] = STATUS

  contaOrigemSelecionada: boolean = false
  contaDestinoSelecionada: boolean = false
  contaOrigem: Conta = null
  contaDestino: Conta = null

  transfForm: FormGroup

  constructor(private fb: FormBuilder, private modalController: ModalController, private contaService: ContaService, private transferenciaService: TransferenciaService, private toast: ToastUtils) {
    this.initForm()
  }

  ngOnInit() { }

  closeModal(): void {
    this.modalController.dismiss()
  }

  ionViewWillEnter() {
    this.loadContas()
  }

  inserir(): void {
    let transferencia: TransferenciaDTO = {
      descricao: this.transfForm.get('descricao').value,
      valor: this.transfForm.get('valor').value,
      taxa: this.transfForm.get('taxa').value,
      dataContabilizacao: DateUtils.toApiPattern(this.transfForm.get('dataContabilizacao').value),
      status: this.transfForm.get('status').value,
      observacao: this.transfForm.get('obs').value,
      contaOrigem: this.contaOrigem,
      contaDestino: this.contaDestino
    }
    
    this.transferenciaService.insert(transferencia).subscribe((dados: Transferencia) => {
      this.toast.showToast('Transferência incluída')
      this.transfForm.reset()
      this.voltarParaSelecao()
    })
  }

  onSelecionarConta(conta: Conta): void {
    if (!this.contaOrigemSelecionada) {
      this.contaOrigem = conta
      this.contaOrigemSelecionada = true
    } else {
      this.contaDestino = conta
      this.contaDestinoSelecionada = true

      // Preenche o campo 'descrição' com base nas contas selecionadas
      let descricao: string = `Transferência ${this.contaOrigem.nome} x ${this.contaDestino.nome}`
      this.transfForm.get('descricao').setValue(descricao)
    }
  }

  /**
   * Volta para o menu de seleção de contas
   */
  voltarParaSelecao(): void {
    this.contaOrigem = null
    this.contaDestino = null

    this.contaOrigemSelecionada = false
    this.contaDestinoSelecionada= false
  }

  /**
   * Retorn o nome da conta de origem, se existir..
   */
  getOrigemNome(): string {
    return (this.contaOrigemSelecionada) ? this.contaOrigem.nome : ''
  }

  /**
   * Retorna o nome da conta de destino, se existir..
   */
  getDestinoNome(): string {
    return (this.contaDestinoSelecionada) ? this.contaDestino.nome : ''
  }

  getMaxDate(): string {
    return DateUtils.getDatePickerMaxDate()
  }

  private initForm(): void {
    this.transfForm = this.fb.group({
      descricao: ['', Validators.required],
      valor: ['', Validators.required],
      taxa: [''],
      dataContabilizacao: ['', Validators.required],
      status: ['', Validators.required],
      obs: ['']
    })
  }

  private loadContas(): void {
    this.contaService.getAll().subscribe((dados: Conta[]) => this.contas = dados)
  }
}
