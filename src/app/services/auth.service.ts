import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL ="/api/auth/";

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email:string, password:string){
    return this.http.post<Auth>(this.apiURL + 'login', { email, password})
    .pipe(
      tap( (response:Auth) => this.tokenService.saveToken(response?.access_token))
    );
  }

  profile(token:string){
    const headers = new HttpHeaders();
    headers.set('Authorization', 'Bearer ' + token);
    return this.http.get<User>(this.apiURL + 'profile/', {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    });
  }
}
