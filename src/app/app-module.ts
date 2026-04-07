import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { Dashboard } from './componenti/dashboard/dashboard';
import { Home } from './componenti/home/home';
import { GestioneUtente } from './componenti/gestione-utente/gestione-utente';
import { Chart } from './componenti/chart/chart';
import { LoginDialog } from './dialogs/login-dialog/login-dialog';
import { RegistrazioneDialog } from './dialogs/registrazione-dialog/registrazione-dialog';
import { VeicoliManager } from './componenti/veicoli-manager/veicoli-manager';
import { ChangePassword } from './dialogs/change-password/change-password';
import { VeicoliDialog } from './dialogs/veicoli-dialog/veicoli-dialog';
import { MacchinaDialog } from './dialogs/macchina-dialog/macchina-dialog';
import { SceltaUpdateDialog } from './dialogs/scelta-update-dialog/scelta-update-dialog';
import { UploadDialog } from './dialogs/upload-dialog/upload-dialog';
import { MotoDialog } from './dialogs/moto-dialog/moto-dialog';
import { BiciDialog } from './dialogs/bici-dialog/bici-dialog';

@NgModule({
  declarations: [
    App,
    Dashboard,
    Home,
    GestioneUtente,
    Chart,
    LoginDialog,
    RegistrazioneDialog,
    VeicoliManager,
    ChangePassword,
    VeicoliDialog,
    MacchinaDialog,
    SceltaUpdateDialog,
    UploadDialog,
    MotoDialog,
    BiciDialog,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatDialogModule,
    MatRadioModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatExpansionModule,
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
  ],
  bootstrap: [App],
})
export class AppModule {}
