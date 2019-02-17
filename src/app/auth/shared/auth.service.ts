import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { JwtHelperService } from '@auth0/angular-jwt';
const jwt = new JwtHelperService();
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

class DecodedToken {
  exp: number = 0;
  username: string = '';
}
@Injectable()
export class AuthService {

  private decodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken();
  }

  private saveAuthToken(token) {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('bwm_auth', token);
    localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));

    return token;
  }



  public register(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/register', userData);
  }

  public login(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/auth', userData).map((token: string) => this.saveAuthToken(token));
    //   (token) => {
    //     return this.saveAuthToken(token);
    //   }
    // );
  }

  private getExpiration() {
    return moment.unix(this.decodedToken.exp);
  }

  public isAuthenticated() {
    return moment().isBefore(this.getExpiration());
  }

  public logout() {
    localStorage.removeItem('bwm-auth');
    localStorage.removeItem('bwm-meta');

    this.decodedToken = new DecodedToken();
  }

  public getUsername() {
    return this.decodedToken.username;
  }

}
