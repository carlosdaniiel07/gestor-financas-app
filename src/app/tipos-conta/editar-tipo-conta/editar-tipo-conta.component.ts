import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TipoContaService } from 'src/app/services/tipo-conta.service';
import { TipoConta } from 'src/app/models/tipo-conta.model';
import { ToastUtils } from 'src/app/utils/toast.utils';

@Component({
  selector: 'app-editar-tipo-conta',
  templateUrl: './editar-tipo-conta.component.html'
})
export class EditarTipoContaComponent implements OnInit {

  tipoContaForm: FormGroup
  @Input() tipoConta: TipoConta

  constructor(private fb: FormBuilder, private modalController: ModalController, private tipoContaService: TipoContaService, private toast: ToastUtils) { 
    this.initForm()
  }

  ngOnInit() {
    this.loadForm(this.tipoConta)
  }

  closeModal(): void {
    this.modalController.dismiss()
  }

  atualizar(): void {
    this.tipoConta.nome = this.nome.value

    this.tipoContaService.update(this.tipoConta).subscribe(() => {
      this.toast.showToast('Tipo de conta atualizado')
      this.closeModal()
    })
  }

  private initForm(): void {
    this.tipoContaForm = this.fb.group({
      nome: ['', Validators.required]
    })
  }

  private loadForm(tipoConta: TipoConta): void {
    this.nome.setValue(tipoConta.nome)
  }

  get nome() { return this.tipoContaForm.get('nome') }
}
