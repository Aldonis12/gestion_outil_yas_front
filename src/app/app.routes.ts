import { Routes } from '@angular/router';
import { AuthentificationComponent } from './pages/authentification/authentification.component';
import { TableauEbsComponent } from './pages/tableau-ebs/tableau-ebs.component';
import { EbsFormComponent } from './pages/ebs-form/ebs-form.component';
import { SiteCandidatComponent } from './pages/site-candidat/site-candidat.component';
import { DetailSiteComponent } from './pages/detail-site/detail-site.component';
import { authGuard } from './guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthentificationComponent,
    title: 'Se connecter - LAMBDA'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'tableau-ebs', component: TableauEbsComponent, data: { title: 'Tableau EBS' }, title: 'Tableau EBS', canActivate: [authGuard] },
      { path: 'ajout-ebs', component: EbsFormComponent, data: { title: 'Ajout EBS' }, title: 'Ajout EBS', canActivate: [authGuard] },
      { path: 'site-validate', component: SiteCandidatComponent, data: { title: 'Sites valides' }, title: 'Site valide', canActivate: [authGuard] },
      { path: 'detail_candidat/:id/:code_site', component: DetailSiteComponent, data: { title: 'Détail Site : :code_site' }, title: 'Detail Site', canActivate: [authGuard] },
    ]
  },
  { 
    path: '**', 
    redirectTo: ''
  }
];
