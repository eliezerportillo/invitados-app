import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Invitado } from '../models/invitado-model';
import { InvitadoService } from '../services/invitado.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { InvitacionComponent } from '../invitacion/invitacion.component';

@Component({
  selector: 'app-formulario-invitados',
  templateUrl: './formulario-invitados.component.html',
  styleUrls: ['./formulario-invitados.component.scss']
})
export class FormularioInvitadosComponent implements OnInit {

  form: FormGroup;
  filtro: FormControl = new FormControl();
  invitado: Invitado;
  nombre: FormControl;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _fb: FormBuilder,
    private readonly _invitadoService: InvitadoService,
    private readonly _bottomSheet: MatBottomSheet) {

    this.nombre = new FormControl('', Validators.required);
    this.form = this._fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      invitados: _fb.array([])
    });
  }


  get invitados() {
    return this.form.get('invitados') as FormArray;
  }

  get sinInvitados(): boolean { return !this.invitados.value.some(x => true); }

  ngOnInit(): void {
    this.invitado = this._route.snapshot.data['invitado'] as Invitado;
    this.form.patchValue(this.invitado);
    this.form.get('nombre').valueChanges.subscribe(value => this.invitado.nombre = value);
  }

  onGuardar() {
    if (this.form.invalid) {
      return;
    }

    this._invitadoService.guardar(this.invitado);
  }

  onAdd() {
    this.invitados.push(this._fb.control(this.nombre.value));
    this.nombre.reset();
  }

  onRemove(index) {
    this.invitados.removeAt(index);

  }

  onInvitar(): void {
    this._bottomSheet.open(InvitacionComponent, { data: this.invitado });
  }

}
