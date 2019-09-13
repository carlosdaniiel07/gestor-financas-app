import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Cartao } from 'src/app/models/cartao.model';
import { CartaoService } from 'src/app/services/cartao.service';
import { FaturaDTO } from 'src/app/models/fatura.dto';
import { FaturaService } from 'src/app/services/fatura.service';
import { ToastUtils } from 'src/app/utils/toast.utils';
import { Fatura } from 'src/app/models/fatura.model';
import { DateUtils } from 'src/app/utils/date.utils';

@Component({
  selector: 'app-inserir-fatura',
  templateUrl: './inserir-fatura.component.html'
})
export class InserirFaturaComponent implements OnInit {

  faturaForm: FormGroup
  cartao: Cartao

  maxDate: string = DateUtils.getDatePickerMaxDate()
  monthShortNames: string[] = DateUtils.getMonthShortNames()

  @Input() cartaoid: number

  constructor(private fb: FormBuilder, private modalController: ModalController, private cartaoService: CartaoService, private faturaSerivce: FaturaService, private toast: ToastUtils) {
    this.initForm()
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.loadData()
  }

  closeModal(faturaCriada: Fatura = null): void {
    this.modalController.dismiss(faturaCriada)
  }

  inserir(): void {
    let fatura: FaturaDTO = {
      referencia: DateUtils.getReference(this.referencia.value),
      cartao: this.cartao  
    }

    this.faturaSerivce.insert(fatura).subscribe((dados: Fatura) => {
      this.toast.showToast(`Fatura ${dados.referencia} criada`)
      this.faturaForm.reset()
      this.closeModal(dados)
    })
  }

  private loadData(): void {
    this.cartaoService.getById(this.cartaoid).subscribe((dados: Cartao) => {
      this.cartao = dados
      this.cartaoCredito.setValue(dados.nome)
    })
  }

  private initForm(): void {
    this.faturaForm = this.fb.group({
      cartaoCredito: [{ value: '', disabled: true }],
      referencia: ['', Validators.required]
    })
  }

  get cartaoCredito() { return this.faturaForm.get('cartaoCredito') }
  get referencia() { return this.faturaForm.get('referencia') }
}
