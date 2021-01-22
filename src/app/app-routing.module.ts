import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvitadosListComponent } from './invitados-list/invitados-list.component';
import { LoginComponent } from './login/login.component';
import { OnlyLoggedInUsersGuard } from './login/only-logged-in-users.guard';
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
