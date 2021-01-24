import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Acompaniante } from '../models/acompaniante-model.';

@Injectable()
export class AcompanianteService {

    obtenerAcompaniantes(invitadoId:string):Observable<Acompaniante[]> {
        // mock
        const acompaniantes:Acompaniante[] = [
            {
                id:1,
                nombre:'Sunny Moreno',
                confirmado:false
            },
            {
                id:1,
                nombre:'Sunny Moreno',
                confirmado:false
            },
            {
                id:1,
                nombre:'Sunny Moreno',
                confirmado:false
            },
            {
                id:1,
                nombre:'Sunny Moreno',
                confirmado:false
            },
        ];
        return of(acompaniantes)
    }
}