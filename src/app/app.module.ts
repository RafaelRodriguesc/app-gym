import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/home/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './pages/home/footer/footer.component';
import { ContentComponent } from './pages/home/content/content.component';
import { HomeComponent } from './pages/home/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListaUsuariosComponent } from './pages/lista-cadastrados/usuarios/lista-usuarios.component';
import { ListaClientesComponent } from './pages/lista-cadastrados/clientes/lista-clientes.component';
import { QuemSomosComponent } from './pages/quem-somos/quem-somos.component';
import { AgendaComponent } from './pages/agenda/agenda.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    LoginComponent,
    HomeComponent,
    ListaUsuariosComponent,
    ListaClientesComponent,
    QuemSomosComponent,
    AgendaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
