import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Invitado } from '../models/invitado-model';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent implements OnInit {

  id: string;
  private collectionRef: AngularFirestoreCollection<Invitado>;
  invitados: Invitado[];
  seleccionados: string[];
  confirmado: boolean;
  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore) {
    this.collectionRef = this.db.collection('invitados', ref => ref.orderBy('nombre'));
    this.invitados = [];
  }

  ngOnInit(): void {
    const doc = this.route.snapshot.data['invitado'] as Invitado;
    this.invitados.push(doc);

    if (doc.invitadosRef) {
      doc.invitadosRef.forEach(s => {
        s.get().then(item => {
          const data = item.data();
          this.invitados.push({ id: item.id, nombre: data.nombre, confirmado: data.confirmado });
        });
      });
    }
  }

  async confirmar(selected) {
    // init batch
    const invitados: string[] = selected.map(item => item.value);
    const batch = this.db.firestore.batch();
    invitados.forEach(id => {

      const docRef = this.collectionRef.doc(id).ref;
      batch.update(docRef, { confirmado: true })

    });
    await batch.commit();
    this.confirmado = true;
    location.reload();
  }

}
