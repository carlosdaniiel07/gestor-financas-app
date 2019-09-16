import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movimento } from '../models/movimento.model';
import { APP_CONFIG } from '../app.config';
import { MovimentoDTO } from '../models/movimento.dto';

@Injectable()
export class MovimentoService {

    constructor(private http: HttpClient) {}

    getAll(): Observable<Movimento[]> {
        return this.http.get<Movimento[]>(`${APP_CONFIG.apiUrl}/movimentos`)
    }

    getById(movimentoId: number): Observable<Movimento> {
        return this.http.get<Movimento>(`${APP_CONFIG.apiUrl}/movimentos/${movimentoId}`)
    }

    insert(movimento: MovimentoDTO): Observable<Movimento> {
        let requestBody = JSON.stringify(movimento)
        let headers = new HttpHeaders().append('Content-Type', 'application/json')

        return this.http.post<Movimento>(`${APP_CONFIG.apiUrl}/movimentos`, requestBody, { headers: headers })
    }

    update(movimento: Movimento): Observable<any> {
        let requestBody = JSON.stringify(movimento)
        let headers = new HttpHeaders().append('Content-Type', 'application/json')

        return this.http.put(`${APP_CONFIG.apiUrl}/movimentos`, requestBody, { headers: headers })
    }

    delete(movimentoId: number): Observable<any> {
        return this.http.delete(`${APP_CONFIG.apiUrl}/movimentos/${movimentoId}`)
    }
}