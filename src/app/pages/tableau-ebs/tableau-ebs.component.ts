import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableauEbsService } from '../../services/tableau-ebs.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  errorMessage: string | null = null;

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

  async openPopup(info: any, table: string, column: string) {
    this.currentOptions = [];
    this.currentInputValue = '';
  
    this.currentInfo = info;
    this.currentBaseSelect = column;
  
    if (this.isSelectColumn(column)) {
      this.tebsService.loadSelectOptions(column).subscribe(options => {
        this.currentOptions = options;
        this.isPopupVisible = true;
      });
    } else {
      this.currentInputValue = info[column];
      this.isPopupVisible = true;
    }
  }
  
  
  isSelectColumn(column: string): boolean {
    const selectColumns = ['Demandeur','config_radio'];  // Liste des colonnes nécessitant un select
    return selectColumns.includes(column);
  }
  
  closePopup() {
    this.isPopupVisible = false;
  }
  
  saveChanges(): void {
    if (!this.currentInputValue) {
      this.errorMessage = "La valeur ne peut pas être vide.";
      return;
    }
  
    // Logique pour sauvegarder les changements ici
  
    this.closePopup();  // Ferme le popup après sauvegarde
  }
  
  currentInputValue: string = '';
  currentOptions: any[] = [];
}