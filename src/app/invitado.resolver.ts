import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { Invitado } from './models/invitado-model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class InvitadoResolver implements Resolve<Invitado> {

  invitadoVacio: Invitado;
  constructor(private db: AngularFirestore) {
    this.invitadoVacio = {
      id: '',
      nombre: '',
      confirmado: false,
      correo: '',
      telefono: '',
      invitados: []
    };
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Invitado> | Promise<Invitado> {
    const id = route.paramMap.get('id');
    if (id === null || id === '') {
      return of(this.invitadoVacio);
    }
    else {
      return this.get(id);
    }
  }

  async get(id) {
    const ref = await this.db.collection<Invitado>('invitados')
      .doc(id)
      .get()
      .toPromise();

    const doc = ref.data();

    if (!doc) {
      return this.invitadoVacio;
    }

    doc.id = ref.id;
    doc.invitados = [];

    if (!doc.invitadosRef) {
      return doc;
    }

    for (let i = 0; i < doc.invitadosRef.length; i++) {
      const element = doc.invitadosRef[i];
      const item = await element.get();
      const data = item.data();
      doc.invitados.push({ id: item.id, nombre: data.nombre, confirmado: data.confirmado, telefono: null, correo: null });
    }

    return doc;
  }
}
