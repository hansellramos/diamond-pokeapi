import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokemonListComponent} from "./pokemon-list/pokemon-list.component";

const routes: Routes = [
    { path: '', data: {breadcrumb: 'Pokemon Dashboard'}, component: PokemonListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule { }
