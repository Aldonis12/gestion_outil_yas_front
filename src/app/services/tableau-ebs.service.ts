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
}
