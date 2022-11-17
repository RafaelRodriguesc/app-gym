import { AgendaComponent } from './pages/agenda/agenda.component';
import { ListaUsuariosComponent } from './pages/lista-cadastrados/usuarios/lista-usuarios.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './pages/home/content/content.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './pages/home/header/header.component';
import { FooterComponent } from './pages/home/footer/footer.component';
import { HomeComponent } from './pages/home/home/home.component';
import { ListaClientesComponent } from './pages/lista-cadastrados/clientes/lista-clientes.component';
import { QuemSomosComponent } from './pages/quem-somos/quem-somos.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'header', component: HeaderComponent},
  { path: 'footer', component: FooterComponent},
  { path: 'content', component: ContentComponent},
  { path: 'lista-usuarios', component: ListaUsuariosComponent},
  { path: 'lista-clientes', component: ListaClientesComponent},
  { path: 'quem-somos', component: QuemSomosComponent},
  { path: 'agenda', component: AgendaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
