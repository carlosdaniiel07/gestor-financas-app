import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APP_CONFIG } from '../app.config';

import { Categoria } from '../models/categoria.model';
import { CategoriaDTO } from '../models/categoria.dto';
import { Subcategoria } from '../models/subcategoria.model';
import { Movimento } from '../models/movimento.model';

@Injectable()
export class CategoriaService {

    constructor(private http: HttpClient) {}

    getAll(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(`${APP_CONFIG.apiUrl}/categorias`)
    }

    getAllByTipo(tipo: string): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(`${APP_CONFIG.apiUrl}/categorias/tipo?tipo=${tipo}`)
    }

    getById(categoriaId: number): Observable<Categoria> {
        return this.http.get<Categoria>(`${APP_CONFIG.apiUrl}/categorias/${categoriaId}`) 
    }

    getSubcategorias(categoriaId: number): Observable<Subcategoria[]> {
        return this.http.get<Subcategoria[]>(`${APP_CONFIG.apiUrl}/categorias/${categoriaId}/subcategorias`)
    }

    getMovimentos(categoriaId: number): Observable<Movimento[]> {
        return this.http.get<Movimento[]>(`${APP_CONFIG.apiUrl}/categorias/${categoriaId}/movimentos`)
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