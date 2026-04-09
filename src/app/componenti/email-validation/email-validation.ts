import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtenteServices } from '../../services/utente-services';
import { AuthServices } from '../../auth/auth-services';

@Component({
  selector: 'app-email-validation',
  standalone: false,
  templateUrl: './email-validation.html',
  styleUrl: './email-validation.css',
})
export class EmailValidation implements OnInit{
  
  id: any;
  msg = signal("");

 constructor(
    private route: ActivatedRoute,
    private routing: Router,
    private accountServices: UtenteServices,
    private auth:AuthServices
  ) {

  }


  ngOnInit(): void {
    this.msg.set("");
    this.id = this.route.snapshot.paramMap.get("id");
    console.log("id:" + this.id);

  }

  validate(){
    this.accountServices.mailValidate(this.id)
      .subscribe(({
        next:((r:any) => {
          this.msg.set("Fate login di nouvo per convalidare la mail");
        }),
        error:((r:any) => {
          this.msg.set("Errore in validation :" + r.error.msg);
        })
      }))
  }

}
