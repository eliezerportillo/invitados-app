import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { FormularioInvitadosComponent } from './formulario-invitados/formulario-invitados.component';
import { InvitadoResolver } from './invitado.resolver';
import { InvitadosListComponent } from './invitados-list/invitados-list.component';
import { LoginComponent } from './login/login.component';
import { OnlyLoggedInUsersGuard } from './login/only-logged-in-users.guard';
import { RecepcionComponent } from './recepcion/recepcion.component';
import { ShellComponent } from './shell/shell.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: ShellComponent,
    canActivate: [OnlyLoggedInUsersGuard],
    data: {
      titulo: 'Inivitados App'
    },
    children: [
      {
        path: 'invitados',
        component: InvitadosListComponent,
        data: {
          titulo: 'Invitados'
        },
      },
      {
        path: 'invitados/agregar',
        component: FormularioInvitadosComponent,
        data: {
          titulo: 'Agregar invitado',
        },
        resolve: {
          invitado: InvitadoResolver
        }
      },
      {
        path: 'invitados/:id',
        component: FormularioInvitadosComponent,
        data: {
          titulo: 'Actualizar invitado',
        },
        resolve: {
          invitado: InvitadoResolver
        }
      },
      {
        path: 'recepcion',
        component: RecepcionComponent,
        data: {
          titulo: 'Recepción'
        },
      }
    ]
  },
  {
    path: 'invitados/:id/confirmacion',
    component: ConfirmacionComponent,
    resolve: {
      invitado: InvitadoResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
