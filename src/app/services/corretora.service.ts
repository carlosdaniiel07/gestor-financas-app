import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}