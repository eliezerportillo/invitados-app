export interface Invitado {
    id: string;
    nombre: string;
    confirmado: boolean;

    invitadosRef?: any[];
    invitados?: Invitado[];
}