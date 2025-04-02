import { Routes } from '@angular/router';
import { AuthentificationComponent } from './pages/authentification/authentification.component';
import { TableauEbsComponent } from './pages/tableau-ebs/tableau-ebs.component';
import { EbsFormComponent } from './pages/ebs-form/ebs-form.component';
import { SiteCandidatComponent } from './pages/site-candidat/site-candidat.component';
import { DetailSiteComponent } from './pages/detail-site/detail-site.component';

export const routes: Routes = [
    {
        path: '',
        children: [
          { path: '', component: AuthentificationComponent },
          { path: 'tableau-ebs', component: TableauEbsComponent, title: 'EBS' },
          { path: 'ajout-ebs', component: EbsFormComponent, title: 'Ajout EBS' },
          { path: 'site-validate', component: SiteCandidatComponent, title: 'Site valide' },
          { path: 'detail_candidat/:code_site', component: DetailSiteComponent, title: 'Detail Site' },
        ]
    },
];
