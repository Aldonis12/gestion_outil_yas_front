import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableauEbsService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.apiUrl}`;

  getTabEBS(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tableau_ebs?page=${page}`);
  }
  loadSelectOptions(baseName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get_options?table=${baseName}`);
  }
  UpdateEBS(data: { table: string, date: string, code_site: string, column: string, value: string, user: number }): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/update_ebs`, data);
  }
  getHistorique(date: string, codeSite: string, column: string): Observable<any[]> {
    const url = `${this.apiUrl}/get_historique_ebs?date=${encodeURIComponent(date)}&code_site=${encodeURIComponent(codeSite)}&column=${encodeURIComponent(column)}`;
    return this.http.get<any[]>(url);
  }
}
