import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beneficiario } from '../models/beneficiario.model';
import { APP_CONFIG } from '../app.config';
import { BeneficiarioDTO } from '../models/beneficiario.dto';

@Injectable()
export class BeneficiarioService {

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<Beneficiario[]> {
        return this.http.get<Beneficiario[]>(`${APP_CONFIG.apiUrl}/beneficiarios`)
    }

    getById(beneficiarioId: number): Observable<Beneficiario> {
        return this.http.get<Beneficiario>(`${APP_CONFIG.apiUrl}/beneficiarios/${beneficiarioId}`)
    }

    insert(beneficiario: BeneficiarioDTO): Observable<Beneficiario> {
        let headers = new HttpHeaders().append('Content-Type', 'application/json')
        let requestBody = JSON.stringify(beneficiario)
     
        return this.http.post<Beneficiario>(`${APP_CONFIG.apiUrl}/beneficiarios`, requestBody, { headers: headers })
    }

    update(beneficiario: Beneficiario): Observable<any> {
        let headers = new HttpHeaders().append('Content-Type', 'application/json')
        let requestBody = JSON.stringify(beneficiario)

        return this.http.put(`${APP_CONFIG.apiUrl}/beneficiarios`, requestBody, { headers: headers })
    }

    delete(beneficiarioId: number): Observable<any> {
        return this.http.put(`${APP_CONFIG.apiUrl}/beneficiarios/remover/${beneficiarioId}`, null)
    }
}