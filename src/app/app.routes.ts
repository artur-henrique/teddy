import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ClientPageComponent } from './pages/client-page/client-page.component';
import { ClientListComponent } from './pages/client-page/client-list/client-list.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'clients',
    component: ClientPageComponent,
    children: [
      { path: '', component: ClientListComponent },
      { path: 'selected', component: ClientListComponent },
    ]
  },
];
