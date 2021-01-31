import { Component, Input, OnInit } from '@angular/core';
import { Invitado } from '../models/invitado-model';

@Component({
  selector: 'app-invitacion',
  templateUrl: './invitacion.component.html',
  styleUrls: ['./invitacion.component.scss']
})
export class InvitacionComponent implements OnInit {

  mensaje: string;
  @Input() invitado: Invitado;

  constructor() { }

  ngOnInit(): void {
    this.mensaje = `¡Hola ${this.invitado.nombre}, estás invitado a nuestro evento. Esperamos puedas asistir. Te invitamos a confirmar tu presencia en el siguiente enlace: `;
  }

  get urlConfirmacion(): string { return `${window.location.protocol}//${window.location.host}/invitados/${this.invitado.id}/confirmacion`; }

  get whatsappLink() { return `https://wa.me/52${this.invitado.telefono}?text=${this.mensaje}\n\n${this.urlConfirmacion}`; }

}
