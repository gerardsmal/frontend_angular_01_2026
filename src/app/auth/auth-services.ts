import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {

  grant = signal({
    isAdmin: false,
    isLogged: false,
    userId: null as string | null,
    mailValidate: null as string | null
  });

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      console.log('restore---');
      const isLogged = localStorage.getItem("isLogged") === '1';
      const isAdmin = localStorage.getItem("isAdmin") === '1';
      const userId = localStorage.getItem("userId");
      const mailValidate = localStorage.getItem("mailValidate");

      this.grant.set({
        isAdmin,
        isLogged,
        userId,
        mailValidate,
      });
      console.log('[AuthService] constructor isLogged', this.grant().isLogged);
    }
  }

  setAutentificated(userId: any, mailValidate: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("isLogged", "1");
      localStorage.setItem("userId", userId);
      localStorage.setItem("mailValidate", mailValidate);

      this.grant.set({
        isAdmin: false,
        isLogged: true,
        userId,
        mailValidate,
      });
    }
    return EMPTY;
  }
  setAdmin() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("isAdmin", "1");
      this.grant.update(grant => ({
        ...grant,     // copia tutte le proprieta di grant
        isAdmin: true
      }));
    }
    return EMPTY;
  }

  setUser() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("isAdmin", "0");
      this.grant.update(grant => ({
        ...grant,     // copia tutte le proprieta di grant
        isAdmin: false
      }));
    }
    return EMPTY;
  }
  resetAll() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("isLogged");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("mailValidate");
      this.grant.set({
        isAdmin: false,
        isLogged: false,
        userId: null,
        mailValidate:null,
      })
    }
    return EMPTY;
  }

  isAutentificated(): boolean {
    return this.grant().isLogged;
  }

  isRoleAdmin() {
    return this.grant().isAdmin;
  }
}
