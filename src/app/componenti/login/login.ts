import { Component, signal, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UtenteServices } from '../../services/utente-services';
import { AuthServices } from '../../auth/auth-services';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  msg = signal("");
  @ViewChild ('loginForm') loginForm:NgForm;

  constructor(
      private utenteServices:UtenteServices,
      private auth:AuthServices,
      private routing:Router
  ){};

  onSubmit(){
    console.log("user:" + this.loginForm.form.value.userName);
       this.utenteServices.login({
      userName:this.loginForm.form.value.userName,
      pwd:this.loginForm.form.value.password
    }).subscribe({
      next:((r:any) => {
        this.msg.set("");
        console.log(r);
        this.auth.setAutentificated();
        if(r.role == 'ADMIN')
          this.auth.setADmin()
        else
          this.auth.setUser()
        
        this.routing.navigate(['/dash/home']);
      }),
      error:((r:any) => {
        this.msg.set(r.error.msg)
      })
    })

     }

  registrazione(){
    this.routing.navigate(['register']);

    
  }


}
