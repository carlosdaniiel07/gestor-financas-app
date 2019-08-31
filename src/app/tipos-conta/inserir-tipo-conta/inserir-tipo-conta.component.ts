import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoContaService } from 'src/app/services/tipo-conta.service';
import { TipoContaDTO } from 'src/app/models/tipo-conta.dto';
import { TipoConta } from 'src/app/models/tipo-conta.model';
import { ToastUtils } from 'src/app/utils/toast.utils';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-inserir-tipo-conta',
  templateUrl: './inserir-tipo-conta.component.html'
})
export class InserirTipoContaComponent implements OnInit {

  tipoContaForm: FormGroup

  constructor(private fb: FormBuilder, private tipoContaService: TipoContaService, private toast: ToastUtils, private modalController: ModalController) {
    this.initForm()
  }

  ngOnInit() {}

  closeModal(): void {
    this.modalController.dismiss()
  }

  inserir(): void {
    let tipoConta: TipoContaDTO = { nome: this.nome.value }

    this.tipoContaService.insert(tipoConta).subscribe((dados: TipoConta) => {
      this.toast.showToast(`Tipo de conta ${tipoConta.nome} criado`)
      this.tipoContaForm.reset()
    })
  }

  private initForm(): void {
    this.tipoContaForm = this.fb.group({
      nome: ['', Validators.required]
    })
  }

  get nome() { return this.tipoContaForm.get('nome') }
}
