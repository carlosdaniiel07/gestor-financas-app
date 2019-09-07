import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APP_CONFIG } from '../app.config';

import { Subcategoria } from '../models/subcategoria.model';
import { Categoria } from '../models/categoria.model';
import { CategoriaService } from './categoria.service';
import { SubcategoriaDTO } from '../models/subcategoria.dto';
import { Movimento } from '../models/movimento.model';

@Injectable()
export class SubcategoriaService {

    constructor(private http: HttpClient, private categoriaService: CategoriaService) { }

    getAll(): Observable<Subcategoria[]> {
        return this.http.get<Subcategoria[]>(`${APP_CONFIG.apiUrl}/subcategorias`)
    }

    getById(subcategoriaId: number): Observable<Subcategoria> {
        return this.http.get<Subcategoria>(`${APP_CONFIG.apiUrl}/subcategorias/${subcategoriaId}`) 
    }

    getMovimentos(subcategoriaId: number): Observable<Movimento[]> {
        return this.http.get<Movimento[]>(`${APP_CONFIG.apiUrl}/subcategorias/${subcategoriaId}/movimentos`)
    }

    insert(subcategoria: SubcategoriaDTO): Observable<Subcategoria> {
        let requestBody = JSON.stringify(subcategoria)
        let headers = new HttpHeaders().append('Content-Type', 'application/json')

        return this.http.post<Subcategoria>(`${APP_CONFIG.apiUrl}/subcategorias`, requestBody, { headers: headers })
    }

    update(subcategoria: Subcategoria): Observable<any> {
        let requestBody = JSON.stringify(subcategoria)
        let headers = new HttpHeaders().append('Content-Type', 'application/json')

        return this.http.put(`${APP_CONFIG.apiUrl}/subcategorias`, requestBody, { headers: headers })
    }

    delete(subcategoriaId: number): Observable<any> {
        return this.http.put(`${APP_CONFIG.apiUrl}/subcategorias/remover/${subcategoriaId}`, null)
    }
}