import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginType } from './login.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(login:LoginType):Observable<any>{
    return of(login);
  }
}
