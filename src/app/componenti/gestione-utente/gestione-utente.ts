import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtenteServices } from '../../services/utente-services';

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

  constructor(public accountServices: UtenteServices) { }

  get accounts() {
    return this.accountServices.accounts();
  }

  ngOnInit(): void {
    this.accountServices.list();
  }

  search() {
    if (this.role == 'Role') this.role = null;
    console.log(this.nome + "/" + this.cognome + "/" + this.role);
    this.accountServices.list(this.userName,this.nome, this.cognome, this.role);
  }

  create(){

  }
  onSelectedAccount(acc: any) {
    console.log(acc);
   
  }
}
