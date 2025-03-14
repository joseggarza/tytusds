import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListasCircularesComponent} from './PaginasWeb/listas-circulares/listas-circulares.component';
import {ListasCicularesDEComponent} from './PaginasWeb/listas-ciculares-de/listas-ciculares-de.component';
import { ListaSimpleComponent } from './PaginasWeb/lista-simple/lista-simple.component';
import { ListaDobleComponent } from './PaginasWeb/lista-doble/lista-doble.component';
import { PilaComponent } from './PaginasWeb/pila/pila.component';
import { CpComponent } from './PaginasWeb/cola-prioridad/cp.component';
import { ColaComponent } from './PaginasWeb/cola/cola.component';
import { MenuComponent } from './PaginasWeb/menu/menu.component';
import { SeleccionComponent } from './PaginasWeb/seleccion/seleccion.component';
import {OrdQuicksortComponent} from './PaginasWeb/ord-quicksort/ord-quicksort.component';
import {OrdBurbujaComponent} from './PaginasWeb/ord-burbuja/ord-burbuja.component';
import { AvlComponent } from './PaginasWeb/avl/avl.component';
import {ABinarioComponent} from './PaginasWeb/a-binario/a-binario.component';
import {InserccionComponent} from './PaginasWeb/inserccion/inserccion.component';
import {BComponent} from './PaginasWeb/b/b.component';

const routes: Routes = [
  {path:'menu', component: MenuComponent},
  {path:'ListasCirculares', component: ListasCircularesComponent},
  {path:'ListasCircularesDE', component:ListasCicularesDEComponent},
  {path:'ListaSimple', component: ListaSimpleComponent},
  {path:'Pila', component: PilaComponent},
  {path:'Cp', component: CpComponent},
  {path:'Cola', component: ColaComponent},
  {path:'ListaDoble', component: ListaDobleComponent},
  {path:'Seleccion', component: SeleccionComponent},
  {path:'OBurbuja', component: OrdBurbujaComponent},
  {path:'avl', component: AvlComponent},
  {path:'OQuicksort', component:OrdQuicksortComponent},
  {path:'Abinario', component:ABinarioComponent},
  {path:'Inserccion', component:InserccionComponent},
  {path:'B', component:BComponent},
  {path:'**', redirectTo: 'menu'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true, relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
