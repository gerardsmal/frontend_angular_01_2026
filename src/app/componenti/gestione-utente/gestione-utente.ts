import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtenteServices } from '../../services/utente-services';
import { Utilities } from '../../services/utilities';
import { UtenteDialog } from '../../dialogs/utente-dialog/utente-dialog';

@Component({
  selector: 'app-gestione-utente',
  standalone: false,
  templateUrl: './gestione-utente.html',
  styleUrl: './gestione-utente.css',
})
export class GestioneUtente implements OnInit {
  userName: any = null;
  nome: any = null;
  cognome: any = null;
  role: any = null;

  readonly dialog = inject(MatDialog);

  constructor(private accountServices: UtenteServices,
    private util: Utilities

  ) { }

  get accounts() {
    return this.accountServices.accounts();
  }

  ngOnInit(): void {
    this.accountServices.list();
  }

  search() {
    if (this.role == 'Role') this.role = null;
    console.log(this.nome + "/" + this.cognome + "/" + this.role);
    this.accountServices.list(this.userName, this.nome, this.cognome, this.role);
  }

  create() {
    this.callDialog(null,"C");
  }
  onSelectedAccount(acc: any) {
    this.callDialog(acc,"U");
  }

  private callDialog(acc: any, mod: any) {
    let dialogRef = this.util.openDialog(UtenteDialog,
      {
        mod: mod,
        account: acc
      },
      {
        width: '90vw',
        maxWidth: '1200px',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms'
      },
    )

  }
}
