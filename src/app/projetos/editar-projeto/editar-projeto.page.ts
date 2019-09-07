import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjetoService } from 'src/app/services/projeto.service';
import { Projeto, STATUS } from 'src/app/models/projeto.model';
import { ToastUtils } from 'src/app/utils/toast.utils';
import { DateUtils } from 'src/app/utils/date.utils';

@Component({
  selector: 'app-editar-projeto',
  templateUrl: './editar-projeto.page.html'
})
export class EditarProjetoPage implements OnInit {

  projetoForm: FormGroup
  projeto: Projeto
  statusOptions: any[] = STATUS

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private projetoService: ProjetoService, private toast: ToastUtils) {
    this.initForm()
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData()
  }

  atualizar(): void {
    this.projeto.nome = this.nome.value
    this.projeto.status = this.status.value
    this.projeto.dataFinal = DateUtils.toApiPattern(this.dataFinal.value)
    this.projeto.orcamento = this.orcamento.value
    this.projeto.descricao = this.descricao.value

    this.projetoService.update(this.projeto).subscribe(() => this.toast.showToast('Projeto atualizado'))
  }

  private loadData(): void {
    let projetoId: number = this.activatedRoute.snapshot.params['id']

    this.projetoService.getById(projetoId).subscribe((dados: Projeto) => {
      this.loadForm(dados)
      this.projeto = dados  
    })
  }

  private loadForm(projeto: Projeto): void {
    this.nome.setValue(projeto.nome)
    this.status.setValue(projeto.status)
    this.dataInicial.setValue(projeto.dataInicial)
    this.dataFinal.setValue(projeto.dataFinal)
    this.orcamento.setValue(projeto.orcamento)
    this.descricao.setValue(projeto.descricao)
  }

  private initForm(): void {
    this.projetoForm = this.fb.group({
      nome: ['', Validators.required],
      status: ['', Validators.required],
      dataInicial: [{value: '', disabled: true}],
      dataFinal: [''],
      orcamento: [''],
      descricao: ['']
    })
  }

  get nome() { return this.projetoForm.get('nome') }
  get status() { return this.projetoForm.get('status') }
  get dataInicial() { return this.projetoForm.get('dataInicial') }
  get dataFinal() { return this.projetoForm.get('dataFinal') }
  get orcamento() { return this.projetoForm.get('orcamento') }
  get descricao() { return this.projetoForm.get('descricao') }
}
