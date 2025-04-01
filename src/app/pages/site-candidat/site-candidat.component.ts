import { Component, OnInit } from '@angular/core';
import { SiteCandidatService } from '../../services/site-candidat.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CandidatDetails } from '../../models/candidat-site';

@Component({
  selector: 'app-site-candidat',
  imports: [CommonModule, RouterModule],
  templateUrl: './site-candidat.component.html',
  styleUrl: './site-candidat.component.css'
})

export class SiteCandidatComponent implements OnInit {
  sites: any[] = [];
  loading = true;
  currentPage = 1;
  totalPages = 1;
  showDetails = false;
  detailText = '';

  constructor(private sitesService: SiteCandidatService) { }

  ngOnInit(): void {
    this.fetchSites();
  }

  fetchSites(page: number = 1): void {
    this.loading = true;
    this.sitesService.getValidatedSites(page).subscribe({
      next: (data) => {
        this.sites = data.sites.data;
        this.currentPage = data.sites.current_page;
        this.totalPages = data.sites.last_page;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des sites:', error);
        this.loading = false;
      }
    });
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.fetchSites(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.fetchSites(this.currentPage + 1);
    }
  }

  detailData: CandidatDetails | null = null;
  
  showCandidatDetails(siteId: number, candidatName: string): void {
    this.sitesService.getCandidatDetails(siteId, candidatName).subscribe({
      next: (detailsArray) => {
        this.detailData = detailsArray[0];
        this.showDetails = true;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des détails:', error);
        this.detailData = null;
        this.showDetails = true;
      }
    });
  }

  getStatusText(statut: number): string {
    switch(statut) {
      case 1: return 'Not OK';
      case 2: return 'OK';
      default: return 'En cours';
    }
  }
}
