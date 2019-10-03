import { Component, OnInit } from '@angular/core';
import { DateUtils } from 'src/app/utils/date.utils';
import { CobrancaService } from 'src/app/services/cobranca.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BeneficiarioService } from 'src/app/services/beneficiario.service';
import { ToastUtils } from 'src/app/utils/toast.utils';
import { Beneficiario } from 'src/app/models/beneficiario.model';
import { CobrancaDTO } from 'src/app/models/cobranca.dto';
import { Cobranca } from 'src/app/models/cobranca.model';

@Component({
  selector: 'app-inserir-cobranca',
  templateUrl: './inserir-cobranca.page.html'
})
export class InserirCobrancaPage implements OnInit {

  cobrancaForm: FormGroup
  beneficiarios: Beneficiario[] = []

  constructor(private fb: FormBuilder, private cobrancaService: CobrancaService, private beneficiarioService: BeneficiarioService, private toast: ToastUtils) {
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

  inserir(): void {
    let cobranca: CobrancaDTO = {
      descricao: this.descricao.value,
      parcela: this.parcela.value,
      dataVencimento: DateUtils.toApiPattern(this.dataVencimento.value),
      valor: this.valor.value,
      juros: this.juros.value,
      desconto: this.desconto.value,
      beneficiario: this.beneficiarios.find((b: Beneficiario) => b.id === this.beneficiario.value),
      observacao: this.obs.value
    }

    this.cobrancaService.insert(cobranca).subscribe((dados: Cobranca) => {
      this.toast.showToast(`Cobrança ${dados.descricao} inserida`)
      this.cobrancaForm.reset()
    })
  }

  private loadData(event: any = null): void {
    this.beneficiarioService.getAll().subscribe((dados: Beneficiario[]) => {
      this.beneficiarios = dados

      if(dados.length === 0){
        this.toast.showToast('Nenhum beneficiário cadastrado')
        this.beneficiario.disable()
      }

      if(event !== null){
        event.target.complete()
      }
    })
  }

  getMaxDate(): string {
    return DateUtils.getDatePickerMaxDate()
  }

  private initForm(): void {
    this.cobrancaForm = this.fb.group({
      descricao: ['', Validators.required],
      parcela: [''],
      dataVencimento: ['', Validators.required],
      valor: ['', Validators.required],
      juros: [''],
      desconto: [''],
      beneficiario: ['', Validators.required],
      obs: ['']
    })
  }

  get descricao() { return this.cobrancaForm.get('descricao') }
  get parcela() { return this.cobrancaForm.get('parcela') }
  get dataVencimento() { return this.cobrancaForm.get('dataVencimento') }
  get valor() { return this.cobrancaForm.get('valor') }
  get juros() { return this.cobrancaForm.get('juros') }
  get desconto() { return this.cobrancaForm.get('desconto') }
  get beneficiario() { return this.cobrancaForm.get('beneficiario') }
  get obs() { return this.cobrancaForm.get('obs') }
}
