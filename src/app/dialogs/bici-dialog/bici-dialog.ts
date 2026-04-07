import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AttributiServices } from '../../services/attributi-services';
import { BiciServices } from '../../services/bici-services';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bici-dialog',
  standalone: false,
  templateUrl: './bici-dialog.html',
  styleUrl: './bici-dialog.css',
})
export class BiciDialog implements OnInit {
  
  mod: any = signal("");
  bici: any = signal<any>(null);
  readonly dialog = inject(MatDialog);

  tipoVeicolo: any;
  tipoAlimentazione = signal<any[]>([]);;
  categories = signal<any[]>([]);
  msg = signal("")


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private attributiS: AttributiServices,
    private biciS: BiciServices
  ) {
    if (data) {
      this.tipoVeicolo = data.tipoVeicolo;
      this.mod.set(data.mod);
      this.bici.set(data.veicolo);
      console.log(this.tipoVeicolo);
    }
  }
  ngOnInit(): void {
       this.attributiS.listCategoria(this.tipoVeicolo.pattern)
      .subscribe({
        next: ((r: any) => {
          this.categories.set(r);
        }),
        error: ((r: any) => {
          console.log(r.error.msg);
        })
      });
    this.attributiS.listAlim(this.tipoVeicolo.pattern)
      .subscribe({
        next: ((r: any) => {
          this.tipoAlimentazione.set(r);
        }),
        error: ((r: any) => {
          console.log(r.error.msg);
        })
      });
    this.attributiS.listColore();
    this.attributiS.listMarca();
    if (this.mod() == 'U') {
      this.updateForm.patchValue({
        modello: this.bici().modello,
        categ: this.bici().categoria.id,
        alim: this.bici().tipoAlimentazione.id,
        colore: this.bici().colore.id,
        marca: this.bici().marca.id,
        ruote: this.bici().numeroRuote,
        anno: this.bici().annoProduzione,
        prezzo: this.bici().prezzo
      })
    }

  }

 get coloreList() {
    return this.attributiS.coloreList();
  }


  get marcaList() {
    return this.attributiS.marcaList();
  }

  updateForm: FormGroup = new FormGroup({
    modello: new FormControl(null, Validators.required),
    categ: new FormControl(null, Validators.required),
    alim: new FormControl(null, Validators.required),
    colore: new FormControl(null, Validators.required),
    marca: new FormControl(null, Validators.required),
    ruote: new FormControl(4, Validators.required),
    porte: new FormControl(5, Validators.required),

    anno: new FormControl(null, Validators.required),
    prezzo: new FormControl(null, Validators.required)

  })

  onSubmit(){

  }
  
  remove(){

  }
}
