import { Routes } from '@angular/router';
import { AuthentificationComponent } from './pages/authentification/authentification.component';
import { TableauEbsComponent } from './pages/tableau-ebs/tableau-ebs.component';

export const routes: Routes = [
    {
        path: '',
        children: [
          { path: '', component: AuthentificationComponent },
          { path: 'tableau-ebs', component: TableauEbsComponent },
        ]
    },
];
