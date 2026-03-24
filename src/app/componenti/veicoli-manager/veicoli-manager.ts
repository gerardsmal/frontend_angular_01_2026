import { Component, OnInit } from '@angular/core';
import { AttributiServices } from '../../services/attributi-services';

@Component({
  selector: 'app-veicoli-manager',
  standalone: false,
  templateUrl: './veicoli-manager.html',
  styleUrl: './veicoli-manager.css',
})
export class VeicoliManager implements OnInit{
  tipo:any = null;
  categ:any = null;
  alim:any = null;

  categories:any;
  alimentazione:any;


  constructor(private attributiS:AttributiServices){
  }
  ngOnInit(): void {
    this.attributiS.listTipoVeicolo();
  }

  get tipoVeicoli(){
    return this.attributiS.tipoVeicoli();
  }

  onTipoChange(tipoSelect: any) {
  console.log("pattern selezionato:", tipoSelect.pattern);


  this.attributiS.listCategoria(tipoSelect.pattern)
    .subscribe({
      next: ((r:any) => {
        this.categories = r;
        console.log(r);
      }),
      error:((r:any) => {
        console.log(r.error.msg);
      })
    });

     this.attributiS.listAlim(tipoSelect.pattern)
    .subscribe({
      next: ((r:any) => {
        this.alimentazione = r;
        console.log(r);
      }),
      error:((r:any) => {
        console.log(r.error.msg);
      })
    });


}

  search(){
    console.log("--tipo:" + this.tipo.id +" categoria:" + this.categ );
  }
}
