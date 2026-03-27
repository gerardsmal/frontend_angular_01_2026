import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VeicoliServices } from './veicoli-services';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadServices {
  private url = "http://localhost:9090/rest/upload/";

  constructor(private http: HttpClient,
    private veicoliServices: VeicoliServices

  ) { }

  upload(file: File, id: any) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);

    return this.http.post(this.url + "image", formData)
      .pipe(tap(() => this.veicoliServices.list()))
  }
  getUrl(name: string) {
    let params = new HttpParams().set("filename", name);
    return this.http.get(this.url + "getUrl", { params });
  }

}
