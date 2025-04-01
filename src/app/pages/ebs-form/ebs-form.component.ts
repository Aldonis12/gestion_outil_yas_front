import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EbsFormData, EbsFormValues } from '../../models/ebs';
import { FormEbsService } from '../../services/form-ebs.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ebs-form',
  imports: [
    CommonModule,
    ReactiveFormsModule // <-- Ajoutez cette ligne
  ],
  templateUrl: './ebs-form.component.html',
  styleUrls: ['./ebs-form.component.css']
})
export class EbsFormComponent implements OnInit {
  formData!: EbsFormData;
  ebsForm: FormGroup;
  isLoading = true;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private ebsService: FormEbsService
  ) {
    this.ebsForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadFormData();
  }

  createForm(): FormGroup {
    return this.fb.group({
      formType: ['', Validators.required],
      
      phasetoa: ['', Validators.required],
      phaseyas: ['', Validators.required],
      daty: ['', Validators.required],
      version: ['', Validators.required],
      region: ['', Validators.required],
      codesite: ['', Validators.required],
      nomsite: ['', Validators.required],
      demandeur: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
      priorite: ['', Validators.required],
      zone: ['', Validators.required],
      typologie: ['', Validators.required],
      type_site: ['', Validators.required],
      type_infra: ['', Validators.required],
      potentiel_cohab: ['', Validators.required],
      scope: ['', Validators.required],
      
      // Section EBS RADIO
      config_radio: ['', Validators.required],
      antenne_radio: ['', Validators.required],
      hba: ['', Validators.required],
      azimut_nm: ['', Validators.required],
      rru900_800: ['', Validators.required],
      rru1800: ['', Validators.required],
      rru2600: ['', Validators.required],
      rbs_existant: ['', Validators.required],
      action_rbs: ['', Validators.required],
      nombre_mat: ['', Validators.required],
      puissance_radio: ['', Validators.required],
      commentaire_radio: [''],
      
      // Section EBS TRANS
      design_trans: ['', Validators.required],
      config_trans: ['', Validators.required],
      frequence: ['', Validators.required],
      dimension_ant_trans: ['', Validators.required],
      azimut_site_main: ['', Validators.required],
      hma_site_main: ['', Validators.required],
      code_facing: ['', Validators.required],
      nom_facing: ['', Validators.required],
      azimut_site_facing: ['', Validators.required],
      hma_site_facing: ['', Validators.required],
      elevation_vsat: ['', Validators.required],
      azimut_vsat: ['', Validators.required],
      puissance_trans: ['', Validators.required],
      commentaire_trans: [''],
      
      // Section EBS NRJ
      disjoncteur_trans: ['', Validators.required],
      disjoncteur_tete_dc: ['', Validators.required],
      disjoncteur_tete_dc_trans: ['', Validators.required],
      nrj_after_project: ['', Validators.required],
      commentaire_energie: ['']
    });
  }

  loadFormData(): void {
    this.ebsService.getFormData().subscribe({
      next: (data: EbsFormData) => {
        this.formData = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading form data', err);
        this.isLoading = false;
        this.errorMessage = 'Erreur lors du chargement des données du formulaire';
        this.submitError = true;
      }
    });
  }

  onSubmit(): void {
    if (this.ebsForm.valid) {
      this.isLoading = true;
      this.submitError = false;
      
      this.ebsService.submitForm(this.ebsForm.value as EbsFormValues).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.submitSuccess = true;
          this.ebsForm.reset();
          setTimeout(() => this.submitSuccess = false, 3000);
        },
        error: (err) => {
          console.error('Error submitting form', err);
          this.isLoading = false;
          this.submitError = true;
          this.errorMessage = err.error?.message || 'Erreur lors de la soumission du formulaire';
        }
      });
    } else {
      this.markAllAsTouched();
    }
  }

  markAllAsTouched(): void {
    Object.values(this.ebsForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  get f() {
    return this.ebsForm.controls;
  }
}