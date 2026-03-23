import { Component } from '@angular/core';
import { AuthServices } from '../../auth/auth-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
   constructor(public auth:AuthServices,
      private routing:Router
   ){}
  
  logout(){
    this.auth.resetAll();
    this.routing.navigate(['login'])
  }   

  login(){
    this.routing.navigate(['login'])
  }
}
