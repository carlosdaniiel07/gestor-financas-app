import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CategoriaService } from 'src/app/services/categoria.service';

import { Categoria } from 'src/app/models/categoria.model';
import { ToastUtils } from 'src/app/utils/toast.utils';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.page.html'
})
export class EditarCategoriaPage implements OnInit {

  editForm: FormGroup
  categoria: Categoria

  constructor(private fb: FormBuilder, private categoriaService: CategoriaService, private activatedRoute: ActivatedRoute, private toast: ToastUtils) {
    this.initForm()
  }

  ngOnInit() {
    this.loadData()
  }

  atualizar(): void {
    this.categoria.nome = this.nome.value
    this.categoria.tipo = this.tipo.value

    this.categoriaService.update(this.categoria).subscribe(() => this.toast.showToast('Categoria atualizada'))
  }

  private loadData(): void {
    let categoriaId: number = this.activatedRoute.snapshot.parent.params['id']

    this.categoriaService.getById(categoriaId).subscribe((dados: Categoria) => {
      this.loadForm(dados)
      this.categoria = dados
    })
  }

  private initForm(): void {
    this.editForm = this.fb.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required]
    })
  }

  private loadForm(categoria: Categoria): void {
    this.nome.setValue(categoria.nome)
    this.tipo.setValue(categoria.tipo)
  }

  get nome() { return this.editForm.get('nome') }
  get tipo() { return this.editForm.get('tipo') }
}
