import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private auth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar) { }

  get email(): string { return this.form.get('usuario').value; }
  get password(): string { return this.form.get('contrasenia').value; }

  ngOnInit(): void {
    this.form = this._fb.group({
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.form.invalid) {
      console.error("formulario invalido");
      return;
    }

    this.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(response => {
        this.router.navigate(['invitados']);
      })
      .catch(err => {
        console.log('Something is wrong:', err.message);
      });
  }

  onSingup() {
    this.auth
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(response => {
        this.router.navigate(['invitados']);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });
  }

  onLoginConGoogle() {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(async (response) => {
        this.router.navigate(['invitados']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onLoginConFacebook() {
    this.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(async (response) => {
        this.router.navigate(['invitados']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
