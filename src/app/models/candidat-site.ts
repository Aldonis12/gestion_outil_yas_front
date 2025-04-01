export class CandidatSite {
}

export interface CandidatDetails {
    id_candidat: number;
    id_info_site: number;
    code_site: string;
    nom_candidat: string;
    statut: number;
    longitude: string;
    latitude: string;
    altitude: string;
    date_survey: string;
    validate_trans?: string | null;
    validate_radio?: string | null;
    nego_toa?: string | null;
    comment_trans?: string | null;
    comment_radio?: string | null;
    comment_nego?: string | null;
  }