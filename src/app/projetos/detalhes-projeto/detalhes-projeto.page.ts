import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjetoService } from 'src/app/services/projeto.service';
import { ActivatedRoute } from '@angular/router';
import { Projeto } from 'src/app/models/projeto.model';

@Component({
  selector: 'app-detalhes-projeto',
  templateUrl: './detalhes-projeto.page.html'
})
export class DetalhesProjetoPage implements OnInit {

  projetoForm: FormGroup
  projeto: Projeto

  constructor(private fb: FormBuilder, private projetoService: ProjetoService, private activatedRoute: ActivatedRoute) {
    this.initForm()
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData()
  } 

  private loadData(event: any = null): void {
    let projetoId: number = this.activatedRoute.snapshot.params['id']

    this.projetoService.getById(projetoId).subscribe((dados: Projeto) => {
      this.loadForm(dados)
      this.projeto = dados

      if (event !== null) {
        event.target.complete()
      }
    })
  }

  doRefresh(event: any): void {
    this.loadData(event)
  }

  private loadForm(projeto: Projeto): void {
    this.nome.setValue(projeto.nome)
    this.status.setValue(Projeto.transformStatus(projeto.status))
    this.dataInicial.setValue(projeto.dataInicial)
    this.dataFinal.setValue(projeto.dataFinal)
    this.orcamento.setValue(projeto.orcamento)
    this.descricao.setValue(projeto.descricao)
  }

  private initForm(): void {
    this.projetoForm = this.fb.group({
      nome: [{value: '', disabled: true}],
      status: [{value: '', disabled: true}],
      dataInicial: [{value: '', disabled: true}],
      dataFinal: [{value: '', disabled: true}],
      orcamento: [{value: '', disabled: true}],
      descricao: [{value: '', disabled: true}]
    })
  }

  get nome() { return this.projetoForm.get('nome') }
  get status() { return this.projetoForm.get('status') }
  get dataInicial() { return this.projetoForm.get('dataInicial') }
  get dataFinal() { return this.projetoForm.get('dataFinal') }
  get orcamento() { return this.projetoForm.get('orcamento') }
  get descricao() { return this.projetoForm.get('descricao') }
}
