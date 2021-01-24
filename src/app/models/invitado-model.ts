export interface Invitado {
    id: string;
    nombre: string;
    telefono:string;
    correo:string;
    confirmado: boolean;

    invitadosRef?: any[];
    invitados?: Invitado[];
}