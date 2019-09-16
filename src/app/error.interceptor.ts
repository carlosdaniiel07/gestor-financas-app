import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { ToastUtils } from './utils/toast.utils';
import { AuthService } from './services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private toast: ToastUtils, private authService: AuthService) {
                
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(
            catchError((err: HttpErrorResponse, caught: Observable<any>) => {
                let errorStatus: number = err.status
                let errorMessage: string = err.error.mensagem || 'Ocorreu um erro desconhecido no servidor. Tente novamente'
                let errorErrors: string[] = err.error.errors || []
                let toastDuration: number = 4000

                errorMessage = (errorErrors.length > 0) ? errorErrors[0] : errorMessage

                // Tratamento de erro baseado no status do mesmo
                switch(errorStatus) {
                    case 400 || 404: // Bad request ou Not Found
                        this.toast.showToast(errorMessage, toastDuration)
                        break
                    case 403: // Forbidden
                        this.toast.showToast('Sua sessão expirou. Faça o login novamente', toastDuration)
                        
                        // Efetua o logout, porém, sem remover as credenciais do local storage
                        this.authService.logout(false) 
                        break
                    default:
                        this.toast.showToast(errorMessage, toastDuration)
                }

                return throwError(err)
            })
        )
    }
}