import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Invitado } from '../models/invitado-model';

@Injectable()
export class InvitadoService {

    registrar(invitado:Invitado){
        alert("TODO: registrar un invitado");
    }

    actualizar(id:string, invitado:Invitado){
        alert("TODO: actualiza un invitado");
    }

    obtenerPorId(id:string):Observable<Invitado> {
        const invitados:Invitado[] = [
            {
                id:"fda0a1b4-a5a0-4f2d-aad9-ca9e22705b16",
                nombre:'Dwayne Little',
                confirmado:false,
                telefono:'374-772-9686 x6712',
                correo:'any@gmail.com'
            },
            {
                id:"ca9ad01c-b444-4ed2-9dd5-c647f620d6a5",
                nombre:'Jim Mohr',
                confirmado:false,
                telefono:'(364) 349-9793 x219',
                correo:'any@gmail.com'
            },
            {
                id:"9be18ac3-036d-48e6-991b-4a9893b6e910",
                nombre:'Maxine Nader',
                confirmado:false,
                telefono:'(472) 588-8339 x27575',
                correo:'any@gmail.com'
            }   , 
        ];
        const filteredInvitados = invitados.find(i=>i.id === id);
        return of(filteredInvitados)
    }
}