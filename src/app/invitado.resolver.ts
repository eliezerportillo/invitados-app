import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Invitado } from './models/invitado-model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class InvitadoResolver implements Resolve<Invitado> {

  constructor(private db: AngularFirestore) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Invitado> | Promise<Invitado> {

    const id = route.paramMap.get('id');
    const x = this.db.collection<Invitado>('invitados')
      .doc(id)
      .get()
      .toPromise()
      .then((response) => {

        const doc = response.data();
        doc.id = response.id;        

        return doc;
      });

      return x;
  }
}
