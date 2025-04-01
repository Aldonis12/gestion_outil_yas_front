import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormEbsService } from '../../services/form-ebs.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ebs-file-upload-popup',
  imports: [CommonModule],
  templateUrl: './ebs-file-upload-popup.component.html',
  styleUrl: './ebs-file-upload-popup.component.css'
})
export class EbsFileUploadPopupComponent {
  selectedFile: File | null = null;
  isUploading = false;

  constructor(private dialogRef: MatDialogRef<EbsFileUploadPopupComponent>, private ebsImportService: FormEbsService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      if (!this.ebsImportService.isFileTypeAllowed(file)) {
        alert("Seuls les fichiers CSV ou Excel sont autorisés !");
        return;
      }

      this.selectedFile = file;
      console.log("Fichier sélectionné :", file);
    }
  }

  uploadFile() {
    if (!this.selectedFile) {
      alert("Veuillez sélectionner un fichier CSV ou Excel.");
      return;
    }

    this.isUploading = true;

    this.ebsImportService.importFile(this.selectedFile).subscribe({
      next: (response) => {
        console.log('Import réussi', response);
        this.isUploading = false;
        alert('Import réussi');
        this.close();
      },
      error: (error) => {
        console.error('Erreur lors de l\'import', error);
        this.isUploading = false;
        alert('Erreur lors de l\'importation. Vérifiez le contenu du fichier ou réessayez plus tard.');
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
