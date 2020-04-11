import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../app.config';

@Injectable()
export class NotificationService {

    constructor(private http: HttpClient) {

    }

    public markAsReceived(notificationId: number): Observable<any> {
        return this.http.put<any>(`${APP_CONFIG.apiUrl}/notificacoes/${notificationId}/recebido`, null)
    }
}