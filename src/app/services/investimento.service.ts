import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Investimento } from '../models/investimento.model';
import { APP_CONFIG } from '../app.config';

@Injectable()
export class InvestimentoService {
    constructor(private http: HttpClient) {

    }

    public getAll(): Observable<Investimento[]> {
        return this.http.get<Investimento[]>(`${APP_CONFIG.apiUrl}/investimentos`)
    }
}