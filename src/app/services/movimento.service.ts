import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movimento } from '../models/movimento.model';
import { APP_CONFIG } from '../app.config';

@Injectable()
export class MovimentoService {

    constructor(private http: HttpClient) {}

    getAll(): Observable<Movimento[]> {
        return this.http.get<Movimento[]>(`${APP_CONFIG.apiUrl}/movimentos`)
    }

    getById(movimentoId: number): Observable<Movimento> {
        return this.http.get<Movimento>(`${APP_CONFIG.apiUrl}/movimentos/${movimentoId}`)
    }
}