import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Invitado } from '../models/invitado-model';

@Component({
  selector: 'app-invitacion',
  templateUrl: './invitacion.component.html',
  styleUrls: ['./invitacion.component.scss']
})
export class InvitacionComponent implements OnInit {

  mensaje: string;
  invitado: Invitado;

  constructor(public vista: MatBottomSheetRef<InvitacionComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) data: any) {
    this.invitado = data;
  }

  ngOnInit(): void {
    this.mensaje = `¡Hola ${this.invitado.nombre}, estás invitado a nuestro evento. Esperamos puedas asistir. Te invitamos a confirmar tu presencia en el siguiente enlace: `;
  }

  get urlConfirmacion(): string { return `${window.location.protocol}//${window.location.host}/invitados/${this.invitado.id}/confirmacion`; }

  get whatsappLink() { return `https://wa.me/52${this.invitado.telefono}?text=${this.mensaje}\n\n${this.urlConfirmacion}`; }

}
