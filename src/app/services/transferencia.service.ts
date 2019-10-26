import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transferencia } from '../models/transferencia.model';
import { APP_CONFIG } from '../app.config';
import { TransferenciaDTO } from '../models/transferencia.dto';

@Injectable()
export class TransferenciaService {

    constructor(private http: HttpClient) {        
    }

    getAll(): Observable<Transferencia[]> {
        return this.http.get<Transferencia[]>(`${APP_CONFIG.apiUrl}/transferencias`)
    }

    getById(transferenciaId: number): Observable<Transferencia> {
        return this.http.get<Transferencia>(`${APP_CONFIG.apiUrl}/transferencias/${transferenciaId}`)
    }

    insert(transferencia: TransferenciaDTO): Observable<Transferencia> {
        let requestBody = JSON.stringify(transferencia)
        let headers = new HttpHeaders().append('Content-Type', 'application/json')

        return this.http.post<Transferencia>(`${APP_CONFIG.apiUrl}/transferencias`, requestBody, { headers: headers })
    }

    update(transferencia: Transferencia): Observable<any> {
        let requestBody = JSON.stringify(transferencia)
        let headers = new HttpHeaders().append('Content-Type', 'application/json')

        return this.http.put(`${APP_CONFIG.apiUrl}/transferencias`, requestBody, { headers: headers })
    }

    efetiva(transferenciaId: number): Observable<any> {
        return this.http.put(`${APP_CONFIG.apiUrl}/transferencias/efetiva/${transferenciaId}`, null)
    }

    estorna(transferenciaId: number): Observable<any> {
        return this.http.put(`${APP_CONFIG.apiUrl}/transferencias/estorna/${transferenciaId}`, null)
    }
}