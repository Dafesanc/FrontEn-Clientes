import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesindexComponent } from './features/clientes/clientesindex/clientesindex.component';

const routes: Routes = [
  { path: '', redirectTo: '/Inicio', pathMatch: 'full' },
  { path: 'Inicio', component: ClientesindexComponent },
  { path: 'Clientes', component: ClientesindexComponent }

  //{ path: '**', component: PageNotFoundComponent } // Ruta para manejar páginas no encontrada

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
