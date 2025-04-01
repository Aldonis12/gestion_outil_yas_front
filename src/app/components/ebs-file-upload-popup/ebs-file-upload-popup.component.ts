import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ebs-file-upload-popup',
  imports: [],
  templateUrl: './ebs-file-upload-popup.component.html',
  styleUrl: './ebs-file-upload-popup.component.css'
})
export class EbsFileUploadPopupComponent {
  selectedFile: File | null = null;

  constructor(private dialogRef: MatDialogRef<EbsFileUploadPopupComponent>) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const allowedTypes = [
        "text/csv", 
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 
        "application/vnd.ms-excel"
      ];

      if (!allowedTypes.includes(file.type)) {
        alert("Seuls les fichiers CSV ou Excel sont autorisés !");
        return;
      }

      this.selectedFile = file;
      console.log("Fichier sélectionné :", file);
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      console.log("Fichier prêt pour l'import :", this.selectedFile);
      // Ajoute ici l'envoi du fichier au backend
      this.close();
    } else {
      alert("Veuillez sélectionner un fichier CSV ou Excel.");
    }
  }

  close() {
    this.dialogRef.close();
  }
}
