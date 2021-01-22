import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app'

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  user: firebase.User;
  constructor(private auth: AngularFireAuth, private router: Router) {
    auth.currentUser.then(user => {
      this.user = user;
    });

  }

  ngOnInit(): void {
  }

  get photo(): string {
    return this.user.photoURL;
  }

  get hasPhoto(): boolean {
    return this.user.photoURL ? true : false;
  }

  onLogout(){
    this.auth
    .signOut()
    .then(response=> this.router.navigate(['/login']));
  }

}
