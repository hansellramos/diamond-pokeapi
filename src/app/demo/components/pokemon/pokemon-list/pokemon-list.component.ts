import { Component } from '@angular/core';
import {PokemonService} from "../../../../services/pokemon.service";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
    items: any[] = [];
    itemsColumns: any[] = [];

    constructor(private pokemonService: PokemonService) {
        this.pokemonService.getAll().subscribe((data) => {
            this.items = data.results;
        });
    }

    ngOnInit() {
        this.itemsColumns = [
            { field: 'name', header: 'Name' },
            { field: 'url', header: 'URL' },
        ];
    }

    goToDetail(rowData: any) {
        console.log(rowData);
    }
}
