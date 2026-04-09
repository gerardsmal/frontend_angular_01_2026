import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './componenti/dashboard/dashboard';
import { Home } from './componenti/home/home';
import { GestioneUtente } from './componenti/gestione-utente/gestione-utente';
import { authAutentificatedGuard } from './auth/auth-autentificated-guard';
import { authAdminGuard } from './auth/auth-admin-guard';
import { Chart } from './componenti/chart/chart';
import { VeicoliManager } from './componenti/veicoli-manager/veicoli-manager';
import { EmailValidation } from './componenti/email-validation/email-validation';
import { ResetPassword } from './componenti/reset-password/reset-password';

const routes: Routes = [
  { path: '', redirectTo: 'dash', pathMatch: 'full' },
  { path: 'dash', component: Dashboard, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'cart', component: Chart  , canActivate: [authAutentificatedGuard]},
      { path: 'veicoli', component: VeicoliManager, canActivate: [authAutentificatedGuard, authAdminGuard] },
      { path: 'user', component: GestioneUtente, canActivate: [authAutentificatedGuard, authAdminGuard] }
    ]},
  { path: 'emailValidation/:id' , component: EmailValidation},
  { path: 'resetPassword/:id' , component: ResetPassword},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
