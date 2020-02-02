import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Corretora } from '../models/corretora.model';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../app.config';

@Injectable()
export class CorretoraService {
    constructor(private http: HttpClient) {
    }

    public getAll(): Observable<Corretora[]> {
        return this.http.get<Corretora[]>(`${APP_CONFIG.apiUrl}/corretoras`)
    }

    public insert(corretora: Corretora): Observable<Corretora> {
        let headers = new HttpHeaders().append('Content-Type', 'application/json')
        let body = JSON.stringify(corretora)

        return this.http.post<Corretora>(`${APP_CONFIG.apiUrl}/corretoras`, body, { headers: headers })
    }

    public update(corretora: Corretora): Observable<any> {
        let headers = new HttpHeaders().append('Content-Type', 'application/json')
        let body = JSON.stringify(corretora)

        return this.http.put(`${APP_CONFIG.apiUrl}/corretoras`, body, { headers: headers })
    }

    public remove(corretoraId: number): Observable<any> {
        return this.http.put(`${APP_CONFIG.apiUrl}/corretoras/remover/${corretoraId}`, null)
    }
}