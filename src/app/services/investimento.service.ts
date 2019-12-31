import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Investimento } from '../models/investimento.model';
import { APP_CONFIG } from '../app.config';
import { InvestimentoDTO } from '../models/investimento.dto';

@Injectable()
export class InvestimentoService {

    private endpoint: string = 'investimentos'

    constructor(private http: HttpClient) {

    }

    public getAll(): Observable<Investimento[]> {
        return this.http.get<Investimento[]>(`${APP_CONFIG.apiUrl}/${this.endpoint}`)
    }

    public insert(investimento: InvestimentoDTO): Observable<Investimento> {
        let httpHeaders = new HttpHeaders().append('Content-Type', 'application/json')
        let body = JSON.stringify(investimento)

        return this.http.post<Investimento>(`${APP_CONFIG.apiUrl}/${this.endpoint}`, body, { headers: httpHeaders })
    }
}