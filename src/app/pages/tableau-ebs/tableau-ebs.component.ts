import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableauEbsService } from '../../services/tableau-ebs.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { EbsFileUploadPopupComponent } from '../../components/ebs-file-upload-popup/ebs-file-upload-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { FormEbsService } from '../../services/form-ebs.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-tableau-ebs',
  imports: [CommonModule,FormsModule],
  templateUrl: './tableau-ebs.component.html',
  styleUrl: './tableau-ebs.component.css'
})
export class TableauEbsComponent implements OnInit{
  filteredData: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  currentInfo: any;
  currentBaseSelect: string = '';
  currentColumn: any;

  isPopupVisible: boolean = false;

  isValueInput = false;

  errorMessage: string | null = null;

  currentTable: string = '';

  constructor(private tebsService: TableauEbsService, private dialog: MatDialog, private formEbs: FormEbsService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.loadTableau();
  }


  
  loadTableau(page: number = this.currentPage): void {
    this.tebsService.getTabEBS(page, this.filters).subscribe(data => {
      this.filteredData = data.data;
      this.currentPage = data.current_page;
      this.totalPages = data.last_page;
    });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadTableau(page);
    }
  }

  showFilterModal: boolean = false;
  
  type_projet: string[] = [];
  regions: string[] = [];
  demandeur: string[] = [];
  priorite: string[] = [];
  zone: string[] = [];
  typologie: string[] = [];
  type_site: string[] = [];
  type_infra: string[] = [];
  potentiel_cohab: string[] = [];
  scope: string[] = [];
  config_radio: string[] = [];
  Antenne_radio: string[] = [];
  RRU900_800: string[] = [];
  RRU1800: string[] = [];
  RRU2600: string[] = [];
  RBS_Existant: string[] = [];
  Action_RBS: string[] = [];
  Design_trans: string[] = [];
  Config_trans: string[] = [];
  Frequence: string[] = [];
  Dimension_ant_trans: string[] = [];

filters: any = {
  type_projet: '',
  phasetoa: '',
  phaseyas: '',
  daty: '',
  version: '',
  region: '',
  codesite: '',
  nomsite: '',
  demandeur: '',
  longitude: '',
  latitude: '',
  priorite: '',
  zone: '',
  typologie: '',
  type_site: '',
  infra: '',
  potentiel_cohab: '',
  scope: '',
  // Section EBS RADIO
  config_radio: '',
  antenne_radio: '',
  hba: '',
  azimut_nm: '',
  rru900_800: '',
  rru1800: '',
  rru2600: '',
  rbs_existant: '',
  action_rbs: '',
  nombre_mat: '',
  puissance_radio: '',
  // Section EBS TRANS
  design_trans: '',
  config_trans: '',
  frequence: '',
  dimension_ant_trans: '',
  azimut_site_main: '',
  hma_site_main: '',
  code_facing: '',
  nom_facing: '',
  azimut_site_facing: '',
  hma_site_facing: '',
  elevation_vsat: '',
  azimut_vsat: '',
  puissance_trans: '',
  // Section EBS NRJ
  disjoncteur_trans: '',
  disjoncteur_tete_dc: '',
  disjoncteur_tete_dc_trans: '',
  nrj_after_project: ''
};

  openFilterModal() {
    this.showFilterModal = true;
    this.formEbs.getDetailInfoEBS().subscribe(data => {
      this.type_projet = data.type_projet.map((item: any) => item.nom);    
      this.regions = data.region.map((item: any) => item.code);    
      this.demandeur = data.demandeur.map((item: any) => item.nom);
      this.priorite = data.priorite.map((item: any) => item.nom);
      this.zone = data.zone.map((item: any) => item.nom);
      this.typologie = data.typologie.map((item: any) => item.nom);
      this.type_site = data.type_site.map((item: any) => item.nom);
      this.type_infra = data.type_infra.map((item: any) => item.nom);
      this.potentiel_cohab = data.potentiel_cohab.map((item: any) => item.nom);
      this.scope = data.scope.map((item: any) => item.nom);
      this.config_radio = data.config_radio.map((item: any) => item.nom);
      this.Antenne_radio = data.Antenne_radio.map((item: any) => item.nom);
      this.RRU900_800 = data.RRU900_800.map((item: any) => item.nom);
      this.RRU1800 = data.RRU1800.map((item: any) => item.nom);
      this.RRU2600 = data.RRU2600.map((item: any) => item.nom);
      this.RBS_Existant = data.RBS_Existant.map((item: any) => item.nom);
      this.Action_RBS = data.Action_RBS.map((item: any) => item.nom);
      this.Design_trans = data.Design_trans.map((item: any) => item.nom);
      this.Config_trans = data.Config_trans.map((item: any) => item.nom);
      this.Frequence = data.Frequence.map((item: any) => item.nom);
      this.Dimension_ant_trans = data.Dimension_ant_trans.map((item: any) => item.nom);
    });
  }

  closeFilterModal() {
    this.showFilterModal = false;
  }

  applyFilters() {
    console.log('Filtres appliqués:', this.filters);
    this.currentPage = 1;
    this.loadTableau();
    this.closeFilterModal();
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
      }
    } catch (error) {
      console.error("Erreur API :", error);
      this.errorMessage = "Impossible de modifier. Veuillez réessayer ou vérifier votre connexion.";
    }
  }
  
  currentInputValue: string = '';
  currentOptions: any[] = [];
  historiqueTooltips: { [key: string]: string } = {};

  showHistorique(date: string, codeSite: string, column: string): void {
    const key = `${date}-${codeSite}-${column}`;
    
    this.historiqueTooltips[key] = 'Chargement...';

    this.tebsService.getHistorique(date, codeSite, column).subscribe({
      next: (historique) => {
        this.updateTooltip(key, historique);
      },
      error: (err) => {
        console.error("Erreur lors de la récupération de l'historique", err);
        this.historiqueTooltips[key] = 'Erreur';
      }
    });
  }

  updateTooltip(key: string, historique: any[]): void {
    if (historique && historique.length > 0) {
      this.historiqueTooltips[key] = historique
        .map(item => `${item.valeur} (${item.identifiant} - ${item.inserted_at})`)
        .join('\n');
    } else {
      this.historiqueTooltips[key] = 'Aucun historique';
    }
  }

  openFileUploadPopup() {
    this.dialog.open(EbsFileUploadPopupComponent, {
      width: '400px',
    });
  }

  isExportLoading = false;

  downloadEBS() {
    this.isExportLoading = true;

    this.formEbs.exportEBS().subscribe({
      next: (blob: Blob) => {
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'EBS.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Erreur lors de l\'export', err);
        this.toastService.showError('Erreur lors de l\'export');
      },
      complete: () => {
        this.isExportLoading = false;
        this.toastService.showSuccess('Exportation réussi');
      }
    });
  }

}