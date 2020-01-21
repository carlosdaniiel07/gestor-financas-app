import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { APP_CONFIG } from './app.config';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.isInternalRequest(req.url)) {
            if(this.authService.isLogado()) {
                // Verifica tempo restante do token
                if (this.authService.getSessionRemainingSeconds() <= 60 && !this.isToEndpoint(req.url, this.authService.getrefreshTokenEndpoint())) {
                    this.authService.refreshToken()
                }
    
                const newReq = req.clone({
                    headers: req.headers.append('Authorization', `Bearer ${this.authService.getToken()}`)
                })
    
                return next.handle(newReq)
            }
        }

        return next.handle(req)
    }

    /**
     * Verifica se a requisição HTTP é interna (com destino a própria API do sistema)
     * @param requestedUrl 
     */
    private isInternalRequest(requestedUrl: string): boolean {
        return requestedUrl.includes(APP_CONFIG.apiUrl)
    }

    /**
     * Verifica se a requisição HTTP é para um dado endpoint
     * @param requestedUrl 
     * @param targetEnpoint 
     */
    private isToEndpoint(requestedUrl: string, targetEnpoint: string): boolean {
        return requestedUrl.includes(targetEnpoint)
    }
}