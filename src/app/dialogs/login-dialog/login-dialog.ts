import { Component, inject, signal } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UtenteServices } from '../../services/utente-services';
import { AuthServices } from '../../auth/auth-services';
import { Router } from '@angular/router';
import { Utilities } from '../../services/utilities';
import { NgForm } from '@angular/forms';
import { RegistrazioneDialog } from '../registrazione-dialog/registrazione-dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-login-dialog',
  standalone: false,
  templateUrl: './login-dialog.html',
  styleUrl: './login-dialog.css',
})
export class LoginDialog {
 msg = signal('');
  readonly dialog = inject(MatDialog);
  userName="";
  constructor(
    private account: UtenteServices,
    private auth: AuthServices,
    private routing: Router,
    private util: Utilities,
    private dialogRef: MatDialogRef<LoginDialog>
  ) { }

  onSubmit(signin: NgForm) {
    this.account.login({
      userName: signin.form.value.userName,
      pwd: signin.form.value.password
    }).subscribe({
      next: (resp: any) => {
        this.msg.set("");
        console.log(resp)
        this.auth.setAutentificated(resp.id, resp.mailValidate ? 'Y' : 'N');
        if (resp.role == 'ADMIN') this.auth.setAdmin();
        if (resp.role == 'USER') this.auth.setUser();

        console.log('[LoginDialog] dopo login, isAutentificated =', this.auth.isAutentificated() );
       

        this.dialogRef.close(true);
        this.routing.navigate(['/dash']);
      },
      error: (resp: any) => {
        console.log(resp);
        this.msg.set(resp.error.msg);
        this.userName = signin.form.value.userName;
      }
    });
  }


  registrazione() {
   
    this.util.openDialog(RegistrazioneDialog,
      {
        account: null,
        mode: "C"
      }, 
      {
        width: '90vw',
        maxWidth: '1200px',
        height: 'auto',
      }
    );
   
  }

onResendChange(e: MatCheckboxChange) {
    if (e.checked){
      this.account.sendResetPassword(this.userName)
        .subscribe({
          next:((r:any) => {
            e.source.checked = false;
          }),
          error:((r:any) => {
            console.log("error:" + r.error.msg)
          })
        })

    }
      
  }
}
