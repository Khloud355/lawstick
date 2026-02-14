import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { login } from '../models/Ilogin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://swan-v682.onrender.com/lawstick/v1/authentication';

  constructor(private http: HttpClient) {}

  login(data: login): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.jwtToken);
      }),
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
