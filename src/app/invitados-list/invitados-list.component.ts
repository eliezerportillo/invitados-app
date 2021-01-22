import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Invitado } from '../models/invitado-model';

@Component({
  selector: 'app-invitados-list',
  templateUrl: './invitados-list.component.html',
  styleUrls: ['./invitados-list.component.scss']
})
export class InvitadosListComponent implements OnInit {

  titulo: string;
  private collectionRef: AngularFirestoreCollection<Invitado>;
  invitados: Invitado[];
  filtro: string;
  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore) {

    this.invitados = [];
    this.filtro = '';
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
          this.invitados.push({ id: docId, nombre: data.nombre, confirmado: data.confirmado });
        });
      });
  }

  get invitadosFiltrados(): Invitado[] {

    if (this.filtro.length > 0) {
      return this.invitados.filter(x => x.nombre.toLocaleLowerCase().includes(this.filtro.toLocaleLowerCase()));
    } else {
      return this.invitados;
    }

  }

}
