import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableauEbsService } from '../../services/tableau-ebs.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-tableau-ebs',
  imports: [CommonModule,FormsModule],
  templateUrl: './tableau-ebs.component.html',
  styleUrl: './tableau-ebs.component.css'
})
export class TableauEbsComponent implements OnInit{

  searchQuery: string = '';  // Recherche par Code Site
  information: any[] = [];  // Les données de la table
  filteredData: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  currentInfo: any; // Stocke l'élément sur lequel on a double-cliqué
  currentBaseSelect: string = ''; // Stocke le type de champ pour la sélection (par exemple "demandeur")
  currentColumn: any;

  isPopupVisible: boolean = false;

  isValueInput = false;

  errorMessage: string | null = null;

  currentTable: string = '';

  constructor(private tebsService: TableauEbsService) {}

  ngOnInit(): void {
    this.loadTableau();
  }

  loadTableau(page: number = this.currentPage): void {
    this.tebsService.getTabEBS(page).subscribe(data => {
      this.information = data.data;
      this.currentPage = data.current_page;
      this.totalPages = data.last_page;
      this.filterData();
    });
  }

  filterData(): void {
    if (this.searchQuery) {
      this.filteredData = this.information.filter(item =>
        item.code_site && item.code_site.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredData = [...this.information];
    }
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadTableau(page);
    }
  }

  isRadioVisible = true;
  isTransVisible = true;
  isEnergieVisible = true;

  toggleRadio() {
    this.isRadioVisible = !this.isRadioVisible;
  }

  toggleTrans() {
    this.isTransVisible = !this.isTransVisible;
  }

  toggleEnergie() {
    this.isEnergieVisible = !this.isEnergieVisible;
  }

  getRadioColspan() {
    return this.isRadioVisible ? 12 : 1;
  }
  
  getTransColspan() {
    return this.isTransVisible ? 14 : 1;
  }
  
  getEnergieColspan() {
    return this.isEnergieVisible ? 5 : 1;
  }

  async openPopup(info: any, table: string, column: string, type: string) {
    this.currentOptions = [];
    this.currentInputValue = '';

    this.currentInfo = info;
    this.currentBaseSelect = column;

    this.currentTable = table;

    if (type === 'select') {
        this.tebsService.loadSelectOptions(column).subscribe(options => {
            this.currentOptions = options;
            this.isPopupVisible = true;
            this.isValueInput = false;

            const actualColumnKey = Object.keys(info).find(key => key.toLowerCase() === column.toLowerCase());
            if (actualColumnKey) {
                this.currentInputValue = info[actualColumnKey];
            } else {
                alert(`Clé "${column}" non trouvée dans info.`);
            }
        });
    } else {
        this.currentInputValue = info[column] || '';
        this.isPopupVisible = true;
        this.isValueInput = true;
    }
}
  
  closePopup() {
    this.isPopupVisible = false;
  }
  
  async saveChanges() {
    if (!this.currentInputValue) {
      this.errorMessage = "La valeur ne peut pas être vide.";
      return;
    }

    const user = 1;
    const date = this.currentInfo?.date || '';
    const codeSite = this.currentInfo?.code_site || '';
    const column = this.currentBaseSelect;
    const newValue = this.currentInputValue;
    const table = this.currentTable;

    try {
      const response = await lastValueFrom(this.tebsService.UpdateEBS({
        table: table,
        date: date,
        code_site: codeSite,
        column: column,
        value: newValue,
        user: user
      }));

      if (response) {
        this.currentInfo[column] = newValue;
        this.closePopup();
      } else {
        throw new Error("Réponse vide ou non valide.");
        alert("Erreur lors de la modification.");
      }
    } catch (error) {
      console.error("Erreur API :", error);
      this.errorMessage = "Impossible de modifier. Veuillez réessayer ou vérifier votre connexion.";
    }
  }
  
  currentInputValue: string = '';
  currentOptions: any[] = [];
}