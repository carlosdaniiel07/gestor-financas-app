import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';

import { APP_CONFIG } from '../app.config';

import { ToastUtils } from '../utils/toast.utils';

import { AutenticacaoDTO } from '../models/autenticacao.dto';
import { Usuario } from '../models/usuario.model';

@Injectable()
export class AuthService {

    private logado: boolean = false
    private token: string = ''
    private usuarioLogado: Usuario = null
    
    constructor(private http: HttpClient, private navController: NavController, private toast: ToastUtils) {}

    login(credenciais: AutenticacaoDTO): void {
        let requestBody = JSON.stringify(credenciais)
        let headers = new HttpHeaders().append('Content-Type', 'application/json')

        this.http.post(`${APP_CONFIG.apiUrl}/login`, requestBody, {headers: headers, observe: 'response'}).subscribe((res: HttpResponse<Usuario>) => {
            this.logado = true
            this.token = res.headers.get('Authorization').substr(7)
            this.usuarioLogado = res.body
            
            this.toast.showToast(`Bem vindo(a), ${this.usuarioLogado.nome.split(' ')[0]}!`, 3000)
            this.navController.navigateForward('/home')
        }, (err: HttpErrorResponse) => {
            let httpStatus = err.status

            if(httpStatus === 403) {
                this.toast.showToast('Usuário ou senha incorretos!')
            } else {
                this.toast.showToast('Falha ao se comunicar com o servidor.')
            }
        })
    }

    isLogado(): boolean {
        return this.logado
    }

    getToken(): string {
        return this.token
    }

    getUsuarioLogado(): Usuario {
        return this.usuarioLogado
    }
}