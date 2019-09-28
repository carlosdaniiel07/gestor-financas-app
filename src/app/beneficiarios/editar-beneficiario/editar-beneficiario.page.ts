import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BeneficiarioService } from 'src/app/services/beneficiario.service';
import { ActivatedRoute } from '@angular/router';
import { ToastUtils } from 'src/app/utils/toast.utils';
import { Beneficiario } from 'src/app/models/beneficiario.model';

@Component({
  selector: 'app-editar-beneficiario',
  templateUrl: './editar-beneficiario.page.html'
})
export class EditarBeneficiarioPage implements OnInit {

  beneficiarioForm: FormGroup
  beneficiario: Beneficiario

  constructor(private fb: FormBuilder, private beneficiarioService: BeneficiarioService, private activatedRoute: ActivatedRoute, private toast: ToastUtils) {
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

  atualizar(): void {
    this.beneficiario.nome = this.nome.value
    this.beneficiario.banco = this.banco.value
    this.beneficiario.agencia = this.agencia.value
    this.beneficiario.conta = this.conta.value
    this.beneficiario.limite = this.limite.value
    this.beneficiario.observacao = this.obs.value

    this.beneficiarioService.update(this.beneficiario).subscribe(() => this.toast.showToast('Beneficiário atualizado'))
  }

  private loadData(event: any = null): void {
    let beneficiarioId: number = this.activatedRoute.snapshot.params['id']

    this.beneficiarioService.getById(beneficiarioId).subscribe((dados: Beneficiario) => {
      this.beneficiario = dados
      this.loadForm(dados)

      if(event !== null){
        event.target.complete()
      }
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

  private loadForm(beneficiario: Beneficiario): void {
    this.nome.setValue(beneficiario.nome)
    this.banco.setValue(beneficiario.banco)
    this.agencia.setValue(beneficiario.agencia)
    this.conta.setValue(beneficiario.conta)
    this.limite.setValue(beneficiario.limite)
    this.obs.setValue(beneficiario.observacao)
  }

  get nome() { return this.beneficiarioForm.get('nome') }
  get banco() { return this.beneficiarioForm.get('banco') }
  get agencia() { return this.beneficiarioForm.get('agencia') }
  get conta() { return this.beneficiarioForm.get('conta') }
  get limite() { return this.beneficiarioForm.get('limite') }
  get obs() { return this.beneficiarioForm.get('obs') }
}
