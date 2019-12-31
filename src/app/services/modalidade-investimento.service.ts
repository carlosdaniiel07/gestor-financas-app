import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModalidadeInvestimento } from '../models/modalidade-investimento.model';
import { APP_CONFIG } from '../app.config';

@Injectable()
export class ModalidadeInvestimentoService {
    constructor(private http: HttpClient) {

    }

    public getAll(): Observable<ModalidadeInvestimento[]> {
        return this.http.get<ModalidadeInvestimento[]>(`${APP_CONFIG.apiUrl}/modalidades-investimento`)
    }
}