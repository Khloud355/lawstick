import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout/main-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout/auth-layout.component';

export const routes: Routes = [
  // 🔐 Login (First Page)
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./feature/auth/login/login.component').then(
            (m) => m.LoginComponent,
          ),
      },
    ],
  },

  // 🔒 Protected Pages
  {
    path: 'admin',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'tanents',
        loadComponent: () =>
          import('./feature/admin-dashboard/components/tanents/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent,
          ),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./feature/admin-dashboard/components/home/home.component').then(
            (m) => m.HomeComponent,
          ),
      },
      {
        path: 'setting',
        loadComponent: () =>
          import('./feature/admin-dashboard/components/setting/setting.component').then(
            (m) => m.SettingComponent,
          ),
      },
    ],
  },

  // ❌ Not Found
  { path: '**', redirectTo: 'login' },
];
