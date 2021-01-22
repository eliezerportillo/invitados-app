import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ShellComponent } from './shell/shell.component';




const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    data: {
      titulo: 'Inivtados App'
    },
    children: [
      
    ]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
