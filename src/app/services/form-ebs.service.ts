import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { EbsFormData, EbsFormValues } from '../models/ebs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormEbsService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getFormData(): Observable<EbsFormData> {
    return this.http.get<EbsFormData>(`${this.apiUrl}/details_ebs`).pipe(
      catchError(this.handleError)
    );
  }

  submitForm(formData: EbsFormValues): Observable<any> {
    return this.http.post(`${this.apiUrl}/add_ebs`, formData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur inconnue est survenue';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Code d'erreur: ${error.status}\nMessage: ${error.message}`;
      if (error.error?.message) {
        errorMessage = error.error.message;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}