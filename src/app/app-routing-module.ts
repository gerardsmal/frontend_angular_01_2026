import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './componenti/dashboard/dashboard';
import { Login } from './componenti/login/login';
import { Register } from './componenti/register/register';
import { Home } from './componenti/home/home';
import { GestioneUtente } from './componenti/gestione-utente/gestione-utente';
import { authAutentificatedGuard } from './auth/auth-autentificated-guard';
import { authAdminGuard } from './auth/auth-admin-guard';
import { Chart } from './componenti/chart/chart';

const routes: Routes = [
  { path: '', redirectTo: 'dash', pathMatch: 'full' },
  { path: 'dash', component: Dashboard, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'cart', component: Chart  , canActivate: [authAutentificatedGuard]},
      { path: 'user', component: GestioneUtente, canActivate: [authAutentificatedGuard, authAdminGuard] }
    ]
  },
  { path: 'login', component: Login },
  { path: 'register', component: Register }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
