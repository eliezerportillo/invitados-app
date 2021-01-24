import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShellComponent } from './shell/shell.component';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { environment } from 'src/environments/environment';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { InvitadosListComponent } from './invitados-list/invitados-list.component';
import { RecepcionComponent } from './recepcion/recepcion.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { FormularioInvitadosComponent } from './formulario-invitados/formulario-invitados.component';
import { AcompanianteService } from './services/acompaniante.service';
import { InvitadoService } from './services/invitado.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShellComponent,
    UserMenuComponent,
    InvitadosListComponent,
    RecepcionComponent,
    ConfirmacionComponent,
    FormularioInvitadosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [Title, AcompanianteService, InvitadoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
