import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteCandidatService } from '../../services/site-candidat.service';
import { CandidatDetails } from '../../models/candidat-site';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-detail-site',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './detail-site.component.html',
  styleUrl: './detail-site.component.css'
})
export class DetailSiteComponent implements OnInit {
  activeSection: string = 'site';
  isLoading: boolean = true;
  ebsData: any[] = [];
  codeSite: string = '';
  statusMessage: { text: string, isError: boolean } | null = null;

  loading = true;
  site: any = null;
  id_site: string = '';

  showAddCandidateModal = false;
  candidateForm: FormGroup;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private siteCandidatService: SiteCandidatService,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.candidateForm = this.fb.group({
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
      altitude: ['', Validators.required],
      date_survey: ['', Validators.required],
      id_info_site: [''],
      code_site: ['']
    });
  }

  ngOnInit(): void {
    this.codeSite = this.route.snapshot.paramMap.get('code_site') || '';
    this.fetchData();

    this.id_site = this.route.snapshot.paramMap.get('id') || '';
    this.fetchSite();
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
    this.siteCandidatService.getEBSBySite(this.codeSite).subscribe({
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

  fetchSite(): void {
    this.loading = true;
    this.siteCandidatService.getCandidatBySite(Number(this.id_site)).subscribe({
      next: (data: any) => {
        this.site = data.site;
        this.loading = false;
      },
      error: (error) => {
        console.error("Erreur lors du chargement du site:", error);
        this.loading = false;
      }
    });
}

showDetails = false;
candidatDetails: CandidatDetails[] = [];
loadingDetails = false;
errorDetails = '';

showCandidatDetails(siteId: number, candidatNom: string): void {
  this.showDetails = true;
  this.loadingDetails = true;
  this.errorDetails = '';
  
  this.siteCandidatService.getCandidatDetails(siteId, candidatNom).subscribe({
    next: (data: any) => {
      this.candidatDetails = Array.isArray(data) ? data : [data];
      this.loadingDetails = false;
    },
    error: (error) => {
      console.error("Erreur lors de la récupération des détails:", error);
      this.errorDetails = 'Erreur lors de la récupération des détails';
      this.loadingDetails = false;
    }
  });
}

openAddCandidateModal(): void {
  if (this.site) {
    this.candidateForm.patchValue({
      id_info_site: this.site.id,
      code_site: this.site.code_site
    });
  }
  this.showAddCandidateModal = true;
}

closeAddCandidateModal(): void {
  this.showAddCandidateModal = false;
  this.candidateForm.reset();
  this.isSubmitting = false;
}

submitCandidateForm(): void {
  if (this.candidateForm.invalid) return;

  this.isSubmitting = true;
  
  this.siteCandidatService.addCandidate(this.candidateForm.value).subscribe({
    next: (response) => {
      this.isSubmitting = false;
      this.closeAddCandidateModal();
      this.fetchSite();
    },
    error: (error) => {
      console.error('Erreur lors de l\'ajout du candidat:', error);
      this.isSubmitting = false;
    }
  });
}

openFileUploadModal(): void {
  console.log('Ouvrir modal upload fichier');
}

showUploadModal = false;
selectedFiles: File[] = [];
isUploadSubmitting = false;
uploadProgress = 0;
code_site = '1';

openUploadModal() {
  this.showUploadModal = true;
}

closeUploadModal() {
  this.showUploadModal = false;
  this.selectedFiles = [];
  this.uploadProgress = 0;
}

onFileSelected(event: any) {
  const files: FileList = event.target.files;
  this.selectedFiles = Array.from(files);
}

removeFile(fileToRemove: File) {
  this.selectedFiles = this.selectedFiles.filter(file => file !== fileToRemove);
}

submitFiles() {
  if (this.selectedFiles.length === 0 || !this.code_site) return;
  
  this.isSubmitting = true;
  this.uploadProgress = 0;

  this.siteCandidatService.uploadFiles(this.selectedFiles, this.code_site)
    .subscribe({
      next: (event: any) => {
        if (event.type === 1 && event.loaded && event.total) {
          this.uploadProgress = Math.round(100 * event.loaded / event.total);
        } else if (event.body) {
          this.isSubmitting = false;
          this.closeUploadModal();
          this.toastService.showSuccess('Fichiers uploadés avec succès!');
        }
      },
      error: (error) => {
        console.error('Erreur lors de l\'upload:', error);
        this.toastService.showError('Erreur lors de l\'upload des fichiers');
        this.isSubmitting = false;
      }
    });
}

}
