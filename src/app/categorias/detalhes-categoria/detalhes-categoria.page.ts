import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CategoriaService } from 'src/app/services/categoria.service';

import { Categoria } from 'src/app/models/categoria.model';
import { Subcategoria } from 'src/app/models/subcategoria.model';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalhes-categoria',
  templateUrl: './detalhes-categoria.page.html'
})
export class DetalhesCategoriaPage implements OnInit {

  detailsForm: FormGroup

  categoria: Categoria
  subcategorias: Subcategoria[] = []

  constructor(private fb: FormBuilder, private categoriaService: CategoriaService, private subcategoriaService: SubcategoriaService, private activatedRoute: ActivatedRoute, private navController: NavController) {
    this.initForm()
  }

  ngOnInit() {
    this.loadData()
  }

  private loadData(): void {
    let categoriaId: number = this.activatedRoute.snapshot.parent.params['id']

    // Carrega dados da categoria
    this.categoriaService.getById(categoriaId).subscribe((dados: Categoria) => {
      this.loadForm(dados)
      this.categoria = dados
    })

    // Carrega as subcategorias
    this.categoriaService.getSubcategorias(categoriaId).subscribe((dados: Subcategoria[]) => this.subcategorias = dados)
  }

  hasSubcategorias(): boolean {
    return this.subcategorias.length > 0
  }

  removerSubcategoria(subcategoria: Subcategoria): void {
    this.subcategoriaService.delete(subcategoria.id).subscribe(() =>
      this.subcategorias.splice(this.subcategorias.indexOf(subcategoria), 1)
    )
  }

  editarSubcategoria(subcategoria: Subcategoria): void {
    this.navController.navigateForward(`/subcategorias/editar/${subcategoria.id}`)
  }

  private initForm(): void {
    this.detailsForm = this.fb.group({
      nome: [{ value: '', disabled: true }],
      tipo: [{ value: '', disabled: true }],
      editavel: [{ value: '', disabled: true }]
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
