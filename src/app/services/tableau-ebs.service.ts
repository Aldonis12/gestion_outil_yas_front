import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableauEbsService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.apiUrl}`;

  getTabEBS(page: number = 1, filters: any = {}): Observable<any> {
    let params = new HttpParams().set('page', page.toString());
    
    if (filters.type_projet) params = params.set('type_projet', filters.type_projet);
    if (filters.phasetoa) params = params.set('phasetoa', filters.phasetoa);
    if (filters.phaseyas) params = params.set('phaseyas', filters.phaseyas);
    if (filters.daty) params = params.set('daty', filters.daty);
    if (filters.version) params = params.set('version', filters.version);
    if (filters.region) params = params.set('region', filters.region);
    if (filters.codesite) params = params.set('codesite', filters.codesite);
    if (filters.nomsite) params = params.set('nomsite', filters.nomsite);
    if (filters.demandeur) params = params.set('demandeur', filters.demandeur);
    if (filters.longitude) params = params.set('longitude', filters.longitude);
    if (filters.latitude) params = params.set('latitude', filters.latitude);
    if (filters.priorite) params = params.set('priorite', filters.priorite);
    if (filters.zone) params = params.set('zone', filters.zone);
    if (filters.typologie) params = params.set('typologie', filters.typologie);
    if (filters.type_site) params = params.set('type_site', filters.type_site);
    if (filters.infra) params = params.set('infra', filters.infra);
    if (filters.potentiel_cohab) params = params.set('potentiel_cohab', filters.potentiel_cohab);
    if (filters.scope) params = params.set('scope', filters.scope);
  
    // Section EBS RADIO
    if (filters.config_radio) params = params.set('config_radio', filters.config_radio);
    if (filters.antenne_radio) params = params.set('antenne_radio', filters.antenne_radio);
    if (filters.hba) params = params.set('hba', filters.hba);
    if (filters.azimut_nm) params = params.set('azimut_nm', filters.azimut_nm);
    if (filters.rru900_800) params = params.set('rru900_800', filters.rru900_800);
    if (filters.rru1800) params = params.set('rru1800', filters.rru1800);
    if (filters.rru2600) params = params.set('rru2600', filters.rru2600);
    if (filters.rbs_existant) params = params.set('rbs_existant', filters.rbs_existant);
    if (filters.action_rbs) params = params.set('action_rbs', filters.action_rbs);
    if (filters.nombre_mat) params = params.set('nombre_mat', filters.nombre_mat);
    if (filters.puissance_radio) params = params.set('puissance_radio', filters.puissance_radio);
  
    // Section EBS TRANS
    if (filters.design_trans) params = params.set('design_trans', filters.design_trans);
    if (filters.config_trans) params = params.set('config_trans', filters.config_trans);
    if (filters.frequence) params = params.set('frequence', filters.frequence);
    if (filters.dimension_ant_trans) params = params.set('dimension_ant_trans', filters.dimension_ant_trans);
    if (filters.azimut_site_main) params = params.set('azimut_site_main', filters.azimut_site_main);
    if (filters.hma_site_main) params = params.set('hma_site_main', filters.hma_site_main);
    if (filters.code_facing) params = params.set('code_facing', filters.code_facing);
    if (filters.nom_facing) params = params.set('nom_facing', filters.nom_facing);
    if (filters.azimut_site_facing) params = params.set('azimut_site_facing', filters.azimut_site_facing);
    if (filters.hma_site_facing) params = params.set('hma_site_facing', filters.hma_site_facing);
    if (filters.elevation_vsat) params = params.set('elevation_vsat', filters.elevation_vsat);
    if (filters.azimut_vsat) params = params.set('azimut_vsat', filters.azimut_vsat);
    if (filters.puissance_trans) params = params.set('puissance_trans', filters.puissance_trans);
  
    // Section EBS NRJ
    if (filters.disjoncteur_trans) params = params.set('disjoncteur_trans', filters.disjoncteur_trans);
    if (filters.disjoncteur_tete_dc) params = params.set('disjoncteur_tete_dc', filters.disjoncteur_tete_dc);
    if (filters.disjoncteur_tete_dc_trans) params = params.set('disjoncteur_tete_dc_trans', filters.disjoncteur_tete_dc_trans);
    if (filters.nrj_after_project) params = params.set('nrj_after_project', filters.nrj_after_project);
  
    return this.http.get<any>(`${this.apiUrl}/tableau_ebs`, { params });
  }
  
  loadSelectOptions(baseName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get_options?table=${baseName}`);
  }
  UpdateEBS(data: { table: string, date: string, code_site: string, column: string, value: string, user: number }): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/update_ebs`, data);
  }
  getHistorique(date: string, codeSite: string, column: string): Observable<any[]> {
    const url = `${this.apiUrl}/get_historique_ebs?date=${encodeURIComponent(date)}&code_site=${encodeURIComponent(codeSite)}&column=${encodeURIComponent(column)}`;
    return this.http.get<any[]>(url);
  }
}
