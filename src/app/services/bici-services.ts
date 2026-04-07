import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VeicoliServices } from './veicoli-services';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BiciServices {
 private url = "http://localhost:9090/rest/bici/";

  constructor(private http: HttpClient,
              private veicoliServices:VeicoliServices

  ) { }

  create(body:{}){
    return this.http.post(this.url + "create", body)
      .pipe(tap(() => this.veicoliServices.list()))
  }

  update(body:{}){
    return this.http.put(this.url + "update", body)
      .pipe(tap(() => this.veicoliServices.list()))
  }


}
