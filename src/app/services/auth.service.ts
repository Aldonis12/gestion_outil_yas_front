import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.apiUrl}/login`;
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  
  login(email: string, mdp: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, mdp });
  }
  
  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.isAuthenticatedSubject.next(true);
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }
  
  isLoggedIn(): boolean {
    const token = this.getToken();
    return token != null;
  }
  
  getUser(): any | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeBase64(token);
      return JSON.parse(decodedToken);
    }
    return null;
  }

  private decodeBase64(base64String: string): string {
    const decodedString = atob(base64String);
    return decodedString;
  }
}
