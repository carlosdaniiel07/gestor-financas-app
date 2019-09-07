import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projeto } from '../models/projeto.model';
import { APP_CONFIG } from '../app.config';
import { ProjetoDTO } from '../models/projeto.dto';
import { Movimento } from '../models/movimento.model';

@Injectable()
export class ProjetoService {

    constructor(private http: HttpClient) {}

    getAll(): Observable<Projeto[]> {
        return this.http.get<Projeto[]>(`${APP_CONFIG.apiUrl}/projetos`)
    }

    getMovimentos(projetoId: number): Observable<Movimento[]> {
        return this.http.get<Movimento[]>(`${APP_CONFIG.apiUrl}/projetos/${projetoId}/movimentos`)
    }

    getById(projetoId: number): Observable<Projeto> {
        return this.http.get<Projeto>(`${APP_CONFIG.apiUrl}/projetos/${projetoId}`)
    }

    insert(projeto: ProjetoDTO): Observable<Projeto> {
        let requestBody = JSON.stringify(projeto)
        let headers = new HttpHeaders().append('Content-Type', 'application/json')

        return this.http.post<Projeto>(`${APP_CONFIG.apiUrl}/projetos`, requestBody, { headers: headers })
    }

    update(projeto: Projeto): Observable<any> {
        let requestBody = JSON.stringify(projeto)
        let headers = new HttpHeaders().append('Content-Type', 'application/json')

        return this.http.put(`${APP_CONFIG.apiUrl}/projetos`, requestBody, { headers: headers })
    }

    delete(projetoId: number): Observable<any> {
        return this.http.put(`${APP_CONFIG.apiUrl}/projetos/remover/${projetoId}`, null)
    }
}