import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SiteCandidatService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getValidatedSites(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/getValidatedSites?page=${page}`);
  }

  getCandidatDetails(id: number, candidat: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/getDetailSite`, { id, candidat });
  }

  getEBSBySite(code_site: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getEbsBySite/${code_site}`);
  }

  getCandidatBySite(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/getOneSite`, { id });
  }

  addCandidate(candidateData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addCandidat`, candidateData);
  }

  uploadFiles(files: File[], code_site: string): Observable<HttpEvent<any>> {
    const formData = new FormData();
    
    files.forEach(file => {
      formData.append('fichier[]', file, file.name);
    });
    
    formData.append('code_site', code_site);

    const req = new HttpRequest('POST', `${this.apiUrl}/addFiles`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFileBySite(code_site: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-files/${code_site}`);
  }
}