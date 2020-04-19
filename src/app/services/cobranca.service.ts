import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Cobranca } from '../models/cobranca.model';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../app.config';
import { CobrancaDTO } from '../models/cobranca.dto';
import { CobrancaPagamentoDTO } from '../models/cobranca-pagamento.dto';
import { CobrancaRemocaoDTO } from '../models/cobranca-remocao.dto';

@Injectable()
export class CobrancaService {
    
    constructor(private http: HttpClient) {    
    }

    getAll(): Observable<Cobranca[]> {
        return this.http.get<Cobranca[]>(`${APP_CONFIG.apiUrl}/cobrancas`)
    }

    getAllByPeriodo(minDate: string, maxDate: string): Observable<Cobranca[]> {
        const httpParams = new HttpParams()
            .append('minDate', minDate)
            .append('maxDate', maxDate)

        return this.http.get<Cobranca[]>(`${APP_CONFIG.apiUrl}/cobrancas/periodo`, { params: httpParams })
    }

    getById(cobrancaId: number): Observable<Cobranca> {
        return this.http.get<Cobranca>(`${APP_CONFIG.apiUrl}/cobrancas/${cobrancaId}`)
    }

    insert(cobranca: CobrancaDTO): Observable<Cobranca> {
        let requestBody = JSON.stringify(cobranca)
        let headers = new HttpHeaders().append('Content-Type', 'application/json')
    
        return this.http.post<Cobranca>(`${APP_CONFIG.apiUrl}/cobrancas`, requestBody, { headers: headers })
    }

    pay(cobranca: CobrancaPagamentoDTO): Observable<any> {
        let requestBody = JSON.stringify(cobranca)
        let headers = new HttpHeaders().append('Content-Type', 'application/json')

        return this.http.put(`${APP_CONFIG.apiUrl}/cobrancas/efetua-pagamento`, requestBody, { headers: headers })
    }

    update(cobranca: Cobranca): Observable<any> {
        let requestBody = JSON.stringify(cobranca)
        let headers = new HttpHeaders().append('Content-Type', 'application/json')
    
        return this.http.put(`${APP_CONFIG.apiUrl}/cobrancas`, requestBody, { headers: headers })
    }

    delete(cobranca: CobrancaRemocaoDTO): Observable<any> {
        let requestBody = JSON.stringify(cobranca)
        let headers = new HttpHeaders().append('Content-Type', 'application/json')

        return this.http.request('delete', `${APP_CONFIG.apiUrl}/cobrancas`, { body: requestBody, headers: headers })
    }
}