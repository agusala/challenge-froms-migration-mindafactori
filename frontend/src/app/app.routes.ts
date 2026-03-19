import { Routes } from '@angular/router';
import { ListadoComponent } from './components/listado/listado.component';
import { FormularioComponent } from './components/formulario/formulario.component';

export const routes: Routes = [
  { path: '', component: ListadoComponent },
  { path: 'formulario', component: FormularioComponent },
  { path: 'formulario/:dominio', component: FormularioComponent },
];