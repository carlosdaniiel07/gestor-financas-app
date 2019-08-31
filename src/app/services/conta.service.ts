import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conta } from '../models/conta.model';
import { APP_CONFIG } from '../app.config';
import { ContaDTO } from '../models/conta.dto';
import { Movimento } from '../models/movimento.model';

@Injectable()
export class ContaService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<Conta[]> {
        return this.http.get<Conta[]>(`${APP_CONFIG.apiUrl}/contas`)
    }

    getMovimentos(contaId: number): Observable<Movimento[]> {
        return this.http.get<Movimento[]>(`${APP_CONFIG.apiUrl}/contas/${contaId}/movimentos`)
    }

    getById(contaId: number): Observable<Conta> {
        return this.http.get<Conta>(`${APP_CONFIG.apiUrl}/contas/${contaId}`)
    }

    insert(conta: ContaDTO): Observable<Conta> {
        let requestBody = JSON.stringify(conta)
        let headers = new HttpHeaders().append('Content-Type', 'application/json')

        return this.http.post<Conta>(`${APP_CONFIG.apiUrl}/contas`, requestBody, { headers: headers })
    }

    update(conta: Conta): Observable<any> {
        let requestBody = JSON.stringify(conta)
        let headers = new HttpHeaders().append('Content-Type', 'application/json')

        return this.http.put(`${APP_CONFIG.apiUrl}/contas`, requestBody, { headers: headers })
    }
}