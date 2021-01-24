import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Acompaniante } from '../models/acompaniante-model.';
import { Invitado } from '../models/invitado-model';
import { AcompanianteService } from '../services/acompaniante.service';
import { InvitadoService } from '../services/invitado.service';

@Component({
  selector: 'app-formulario-invitados',
  templateUrl: './formulario-invitados.component.html',
  styleUrls: ['./formulario-invitados.component.scss']
})
export class FormularioInvitadosComponent implements OnInit {

  titulo:string;
  form:FormGroup;
  filtro:FormControl = new FormControl();
  acompaniantes: Acompaniante[];
  acompaniantesFiltrados:Observable<Acompaniante[]>;
  invitadoId:string;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _fb: FormBuilder,
    private readonly _acompanianteService:AcompanianteService, // aqui todo se podria obtener desde el invitadoservice de hecho XD
    private readonly _invitadoService:InvitadoService,) {    

    this.titulo = this._route.snapshot.data['titulo'];
    this.invitadoId = this._route.snapshot.params['id'];

    this.form = this._fb.group({
      nombre:['',Validators.required],
      telefono:['',Validators.required],
      correo:['',Validators.compose([Validators.required, Validators.email])],
    });
  }

  ngOnInit(): void {    

    if(this.invitadoId) {            
      this._invitadoService.obtenerPorId(this.invitadoId).subscribe((invitado:Invitado)=> {
        this.form = this._fb.group({
          nombre:[invitado.nombre,Validators.required],
          telefono:[invitado.telefono,Validators.required],
          correo:[invitado.correo, Validators.compose([Validators.required, Validators.email])],
        });
      });

      this._acompanianteService.obtenerAcompaniantes(this.invitadoId)
      .subscribe((acompaniantes:Acompaniante[])=> this.acompaniantes = acompaniantes);
    }

    this.acompaniantesFiltrados = this.filtro.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  onSubmit() {
    alert(this.form.invalid);
    if(this.form.invalid){
      console.error('formulario invalido');
      return;
    }
    
    this.invitadoId ? this.actualizar() : this.registrar();
  }

  private _filter(value: string): Acompaniante[] {
    const filterValue = value.toLowerCase();  
    return this.acompaniantes.filter(acompaniante => acompaniante.nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  private registrar(){
    alert("registrando");
  }

  private actualizar(){
    alert("actualizando");
  }

}
