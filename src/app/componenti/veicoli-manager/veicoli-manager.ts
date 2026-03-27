import { Component, OnInit } from '@angular/core';
import { AttributiServices } from '../../services/attributi-services';
import { VeicoliServices } from '../../services/veicoli-services';
import { Utilities } from '../../services/utilities';
import { MacchinaDialog } from '../../dialogs/macchina-dialog/macchina-dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { SceltaUpdateDialog } from '../../dialogs/scelta-update-dialog/scelta-update-dialog';
import { UploadDialog } from '../../dialogs/upload-dialog/upload-dialog';

@Component({
  selector: 'app-veicoli-manager',
  standalone: false,
  templateUrl: './veicoli-manager.html',
  styleUrl: './veicoli-manager.css',
})
export class VeicoliManager implements OnInit {
  tipo: any = null;
  categ: any = null;
  alim: any = null;
  colore: any = null;
  marca: any = null;

  categories: any;
  alimentazione: any;

  tipoCreate:any = null;

  constructor(private attributiS: AttributiServices,
    private veivoliS: VeicoliServices,
    private util:Utilities
  ) {
  }
  ngOnInit(): void {
    this.attributiS.listTipoVeicolo();
    this.attributiS.listColore();
    this.attributiS.listMarca();
    this.veivoliS.list();
  }

  get tipoVeicoli() {
    return this.attributiS.tipoVeicoli();
  }

  get coloreList() {
    return this.attributiS.coloreList();
  }

  get veicoli() {
    return this.veivoliS.veicoli();
  }

  get marcaList() {
    return this.attributiS.marcaList();
  }

  onTipoChange(tipoSelect: any) {
    console.log("pattern selezionato:", tipoSelect.pattern);
    if (tipoSelect.id != null) {
      this.attributiS.listCategoria(tipoSelect.pattern)
        .subscribe({
          next: ((r: any) => {
            this.categories = r;
            console.log(r);
          }),
          error: ((r: any) => {
            console.log(r.error.msg);
          })
        });

      this.attributiS.listAlim(tipoSelect.pattern)
        .subscribe({
          next: ((r: any) => {
            this.alimentazione = r;
            console.log(r);
          }),
          error: ((r: any) => {
            console.log(r.error.msg);
          })
        });
        this.search();
    }


  }

  search() {
    let tipoId = this.tipo == null ? null : this.tipo.id;
    console.log("filtri:" + tipoId + "/" + this.categ + "/" + this.alim + "/" + this.colore + "/" + this.marca)
    this.veivoliS.list(tipoId, this.categ, this.alim, this.colore, this.marca);

  }

  onCreateVeicolo(){
    let dialogComponent: ComponentType<any>
    if (this.tipoCreate.nome === 'macchina') dialogComponent = MacchinaDialog;
    
    let dialogRef = this.util.openDialog(dialogComponent, 
    {
      mod : 'C',
      tipoVeicolo: this.tipoCreate,
      veicolo:null
    },
    { width: '1100px',
      maxWidth: '90vw',
      height: 'auto',
      maxHeight: '90v',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'},
    )
  }
  onSelected(row:any){
    console.log(row);
    let dialogRef = this.util.openDialog(SceltaUpdateDialog,null, {
      width: '400px',
      maxWidth: '90vw',
      height: 'auto',
      maxHeight: '90v'
    } );
    dialogRef.afterClosed()
      .subscribe(r => {
        if (r == 'upload'){
          this.eseguoUpload(row);
        } else {
          this.eseguoUpdate(row);
        }

      }) 
  }
  eseguoUpdate(row:any){
      console.log("eseguo l'update");

      
  }

   eseguoUpload(row:any){
      console.log("eseguo l'upload");
      this.util.openDialog(UploadDialog,
        {
          veicolo:row
        }
      )
  }
}
