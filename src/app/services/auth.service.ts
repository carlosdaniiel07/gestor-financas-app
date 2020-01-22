import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { APP_CONFIG } from '../app.config';
import { AutenticacaoDTO } from '../models/autenticacao.dto';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { RecuperarSenhaDTO } from '../models/recuperar-senha.dto';
import { DateUtils } from '../utils/date.utils';

@Injectable()
export class AuthService {

    private logado: boolean = false
    private token: string = ''
    private tokenExpiration: number = 600000
    private refreshTokenEndpoint: string = 'auth/refresh-token'
    private loggedAt: number = 0

    constructor(private http: HttpClient, private navController: NavController) { }

    login(credenciais: AutenticacaoDTO): Observable<HttpResponse<Usuario>> {
        let requestBody = JSON.stringify(credenciais)
        let headers = new HttpHeaders().append('Content-Type', 'application/json')

        return this.http.post<Usuario>(`${APP_CONFIG.apiUrl}/login`, requestBody, { headers: headers, observe: 'response' })
    }

    successfulLogin(response: HttpResponse<Usuario>): void {
        this.logado = true
        this.token = response.headers.get('Authorization').substr(7)
        this.loggedAt = DateUtils.getNow()

        localStorage.setItem('usuarioLogado', JSON.stringify(response.body))
    }

    /**
     * Solicita um novo token a API
     */
    refreshToken(): void {
        this.http.post(`${APP_CONFIG.apiUrl}/${this.refreshTokenEndpoint}`, null).subscribe((response: HttpResponse<any>) => {
            this.token = response.headers.get('Authorization').substr(7)
            this.loggedAt = DateUtils.getNow()
        })
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

    logout(removeCredenciais: boolean = true): void {
        this.logado = false
        this.token = ''

        if (removeCredenciais) {
            localStorage.removeItem('usuarioLogado')
            localStorage.removeItem('credenciais')
        }

        this.navController.navigateRoot('/login')
    }

    recuperaSenha(recuperarSenhaDTO: RecuperarSenhaDTO): Observable<any> {
        let requestBody = JSON.stringify(recuperarSenhaDTO)
        let headers = new HttpHeaders().append('Content-Type', 'application/json')
        
        return this.http.post(`${APP_CONFIG.apiUrl}/auth/esqueci-minha-senha`, requestBody, { headers: headers })
    }

    /**
     * Retorna a quantidade de segundos restantes da sessão atual (baseia-se na data de login + o tempo de expiração do token)
     */
    getSessionRemainingSeconds(): number {
        let now: number = DateUtils.getNow()
        let expireAt: number = this.loggedAt + this.tokenExpiration

        return Math.round((expireAt - now) / 1000)
    }

    getrefreshTokenEndpoint(): string {
        return this.refreshTokenEndpoint
    }
}