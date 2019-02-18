import { HttpHandler, HttpRequest, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable() 


export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getAuthToken();
    // if (token) {
    //   request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    // }
    if (token) {
      request = request.clone({
        setHeaders: {
          Autherization : 'Bearer ' + token

        }
      });
    }


    return next.handle(request);
  }

}
