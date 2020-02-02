import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CorretoraService } from 'src/app/services/corretora.service';
import { ContaService } from 'src/app/services/conta.service';
import { Conta } from 'src/app/models/conta.model';
import { ToastUtils } from 'src/app/utils/toast.utils';
import { Corretora } from 'src/app/models/corretora.model';

@Component({
  selector: 'app-inserir-corretora',
  templateUrl: './inserir-corretora.component.html',
})
export class InserirCorretoraComponent implements OnInit {

  showCloseButton: boolean = true
  corretoraForm: FormGroup
  contas: Conta[] = []

  constructor(private modalController: ModalController, private fb: FormBuilder, private corretoraService: CorretoraService, private contaService: ContaService, private toast: ToastUtils) {
    this.initForm()
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadData()
  }

  closeModal(): void {
    this.modalController.dismiss()
  }

  initForm(): void {
    this.corretoraForm = this.fb.group({
      conta: ['', Validators.required]
    })
  }

  loadData(): void {
    this.contaService.getAll().subscribe((dados: Conta[]) => this.contas = dados)
  }

  inserir(): void {
    let contaOrigem = this.contas.find((c: Conta) => c.id == this.corretoraForm.get('conta').value)
    let corretora: Corretora = {
      id: null,
      nome: contaOrigem.nome,
      banco: contaOrigem.banco,
      agencia: contaOrigem.agencia,
      conta: contaOrigem.conta,
      rendimentoTotal: 0,
      valorAplicado: 0,
      ativo: true
    }

    this.corretoraService.insert(corretora).subscribe((dados: Corretora) => {
      this.toast.showToast('Corretora inserida com sucesso')
      this.closeModal()
    })
  }
}
