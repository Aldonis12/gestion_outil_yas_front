// Interface pour les options des selects
export interface SelectOption {
    id?: number;
    nom: string;
    code?: string;
    type?: string;
  }
  
  // Interface pour les données de formulaire dynamiques
  export interface EbsFormData {
    type_projet: SelectOption[];
    region: SelectOption[];
    demandeur: SelectOption[];
    priorite: SelectOption[];
    zone: SelectOption[];
    typologie: SelectOption[];
    type_site: SelectOption[];
    type_infra: SelectOption[];
    potentiel_cohab: SelectOption[];
    scope: SelectOption[];
    config_radio: SelectOption[];
    Antenne_radio: SelectOption[];
    RRU900_800: SelectOption[];
    RRU1800: SelectOption[];
    RRU2600: SelectOption[];
    RBS_Existant: SelectOption[];
    Action_RBS: SelectOption[];
    Design_trans: SelectOption[];
    Config_trans: SelectOption[];
    Frequence: SelectOption[];
    Dimension_ant_trans: SelectOption[];
  }

  export interface ApiResponseEbsForm {
    type_projet: { nom: string }[];
    region: { code: string }[];
    demandeur: { nom: string }[];
    priorite: { nom: string }[];
    zone: { nom: string }[];
    typologie: { nom: string }[];
    type_site: { nom: string }[];
    type_infra: { nom: string }[];
    potentiel_cohab: { nom: string }[];
    scope: { nom: string }[];
    config_radio: { nom: string }[];
    Antenne_radio: { nom: string }[];
    RRU900_800: { nom: string }[];
    RRU1800: { nom: string }[];
    RRU2600: { nom: string }[];
    RBS_Existant: { nom: string }[];
    Action_RBS: { nom: string }[];
    Design_trans: { nom: string }[];
    Config_trans: { nom: string }[];
    Frequence: { nom: string }[];
    Dimension_ant_trans: { nom: string }[];
  }
  
  // Interface pour les valeurs du formulaire
  export interface EbsFormValues {
    // Section Type de projet
    formType: string;
    
    // Section Informations sites
    phasetoa: string;
    phaseyas: string;
    daty: string;
    version: string;
    region: string;
    codesite: string;
    nomsite: string;
    demandeur: string;
    longitude: string;
    latitude: string;
    priorite: string;
    zone: string;
    typologie: string;
    type_site: string;
    infra: string;
    potentiel_cohab: string;
    scope: string;
    
    // Section EBS RADIO
    config_radio: string;
    antenne_radio: string;
    hba: string;
    azimut_nm: string;
    rru900_800: string;
    rru1800: string;
    rru2600: string;
    rbs_existant: string;
    action_rbs: string;
    nombre_mat: string;
    puissance_radio: string;
    commentaire_radio: string;
    
    // Section EBS TRANS
    design_trans: string;
    config_trans: string;
    frequence: string;
    dimension_ant_trans: string;
    azimut_site_main: string;
    hma_site_main: string;
    code_facing: string;
    nom_facing: string;
    azimut_site_facing: string;
    hma_site_facing: string;
    elevation_vsat: string;
    azimut_vsat: string;
    puissance_trans: string;
    commentaire_trans: string;
    
    // Section EBS NRJ
    disjoncteur_trans: string;
    disjoncteur_tete_dc: string;
    disjoncteur_tete_dc_trans: string;
    nrj_after_project: string;
    commentaire_energie: string;
  }
  
  // Interface pour la réponse de l'API
  export interface ApiResponse {
    success: boolean;
    message?: string;
    data?: any;
    errors?: { [key: string]: string };
  }