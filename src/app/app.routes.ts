import { Routes } from '@angular/router';
import { AuthentificationComponent } from './pages/authentification/authentification.component';

export const routes: Routes = [
    {
        path: '',
        children: [
          { path: '', component: AuthentificationComponent }
        ]
    },
];
