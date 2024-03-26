import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import {PokemonListComponent} from "./pokemon-list/pokemon-list.component";
import {TableModule} from "primeng/table";
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';


@NgModule({
  declarations: [
      PokemonListComponent,
      PokemonDetailComponent
  ],
    imports: [
        CommonModule,
        PokemonRoutingModule,
        TableModule
    ]
})
export class PokemonModule { }
