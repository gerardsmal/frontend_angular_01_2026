import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MotoServices } from '../../services/moto-services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AttributiServices } from '../../services/attributi-services';



@Component({
  selector: 'app-moto-dialog',
  standalone: false,
  templateUrl: './moto-dialog.html',
  styleUrl: './moto-dialog.css',
})
export class MotoDialog implements OnInit {
  mod: any = signal("");
  moto: any = signal<any>(null);
  readonly dialog = inject(MatDialog);

  tipoVeicolo: any;
  tipoAlimentazione = signal<any[]>([]);;
  categories = signal<any[]>([]);
  msg = signal("")

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<MotoDialog>,
    private attributiS: AttributiServices,
    private macchinaS: MotoServices
  ) {
    if (data) {
      this.tipoVeicolo = data.tipoVeicolo;
      this.mod.set(data.mod);
      this.moto.set(data.veicolo);
      console.log(this.tipoVeicolo);
    }
  }

  updateForm: FormGroup = new FormGroup({
    modello: new FormControl(null, Validators.required),
    categ: new FormControl(null, Validators.required),
    alim: new FormControl(null, Validators.required),
    colore: new FormControl(null, Validators.required),
    marca: new FormControl(null, Validators.required),
    ruote: new FormControl(2, Validators.required),
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
    if (this.mod() == 'U') {
      this.updateForm.patchValue({
        modello: this.moto().modello,
        categ: this.moto().categoria.id,
        alim: this.moto().tipoAlimentazione.id,
        colore: this.moto().colore.id,
        marca: this.moto().marca.id,
        ruote: this.moto().numeroRuote,
        targa: this.moto().moto.targa,
        anno: this.moto().annoProduzione,
        cc: this.moto().moto.cc,
        prezzo: this.moto().prezzo
      })
    }

  }

  get coloreList() {
    return this.attributiS.coloreList();
  }


  get marcaList() {
    return this.attributiS.marcaList();
  }
  onSubmit() {
    if (this.mod() == 'U') this.onUpdate();
    if (this.mod() == 'C') this.onCreate();
  }

  onCreate() {
    this.macchinaS.create({
      numeroRuote: this.updateForm.value.ruote,
      modello: this.updateForm.value.modello,
      annoProduzione: this.updateForm.value.anno,
      tipoVeicolo: this.tipoVeicolo.id,
      categorie: this.updateForm.value.categ,
      tipoAlimentazione: this.updateForm.value.alim,
      colore: this.updateForm.value.colore,
      marca: this.updateForm.value.marca,
      prezzo: this.updateForm.value.prezzo,
      targa: this.updateForm.value.targa,
      cc: this.updateForm.value.cc
    }).subscribe({
      next: ((r: any) => {
        this.dialogRef.close()

      }),
      error: ((r: any) => {
        this.msg.set(r.error.msg)
      })
    })

  }

  onUpdate() {
    const updateBody: any = { id: this.moto().id }
    if (this.updateForm.controls['ruote'].dirty)
      updateBody.numeroRuote = this.updateForm.value.ruote;
    if (this.updateForm.controls['modello'].dirty)
      updateBody.modello = this.updateForm.value.modello;
    if (this.updateForm.controls['anno'].dirty)
      updateBody.annoProduzione = this.updateForm.value.anno;
    if (this.updateForm.controls['categ'].dirty)
      updateBody.categorie = this.updateForm.value.categ;
    if (this.updateForm.controls['alim'].dirty)
      updateBody.tipoAlimentazione = this.updateForm.value.alim;
    if (this.updateForm.controls['colore'].dirty)
      updateBody.colore = this.updateForm.value.colore;
    if (this.updateForm.controls['colore'].dirty)
      updateBody.colore = this.updateForm.value.colore;
    if (this.updateForm.controls['marca'].dirty)
      updateBody.marca = this.updateForm.value.marca;
    if (this.updateForm.controls['prezzo'].dirty)
      updateBody.prezzo = this.updateForm.value.prezzo;
    if (this.updateForm.controls['targa'].dirty)
      updateBody.targa = this.updateForm.value.targa;

    this.macchinaS.update(updateBody)
      .subscribe({
        next: ((r: any) => {
          this.dialogRef.close()
        }),
        error: ((r: any) => {
          this.msg.set(r.error.msg)
        })
      })

  }
  remove() {

  }


}
