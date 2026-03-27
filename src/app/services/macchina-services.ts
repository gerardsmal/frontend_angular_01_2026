import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { VeicoliServices } from './veicoli-services';

@Injectable({
  providedIn: 'root',
})
export class MacchinaServices {

  private url = "http://localhost:9090/rest/macchina/";

  constructor(private http: HttpClient,
              private veicoliServices:VeicoliServices

  ) { }

  create(body:{}){
    return this.http.post(this.url + "create", body)
      .pipe(tap(() => this.veicoliServices.list()))
  }
}
