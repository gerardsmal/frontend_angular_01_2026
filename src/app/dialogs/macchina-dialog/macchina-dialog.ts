import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AttributiServices } from '../../services/attributi-services';
import { MacchinaServices } from '../../services/macchina-services';

@Component({
  selector: 'app-macchina-dialog',
  standalone: false,
  templateUrl: './macchina-dialog.html',
  styleUrl: './macchina-dialog.css',
})
export class MacchinaDialog implements OnInit {
  mod: any = signal("");
  macchina: any = signal<any>(null);
  readonly dialog = inject(MatDialog);

  tipoVeicolo: any;
  tipoAlimentazione = signal<any[]>([]);;
  categories = signal<any[]>([]);
  msg=signal("")


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<MacchinaDialog>,
    private attributiS: AttributiServices,
    private macchinaS : MacchinaServices
  ) {
    if (data) {
      this.tipoVeicolo = data.tipoVeicolo;
      this.mod.set(data.mod);
      this.macchina.set(data.veicolo);
      console.log(this.tipoVeicolo);
    }
  }

  updateForm: FormGroup = new FormGroup({
    modello: new FormControl(null, Validators.required),
    categ: new FormControl(null, Validators.required),
    alim: new FormControl(null, Validators.required),
    colore: new FormControl(null, Validators.required),
    marca: new FormControl(null, Validators.required),
    ruote:new FormControl(4, Validators.required),
    porte: new FormControl(5, Validators.required),
    targa: new FormControl(null, Validators.required),
    anno: new FormControl(null, Validators.required),
    cc: new FormControl(null, Validators.required),
    prezzo: new FormControl(null, Validators.required)
    
  })

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
  }

    get coloreList() {
    return this.attributiS.coloreList();
  }

 
  get marcaList() {
    return this.attributiS.marcaList();
  }

  onSubmit() {
    this.macchinaS.create({
      numeroRuote:this.updateForm.value.ruote,
      modello:this.updateForm.value.modello,
      annoProduzione:this.updateForm.value.anno,
      tipoVeicolo:this.tipoVeicolo.id,
      categorie:this.updateForm.value.categ,
      tipoAlimentazione:this.updateForm.value.alim,
      colore:this.updateForm.value.colore,
      marca:this.updateForm.value.marca,
      prezzo:this.updateForm.value.prezzo,
      numeroPorte:this.updateForm.value.porte,
      targa:this.updateForm.value.targa,

      cc:this.updateForm.value.cc
    }).subscribe({
      next:((r:any) => {
        this.dialogRef.close()

      }),
      error: ((r:any) => {
        this.msg.set(r.error.msg)
      })
    })

  }

  remove() {

  }
}
