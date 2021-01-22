import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { LoginType } from './login.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private readonly _loginService:LoginService,
    private readonly _fb:FormBuilder) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      usuario:['', Validators.required],
      contrasenia:['', Validators.required],
    });
  }
 
  onSubmit() {
    if(this.form.invalid){
      console.error("formulario invalido");
      return;
    }
    const loginType:LoginType = {
      usuario: this.form.get("usuario").value,
      contrasenia: this.form.get("contrasenia").value
    }

    this._loginService.login(loginType).subscribe((data:LoginType) => { alert(`usuario:${data.usuario} - contrasenia:${data.contrasenia}`) });
  }

  onLoginConGoogle(){
   alert("loggin con google");
  }
  
  onLoginConFacebook(){
   alert("loggin con facebook");
  }
}
