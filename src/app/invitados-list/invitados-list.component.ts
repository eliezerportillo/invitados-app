import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Invitado } from '../models/invitado-model';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-invitados-list',
  templateUrl: './invitados-list.component.html',
  styleUrls: ['./invitados-list.component.scss']
})
export class InvitadosListComponent implements OnInit {

  titulo: string;
  private collectionRef: AngularFirestoreCollection<Invitado>;
  invitados: Invitado[];
  invitadosFiltrados: Observable<Invitado[]>;
  filtro: FormControl;
  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore) {

    this.invitados = [];
    this.filtro = new FormControl();
    this.collectionRef = this.db.collection('invitados', ref => ref.orderBy('nombre'));
    this.titulo = this.route.snapshot.data['titulo'];

  }

  ngOnInit(): void {
    this.collectionRef
      .snapshotChanges()
      .subscribe((querySnapshot) => {
        this.invitados = [];
        querySnapshot.forEach((doc) => {
          const data = doc.payload.doc.data();
          const docId = doc.payload.doc.id;
          this.invitados.push({ id: docId, nombre: data.nombre, confirmado: data.confirmado, telefono: data.telefono, correo: data.correo });
        });

        this.invitadosFiltrados = this.filtro.valueChanges.pipe(
          startWith(''),
          map(value => this._filtrar(value))
        );

      });
  }

  private _filtrar(filtro: string): Invitado[] {
    const lower = filtro.toLowerCase();
    return this.invitados.filter(invitado => invitado.nombre.toLowerCase().includes(lower));
  }

}
