import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DateUtils } from 'src/app/utils/date.utils';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalidadeInvestimento } from 'src/app/models/modalidade-investimento.model';
import { Corretora } from 'src/app/models/corretora.model';
import { TIPO_INVESTIMENTO, Investimento } from 'src/app/models/investimento.model'
import { InvestimentoDTO } from 'src/app/models/investimento.dto';
import { InvestimentoService } from 'src/app/services/investimento.service';

@Component({
  selector: 'app-inserir-investimento',
  templateUrl: './inserir-investimento.component.html'
})
export class InserirInvestimentoComponent implements OnInit {

  investimentoForm: FormGroup
  tiposInvestimento: {label: string, value: any}[] = TIPO_INVESTIMENTO

  @Input() modalidadesInvestimento: ModalidadeInvestimento[]
  @Input() corretoras: Corretora[]

  constructor(private modalController: ModalController, private fb: FormBuilder, private investimentoService: InvestimentoService) {
    this.initForm()
  }

  ngOnInit() {}

  closeModal(data: any = null): void {
    this.modalController.dismiss(data)
  }

  getMaxDate(): string {
    return DateUtils.getDatePickerMaxDate()
  }

  inserir(): void {
    let objDTO: InvestimentoDTO = {
      descricao: this.investimentoForm.get('descricao').value,
      tipo: this.investimentoForm.get('tipo').value,
      dataAplicacao: DateUtils.toApiPattern(this.investimentoForm.get('dataAplicacao').value),
      dataVencimento: DateUtils.toApiPattern(this.investimentoForm.get('dataVencimento').value),
      modalidade: this.modalidadesInvestimento.find((m: ModalidadeInvestimento) => m.id == this.investimentoForm.get('modalidade').value),
      corretora: this.corretoras.find((c: Corretora) => c.id == this.investimentoForm.get('corretora').value),
      valorAplicado: this.investimentoForm.get('valor').value,
      obs: this.investimentoForm.get('obs').value 
    }

    this.investimentoService.insert(objDTO).subscribe((dados: Investimento) => this.closeModal(dados))
  }

  private initForm(): void {
    this.investimentoForm = this.fb.group({
      descricao: ['', Validators.required],
      tipo: ['', Validators.required],
      dataAplicacao: [DateUtils.getNowAsJson(), Validators.required],
      dataVencimento: [''],
      modalidade: ['', Validators.required],
      corretora: ['', Validators.required],
      valor: ['', Validators.required],
      obs: ['']
    })
  }
}
