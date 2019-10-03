import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BeneficiarioService } from 'src/app/services/beneficiario.service';
import { ToastUtils } from 'src/app/utils/toast.utils';
import { BeneficiarioDTO } from 'src/app/models/beneficiario.dto';
import { Beneficiario } from 'src/app/models/beneficiario.model';

@Component({
  selector: 'app-inserir-beneficiario',
  templateUrl: './inserir-beneficiario.page.html'
})
export class InserirBeneficiarioPage implements OnInit {

  beneficiarioForm: FormGroup

  constructor(private fb: FormBuilder, private beneficiarioService: BeneficiarioService, private toast: ToastUtils) {
    this.initForm()
  }

  ngOnInit() {
  }

  inserir(): void {
    let beneficiario: BeneficiarioDTO = {
      nome: this.nome.value,
      banco: this.banco.value,
      agencia: this.agencia.value,
      conta: this.conta.value,
      limite: this.limite.value,
      observacao: this.obs.value
    }

    this.beneficiarioService.insert(beneficiario).subscribe((dados: Beneficiario) => {
      this.beneficiarioForm.reset()
      this.toast.showToast(`Beneficiário ${dados.nome} inserido`)
    })
  }

  private initForm(): void {
    this.beneficiarioForm = this.fb.group({
      nome: ['', Validators.required],
      banco: [''],
      agencia: [''],
      conta: [''],
      limite: [''],
      obs: ['']
    })
  }

  get nome() { return this.beneficiarioForm.get('nome') }
  get banco() { return this.beneficiarioForm.get('banco') }
  get agencia() { return this.beneficiarioForm.get('agencia') }
  get conta() { return this.beneficiarioForm.get('conta') }
  get limite() { return this.beneficiarioForm.get('limite') }
  get obs() { return this.beneficiarioForm.get('obs') }
}
