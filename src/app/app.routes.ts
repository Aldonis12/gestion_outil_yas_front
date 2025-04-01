import { Routes } from '@angular/router';
import { AuthentificationComponent } from './pages/authentification/authentification.component';
import { TableauEbsComponent } from './pages/tableau-ebs/tableau-ebs.component';
import { EbsFormComponent } from './pages/ebs-form/ebs-form.component';
import { SiteCandidatComponent } from './pages/site-candidat/site-candidat.component';

export const routes: Routes = [
    {
        path: '',
        children: [
          { path: '', component: AuthentificationComponent },
          { path: 'tableau-ebs', component: TableauEbsComponent },
          { path: 'ajout-ebs', component: EbsFormComponent },
          { path: 'site-validate', component: SiteCandidatComponent },
        ]
    },
];
