import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-site',
  imports: [CommonModule],
  templateUrl: './detail-site.component.html',
  styleUrl: './detail-site.component.css'
})
export class DetailSiteComponent implements OnInit {
  activeSection: string = 'site';
  isLoading: boolean = true;
  ebsData: any[] = [];
  codeSite: string = '';
  statusMessage: { text: string, isError: boolean } | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.codeSite = this.route.snapshot.paramMap.get('code_site') || '';
    this.fetchData();
  }

  toggleTable(section: string): void {
    this.activeSection = section;
  }

  showStatus(message: string, isError: boolean = false): void {
    this.statusMessage = { text: message, isError };
    setTimeout(() => this.statusMessage = null, 5000);
  }

  fetchData(): void {
    this.isLoading = true;
    this.http.get<any[]>(`http://127.0.0.1:8000/api/getEbsBySite/${this.codeSite}`).subscribe({
      next: (data) => {
        this.ebsData = Array.isArray(data) ? data : [data];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur API:', error);
        this.showStatus('Erreur lors du chargement des données', true);
        this.isLoading = false;
      }
    });
  }

  getButtonClass(section: string): string {
    const baseClasses = 'text-white py-2 px-4 rounded-md';
    return section === this.activeSection 
      ? `${baseClasses} bg-green-500 hover:bg-green-700` 
      : `${baseClasses} bg-blue-500 hover:bg-blue-700`;
  }
}
