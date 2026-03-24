import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AttributiServices {
  private url = "http://localhost:9090/rest/";
  tipoVeicoli = signal<any[]>([]);

  constructor(private http: HttpClient) { }

  listTipoVeicolo(){
    return this.http.get(this.url + "tipoVeicolo/list")
      .subscribe({
        next:((r:any) => this.tipoVeicoli.set(r))
      })
  }

  listCategoria(pattern:string){
    const params = new HttpParams().set("categoria", pattern);
    return this.http.get(this.url + "categoria/list", {params})
  }

   listAlim(pattern:string){
    const params = new HttpParams().set("pattern", pattern);
    return this.http.get(this.url + "alimentazione/list", {params})
  }
}
