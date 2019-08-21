import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APP_CONFIG } from '../app.config';

import { Categoria } from '../models/categoria.model';

@Injectable()
export class CategoriaService {

    constructor(private http: HttpClient) {}

    getAll(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(`${APP_CONFIG.apiUrl}/categorias`)
    }
}