import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecuperarSenhaDTO } from 'src/app/models/recuperar-senha.dto';
import { AuthService } from 'src/app/services/auth.service';
import { ToastUtils } from 'src/app/utils/toast.utils';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html'
})
export class RecuperarSenhaComponent implements OnInit {

  recuperarSenhaForm: FormGroup

  @Input() loginOuEmail: string = '' 

  constructor(private fb: FormBuilder, private modalController: ModalController, private authService: AuthService, private toast: ToastUtils) {
    this.initForm()
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadForm(this.loginOuEmail)
  }

  initForm(): void {
    this.recuperarSenhaForm = this.fb.group({
      loginOuEmail: ['', Validators.required]
    })
  }

  loadForm(loginOuEmail: string): void {
    this.recuperarSenhaForm.get('loginOuEmail').setValue(loginOuEmail)
  }

  enviar(): void {
    let recuperarSenhaDTO: RecuperarSenhaDTO = {
      loginOuEmail: this.recuperarSenhaForm.get('loginOuEmail').value
    }

    this.authService.recuperaSenha(recuperarSenhaDTO).subscribe(() => {
      this.recuperarSenhaForm.reset()
      this.toast.showToast('A nova senha foi enviada para o e-mail cadastrado')
      this.closeModal()
    })
  }

  closeModal(): void {
    this.modalController.dismiss()
  }
}
