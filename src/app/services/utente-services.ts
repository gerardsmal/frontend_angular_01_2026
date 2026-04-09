import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtenteServices {
  private url = "http://localhost:9090/rest/utente/";
  accounts = signal<any[]>([]);
  constructor(private http: HttpClient) { }

  login(body: {}) {
    return this.http.post(this.url + "login", body);
  }
  create(body: {}) {
    return this.http.post(this.url + "create", body)
      .pipe(tap(() => this.list()));
  }

  update(body: {}) {
    return this.http.put(this.url + "update", body)
      .pipe(tap(() => this.list()));
  }
  changePwd(body: {}) {
    return this.http.put(this.url + "changePwd", body);
  }
  sendValidationMail(id: string) {
    let params = new HttpParams().set("id", id);
    return this.http.get(this.url + "sendValidation", { params })
  }

  sendResetPassword(id: string) {
    let params = new HttpParams().set("id", id);
    return this.http.get(this.url + "sendResetPassword", { params })
  }

   resetPassword(body: {}) {
    return this.http.put(this.url + "resetPassword", body);
  }
  mailValidate(id: string) {
    let params = new HttpParams().set("id", id);
    return this.http.get(this.url + "emailValidate", { params })
  }


  findByUserName(id: string) {
    const params = new HttpParams().set("id", id);
    return this.http.get(this.url + "findByUserName", { params });
  }

  list(userName?: string, nome?: string, cognome?: string, role?: string) {
    let params = new HttpParams();
    if (nome) params = params.set('nome', nome);
    if (cognome) params = params.set('cognome', cognome);
    if (role) params = params.set('role', role);


    this.http.get(this.url + "list", { params })
      .subscribe({
        next: ((r: any) => this.accounts.set(r)),
      })
  }
}
