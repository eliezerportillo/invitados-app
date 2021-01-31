import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Invitado } from '../models/invitado-model';
import { InvitadoService } from '../services/invitado.service';

@Component({
  selector: 'app-formulario-invitados',
  templateUrl: './formulario-invitados.component.html',
  styleUrls: ['./formulario-invitados.component.scss']
})
export class FormularioInvitadosComponent implements OnInit {

  form: FormGroup;
  filtro: FormControl = new FormControl();
  acompaniantes: Observable<Invitado[]>;
  invitado: Invitado;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _fb: FormBuilder,
    private readonly _invitadoService: InvitadoService) {

    this.form = this._fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  get nombre(): string { return this.form.get('nombre').value; }

  ngOnInit(): void {
    this.invitado = this._route.snapshot.data['invitado'] as Invitado;
    this.form.patchValue(this.invitado);
    this.acompaniantes = this.filtro.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.form.get('nombre').valueChanges.subscribe(value => this.invitado.nombre = value);
  }

  onSubmit() {
    alert(this.form.invalid);
    if (this.form.invalid) {
      console.error('formulario invalido');
      return;
    }

    this.invitado.id ? this.actualizar() : this.onGuardar();
  }

  private _filter(value: string): Invitado[] {
    const filterValue = value.toLowerCase();
    return this.invitado.invitados.filter(acompaniante => acompaniante.nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  onGuardar() {
    this._invitadoService.guardar(this.invitado);
  }

  private actualizar() {
    alert("actualizando");
  }

  onAdd() {
    this.invitado.invitados.push({ id: '', nombre: 'Nuevo', confirmado: false, correo: '', telefono: '' });
  }

  onDelete(item) {

  }

}
