import { Component, inject } from '@angular/core';
import { AuthServices } from '../../auth/auth-services';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialog } from '../../dialogs/login-dialog/login-dialog';
import { ChangePassword } from '../../dialogs/change-password/change-password';
import { UtenteServices } from '../../services/utente-services';
import { Utilities } from '../../services/utilities';
import { RegistrazioneDialog } from '../../dialogs/registrazione-dialog/registrazione-dialog';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  readonly dialog = inject(MatDialog);

   constructor(public auth:AuthServices,
      private routing:Router,
      private utenteServices: UtenteServices,
      private util : Utilities
   ){}
  
  login() {
    this.dialog.open(LoginDialog, {
      width: '400px',
      disableClose: false,
      data: {}
    });
  }

  logout() {
    console.log('logout')
    this.auth.resetAll();
    this.routing.navigate(['/dash']);
  }
  changePWD(){
     this.dialog.open(ChangePassword, {
      width: '400px',
      disableClose: false,
      data: {}
    });
  }

   profile() {
    this.utenteServices.findByUserName(this.auth.grant().userId)
      .subscribe({
        next: ((r: any) => {
          this.util.openDialog(RegistrazioneDialog,
            {
              account: r,
              mode: "U"
            },
            {
              width: '90vw',
              maxWidth: '1200px',
              height: 'auto',
            }
          );
        }),
        error: ((r: any) => {
          console.log("error getAccount:" + r.error.msg);
        })
      })
  }
}
