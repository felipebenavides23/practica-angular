import { configguard } from './guard/config.guard';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component';
import { LoginComponent } from './components/login/login.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { LoginGuardian } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: TableroComponent, canActivate: [LoginGuardian] },
  { path: 'login', component: LoginComponent },
  {
    path: 'registrarse',
    component: RegistroComponent,
    canActivate: [configguard],
  },
  {
    path: 'configuracion',
    component: ConfiguracionComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'cliente/editar/:id',
    component: EditarClienteComponent,
    canActivate: [LoginGuardian],
  },
  { path: '**', component: NoEncontradoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
