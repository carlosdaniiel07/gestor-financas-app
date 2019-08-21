import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.authService.isLogado()) {
            const newReq = req.clone({
                headers: req.headers.append('Authorization', `Bearer ${this.authService.getToken()}`)
            })

            return next.handle(newReq)
        } else {
            return next.handle(req)
        }
    }
}