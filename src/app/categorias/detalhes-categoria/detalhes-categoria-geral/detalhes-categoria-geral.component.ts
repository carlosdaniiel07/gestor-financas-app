import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes-categoria-geral',
  templateUrl: './detalhes-categoria-geral.component.html'
})
export class DetalhesCategoriaGeralComponent implements OnInit {

  detailsForm: FormGroup
  categoria: Categoria

  constructor(private fb: FormBuilder, private categoriaService: CategoriaService, private activatedRoute: ActivatedRoute) {
    this.initForm()
  }

  ngOnInit() {
    this.loadData()
  }

  private loadData(): void {
    let categoriaId: number = this.activatedRoute.snapshot.parent.params['id']

    this.categoriaService.getById(categoriaId).subscribe((dados: Categoria) => {
      this.loadForm(dados)
      this.categoria = dados
    })
  }

  private initForm(): void {
    this.detailsForm = this.fb.group({
      nome: [{value: '', disabled: true}],
      tipo: [{value: '', disabled: true}],
      editavel: [{value: '', disabled: true}]
    })
  }

  private loadForm(categoria: Categoria): void {
    this.nome.setValue(categoria.nome)
    this.tipo.setValue((Categoria.isCredito(categoria) ? 'Crédito' : 'Débito'))
    this.editavel.setValue(categoria.editavel)
  }

  get nome() { return this.detailsForm.get('nome') }
  get tipo() { return this.detailsForm.get('tipo') }
  get editavel() { return this.detailsForm.get('editavel') }
}
