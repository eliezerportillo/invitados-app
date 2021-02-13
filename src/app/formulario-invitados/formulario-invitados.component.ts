import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  model: Invitado;
  nombreControl: FormControl;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly invitadoService: InvitadoService,
    private readonly bottomSheet: MatBottomSheet,
    private readonly router: Router) {

    this.nombreControl = new FormControl('');
    this.form = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      confirmado: [false]
    });
  }


  get invitados() { return this.form.get('invitados') as FormArray; }

  get sinInvitados(): boolean { return !this.invitados.value.some(x => true); }

  ngOnInit(): void {
    this.model = this.route.snapshot.data['invitado'] as Invitado;
    this.form.patchValue(this.model);

    const acompanantes = this.model.invitados.map(x => {
      return this.fb.group({
        id: [x.id],
        nombre: [x.nombre, Validators.required]
      });
    });

    this.form.registerControl('invitados', new FormArray(acompanantes));
  }

  onGuardar() {
    if (this.form.invalid) {
      return;
    }

    const data = this.form.getRawValue() as Invitado;
    this.invitadoService.guardar(data).then(() => this.router.navigate(['invitados']));
  }

  onAdd() {
    if (this.nombreControl.value === '') return;

    this.invitados.controls.unshift(this.fb.group({
      id: [''],
      nombre: [this.nombreControl.value, Validators.required]
    }));
    this.nombreControl.reset();
  }

  onRemove(index) {
    this.invitados.removeAt(index);
  }

  onInvitar(): void {
    this.bottomSheet.open(InvitacionComponent, { data: this.model });
  }

}
