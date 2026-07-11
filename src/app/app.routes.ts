import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { canActivateAuth } from './services/auth/access.guard';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile/me',
        pathMatch: 'full',
      },
      {
        path: 'profile/:id',
        component: ProfilePageComponent,
      },
      {
        path: 'settings',
        component: SettingsPageComponent,
      },
      {
        path: 'search',
        component: SearchPageComponent,
      },
    ],
    canActivate: [canActivateAuth],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
];
