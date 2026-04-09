import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtenteServices } from '../../services/utente-services';
import { AuthServices } from '../../auth/auth-services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit{
  
  id: any;
  msg = signal("");

  constructor(
    private route: ActivatedRoute,
    private routing: Router,
    private accountServices: UtenteServices,
    
  ) {

  }

  
  
  ngOnInit(): void {
    this.msg.set("");
    this.id = this.route.snapshot.paramMap.get("id");
    console.log("id:" + this.id);
  }

   onSubmit(updatePwd: NgForm) {
    this.msg.set("");

    if (updatePwd.value.newpassword != updatePwd.value.cntrlpassword) {
      this.msg.set("password non identiche.")
      return
    }
    this.accountServices.resetPassword({
      userName: this.id,
      newPwd: updatePwd.value.newpassword
    }).subscribe({
      next: ((r: any) => {
        this.msg.set("passord cambiata");
      }),
      error: ((r: any) => {
        this.msg.set(r.error.msg);
      })
    })

  }
}
