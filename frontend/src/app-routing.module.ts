import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './app/components/listado/listado.component';
import { FormularioComponent } from './app/components/formulario/formulario.component';

const routes: Routes = [
  { path: '', component: ListadoComponent },
  { path: 'formulario', component: FormularioComponent },
  { path: 'formulario/:dominio', component: FormularioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }