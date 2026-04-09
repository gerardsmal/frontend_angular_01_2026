import { Component, OnInit } from '@angular/core';
import { AttributiServices } from '../../services/attributi-services';
import { VeicoliServices } from '../../services/veicoli-services';
import { Utilities } from '../../services/utilities';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  tipo: any = null;
  categ: any = null;
  alim: any = null;
  colore: any = null;
  marca: any = null;

  categories: any;
  alimentazione: any;

  pageIndex = 0;
  pageSize = 4;

  constructor(private attributiS: AttributiServices,
    private veivoliS: VeicoliServices,
    private util: Utilities
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

  get pagedVeicoli() {
    const all = this.veicoli ?? [];
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    return all.slice(start, end);
  }

  get marcaList() {
    return this.attributiS.marcaList();
  }

  onPageChange(event: PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
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

  selectProd(vei: any) {

  }
}
