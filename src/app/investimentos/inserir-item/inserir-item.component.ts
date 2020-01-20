import { Component, OnInit, Input } from '@angular/core';
import { Investimento } from 'src/app/models/investimento.model';
import { DateUtils } from 'src/app/utils/date.utils';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvestimentoService } from 'src/app/services/investimento.service';
import { ItemInvestimento } from 'src/app/models/item-investimento.model';
import { ToastUtils } from 'src/app/utils/toast.utils';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-inserir-item',
  templateUrl: './inserir-item.component.html'
})
export class InserirItemComponent implements OnInit {

  itemForm: FormGroup

  @Input() investimento: Investimento
  @Input() isAplicacao: boolean

  constructor(private fb: FormBuilder, private investimentoService: InvestimentoService, private toast: ToastUtils, private modalController: ModalController) {
    this.initForm()
  }

  ngOnInit() {}

  closeModal(data: any = null): void {
    this.modalController.dismiss(data)
  }

  inserir(): void {
    let objDto: {investimento: Investimento, item: ItemInvestimento} = {
      investimento: this.investimento,
      item: {
        id: null,
        descricao: this.itemForm.get('investimento').value,
        data: DateUtils.toApiPattern(this.itemForm.get('data').value),
        valor: this.itemForm.get('valor').value,
        ir: this.itemForm.get('ir').value,
        iof: this.itemForm.get('iof').value,
        outrasTaxas: this.itemForm.get('outrasTaxas').value,
        rendimento: this.itemForm.get('rendimento').value,
        tipo: this.isAplicacao ? 'REINVESTIMENTO' : 'RESGATE'
      }
    }

    this.investimentoService.addItem(objDto.investimento, objDto.item).subscribe((dados: Investimento) => {
      this.toast.showToast('Item incluído com sucesso')
      this.closeModal(dados)
    })
  }

  ionViewWillEnter() {
    this.itemForm.get('investimento').setValue(this.investimento.descricao)
  }

  getMaxDate(): string {
    return DateUtils.getDatePickerMaxDate()
  }

  private initForm(): void {
    this.itemForm = this.fb.group({
      investimento: [{ value: '', disabled: true }, Validators.required],
      descricao: ['', Validators.required],
      data: [DateUtils.getNowAsJson(), Validators.required],
      valor: ['', Validators.required],
      ir: [''],
      iof: [''],
      outrasTaxas: [''],
      rendimento: ['']
    })
  }
}
