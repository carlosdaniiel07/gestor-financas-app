import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CategoriaDTO } from 'src/app/models/categoria.dto';
import { Categoria } from 'src/app/models/categoria.model';
import { ToastUtils } from 'src/app/utils/toast.utils';

@Component({
  selector: 'app-inserir-categoria',
  templateUrl: './inserir-categoria.page.html'
})
export class InserirCategoriaPage implements OnInit {

  categoriaForm: FormGroup

  constructor(private fb: FormBuilder, private categoriaService: CategoriaService, private toast: ToastUtils) {
    this.initForm()
  }

  ngOnInit() {
  }

  private initForm(): void {
    this.categoriaForm = this.fb.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
    })
  }

  inserir(): void {
    let categoria: CategoriaDTO = { nome: this.nome.value, tipo: this.tipo.value}

    this.categoriaService.insert(categoria).subscribe((categoriaGerada: Categoria) => {
      this.toast.showToast(`Categoria ${categoria.nome} salva`)
      this.categoriaForm.reset()
    })
  }

  get nome() { return this.categoriaForm.get('nome') }
  get tipo() { return this.categoriaForm.get('tipo') }
}
