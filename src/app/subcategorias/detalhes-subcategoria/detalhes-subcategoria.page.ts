import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { ActivatedRoute } from '@angular/router';
import { Subcategoria } from 'src/app/models/subcategoria.model';
import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-detalhes-subcategoria',
  templateUrl: './detalhes-subcategoria.page.html'
})
export class DetalhesSubcategoriaPage implements OnInit {

  detailsForm: FormGroup
  subcategorias: Subcategoria

  constructor(private fb: FormBuilder, private subcategoriaService: SubcategoriaService, private activatedRoute: ActivatedRoute) {
    this.initForm()
  }

  ngOnInit() {
    this.loadData()
  }

  private loadData(event: any = null): void {
    let categoriaId: number = this.activatedRoute.snapshot.params['id']

    this.subcategoriaService.getById(categoriaId).subscribe((dados: Subcategoria) => {
      this.loadForm(dados)
      this.subcategorias = dados

      if(event !== null){
        event.target.complete()
      }
    })
  }

  doRefresh(event: any): void {
    this.loadData(event)
  }

  private initForm(): void {
    this.detailsForm = this.fb.group({
      nome: [{ value: '', disabled: true }],
      tipo: [{ value: '', disabled: true }],
      categoria: [{value: '', disabled: true}],
      editavel: [{ value: '', disabled: true }]
    })
  }

  private loadForm(subcategoria: Subcategoria): void {
    this.nome.setValue(subcategoria.nome)
    this.tipo.setValue((Categoria.isCredito(subcategoria.categoria) ? 'Crédito' : 'Débito'))
    this.categoria.setValue(subcategoria.categoria.nome)
    this.editavel.setValue(subcategoria.editavel)
  }

  get nome() { return this.detailsForm.get('nome') }
  get tipo() { return this.detailsForm.get('tipo') }
  get categoria() { return this.detailsForm.get('categoria') }
  get editavel() { return this.detailsForm.get('editavel') }
}
