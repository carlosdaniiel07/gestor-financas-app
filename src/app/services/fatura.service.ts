import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fatura } from '../models/fatura.model';
import { APP_CONFIG } from '../app.config';
import { FaturaDTO } from '../models/fatura.dto';
import { Movimento } from '../models/movimento.model';
import { PagamentoFaturaDTO } from '../models/pagamento-fatura.dto';

@Injectable()
export class FaturaService {

    constructor(private http: HttpClient) {
    }

    getById(faturaId: number): Observable<Fatura> {
        return this.http.get<Fatura>(`${APP_CONFIG.apiUrl}/faturas/${faturaId}`)
    }

    getMovimentos(faturaId: number): Observable<Movimento[]> {
        return this.http.get<Movimento[]>(`${APP_CONFIG.apiUrl}/faturas/${faturaId}/movimentos`)
    }

    insert(fatura: FaturaDTO): Observable<Fatura> {
        let requestBody = JSON.stringify(fatura)
        let headers = new HttpHeaders().append('Content-Type', 'application/json')

        return this.http.post<Fatura>(`${APP_CONFIG.apiUrl}/faturas`, requestBody, { headers: headers })
    }

    /**
     * Paga uma fatura
     * @param pagamentoFaturaDTO 
     */
    pay(pagamentoFaturaDTO: PagamentoFaturaDTO): Observable<any> {
        let requestBody = JSON.stringify(pagamentoFaturaDTO)
        let headers = new HttpHeaders().append('Content-Type', 'application/json')
    
        return this.http.put(`${APP_CONFIG.apiUrl}/faturas/efetua-pagamento`, requestBody, { headers: headers })
    }

    /**
     * Abre uma dada fatura
     * @param faturaId 
     */
    open(faturaId: number): Observable<any> {
        return this.http.put(`${APP_CONFIG.apiUrl}/faturas/abre/${faturaId}`, null)
    }

    /**
     * Fecha uma dada fatura
     * @param faturaId 
     */
    close(faturaId: number): Observable<any> {
        return this.http.put(`${APP_CONFIG.apiUrl}/faturas/fecha/${faturaId}`, null)
    }
}