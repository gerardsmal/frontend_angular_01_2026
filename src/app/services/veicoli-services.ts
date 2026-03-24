import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VeicoliServices {
  private url = "http://localhost:9090/rest/veicolo/";
  veicoli = signal<any[]>([]);

  constructor(private http: HttpClient) { }

  list(tipo?: number, categoria?: string, alimentazione?: string, colore?: number, marca?: number) {
    let params = new HttpParams();
    if (tipo) params = params.set('tipo', tipo);
    if (categoria) params = params.set('categoria', categoria);
    if (alimentazione) params = params.set('alimentazione', alimentazione);
    if (colore) params = params.set('colore', colore);
    if (marca) params = params.set('marca', marca);
    this.http.get(this.url + "list", { params })
      .subscribe({
        next: ((r: any) => this.veicoli.set(r)),
      })

  }
}
