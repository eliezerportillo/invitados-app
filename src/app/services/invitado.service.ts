import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Invitado } from '../models/invitado-model';

@Injectable()
export class InvitadoService {

    collectionRef: AngularFirestoreCollection;
    constructor(private db: AngularFirestore) {
        this.collectionRef = db.collection('invitados');
    }

    guardar(invitado: Invitado) {

        const temp = {
            nombre: invitado.nombre,
            confirmado: invitado.confirmado,
            correo: invitado.correo,
            telefono: invitado.telefono,
            invitadosRef: []
        }

        // inicializar lote de escritura
        const batch = this.db.firestore.batch();

        // añadir invitados al lote de escritura
        invitado.invitados.forEach(acomp => {

            const i = { nombre: acomp.nombre };

            let doc: DocumentReference;

            // será un nuevo invitado si no tiene id
            if (acomp.id === '') {
                doc = this.collectionRef.doc().ref;
                temp.invitadosRef.push(this.db.doc<Invitado>(`invitados/${doc.id}`).ref)
            }
            else {

                // En caso contrario, Se añadirá una referencia al invitado existente
                doc = this.collectionRef.doc(acomp.id).ref;
                temp.invitadosRef.push(this.db.doc<Invitado>(`invitados/${acomp.id}`).ref)

            }

            batch.set(doc, i);
        });

        if (invitado.id) {
            const invitadoExistente = this.collectionRef.doc(invitado.id).ref;
            batch.set(invitadoExistente, temp);
        }
        else {
            const invitadoNuevo = this.collectionRef.doc().ref;
            batch.set(invitadoNuevo, temp);
        }

        return batch.commit();
    }

    actualizar(id: string, invitado: Invitado) {
        alert("TODO: actualiza un invitado");
    }

    obtenerPorId(id: string): Observable<Invitado> {
        const invitados: Invitado[] = [
            {
                id: "fda0a1b4-a5a0-4f2d-aad9-ca9e22705b16",
                nombre: 'Dwayne Little',
                confirmado: false,
                telefono: '374-772-9686 x6712',
                correo: 'any@gmail.com'
            },
            {
                id: "ca9ad01c-b444-4ed2-9dd5-c647f620d6a5",
                nombre: 'Jim Mohr',
                confirmado: false,
                telefono: '(364) 349-9793 x219',
                correo: 'any@gmail.com'
            },
            {
                id: "9be18ac3-036d-48e6-991b-4a9893b6e910",
                nombre: 'Maxine Nader',
                confirmado: false,
                telefono: '(472) 588-8339 x27575',
                correo: 'any@gmail.com'
            },
        ];
        const filteredInvitados = invitados.find(i => i.id === id);
        return of(filteredInvitados)
    }
}