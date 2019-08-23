import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';

import { APP_CONFIG } from '../app.config';

import { ToastUtils } from '../utils/toast.utils';

import { AutenticacaoDTO } from '../models/autenticacao.dto';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

    private logado: boolean = false
    private token: string = ''
    
    constructor(private http: HttpClient) {}

    login(credenciais: AutenticacaoDTO): Observable<HttpResponse<Usuario>> {
        let requestBody = JSON.stringify(credenciais)
        let headers = new HttpHeaders().append('Content-Type', 'application/json')

        return this.http.post<Usuario>(`${APP_CONFIG.apiUrl}/login`, requestBody, {headers: headers, observe: 'response'})
    }

    successfulLogin(response: HttpResponse<Usuario>): void {
        this.logado = true
        this.token = response.headers.get('Authorization').substr(7)

        localStorage.setItem('usuarioLogado', JSON.stringify(response.body))
    }

    salvaCredenciais(credenciais: AutenticacaoDTO): void {
        localStorage.setItem('credenciais', JSON.stringify(credenciais))
    }

    getCredenciais(): AutenticacaoDTO {
        return JSON.parse(localStorage.getItem('credenciais'))
    }

    isLogado(): boolean {
        return this.logado
    }

    getToken(): string {
        return this.token
    }

    getUsuarioLogado(): Usuario {
        return JSON.parse(localStorage.getItem('usuarioLogado'))
    }

    logout(): void {
        this.logado = false
        this.token = ''

        localStorage.removeItem('usuarioLogado')
        localStorage.removeItem('credenciais')
    }
}