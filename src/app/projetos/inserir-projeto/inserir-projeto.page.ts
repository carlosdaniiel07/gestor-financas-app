import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjetoService } from 'src/app/services/projeto.service';
import { ProjetoDTO } from 'src/app/models/projeto.dto';
import { Projeto } from 'src/app/models/projeto.model';
import { ToastUtils } from 'src/app/utils/toast.utils';
import { DateUtils } from 'src/app/utils/date.utils';

@Component({
  selector: 'app-inserir-projeto',
  templateUrl: './inserir-projeto.page.html'
})
export class InserirProjetoPage implements OnInit {

  projetoForm: FormGroup

  constructor(private fb: FormBuilder, private projetoService: ProjetoService, private toast: ToastUtils) {
    this.initForm()
  }

  ngOnInit() {

  }

  inserir(): void {
    let projeto: ProjetoDTO = {
      nome: this.nome.value,
      dataFinal: DateUtils.toApiPattern(this.dataFinal.value),
      orcamento: this.orcamento.value,
      descricao: this.descricao.value
    }

    this.projetoService.insert(projeto).subscribe((dados: Projeto) => {
      this.projetoForm.reset()
      this.toast.showToast(`Projeto ${projeto.nome} criado`)
    })
  }

  getMinDate(): string {
    return DateUtils.getDatePickerMinDate()
  }

  getMaxDate(): string {
    return DateUtils.getDatePickerMaxDate()
  }

  private initForm(): void {
    this.projetoForm = this.fb.group({
      nome: ['', Validators.required],
      dataFinal: [''],
      orcamento: [''],
      descricao: ['']
    })
  }

  get nome() { return this.projetoForm.get('nome') }
  get dataFinal() { return this.projetoForm.get('dataFinal') }
  get orcamento() { return this.projetoForm.get('orcamento') }
  get descricao() { return this.projetoForm.get('descricao') }
}
