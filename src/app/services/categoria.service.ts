import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APP_CONFIG } from '../app.config';

import { Categoria } from '../models/categoria.model';
import { CategoriaDTO } from '../models/categoria.dto';

@Injectable()
export class CategoriaService {

    constructor(private http: HttpClient) {}

    getAll(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(`${APP_CONFIG.apiUrl}/categorias`)
    }

    getById(categoriaId: number): Observable<Categoria> {
        return this.http.get<Categoria>(`${APP_CONFIG.apiUrl}/categorias/${categoriaId}`) 
    }

    insert(categoria: CategoriaDTO): Observable<Categoria> {
        let requestBody = JSON.stringify(categoria)
        let headers = new HttpHeaders().append('Content-Type', 'application/json')

        return this.http.post<Categoria>(`${APP_CONFIG.apiUrl}/categorias`, requestBody, { headers: headers })
    }

    update(categoria: Categoria): Observable<any> {
        let requestBody = JSON.stringify(categoria)
        let headers = new HttpHeaders().append('Content-Type', 'application/json')

        return this.http.put(`${APP_CONFIG.apiUrl}/categorias`, requestBody, { headers: headers })
    }

    delete(categoriaId: number): Observable<any> {
        return this.http.put(`${APP_CONFIG.apiUrl}/categorias/remover/${categoriaId}`, null)
    }
}