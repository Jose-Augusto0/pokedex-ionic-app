import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  pokemonsList: any = [];
  searchPokemon: string = '';

  constructor(private service: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  onSearchChange(value: string): void {
    console.log('Valor digitado no search:', value);
  }

  detailsPokemon(pokeName: number) {
    this.router.navigate(['/details', pokeName]);
  }

  getPokemons(): void {
    const pokemonNames: string[] = [
      'pikachu',
      'machamp',
      'venusaur',
      'arbok',
      'blastoise',
      'golbat',
      'arceus',
      'lugia',
    ];

    pokemonNames.filter((name) => {
      this.service.getPokemons(name).subscribe({
        next: (res) => {
          const pokemon: any = {
            id: res.id,
            name: res.name,
            sprites: res.sprites,
            types: res.types,
            stats: res.stats,
            moves: res.moves,
            abilities: res.abilities,
            height: res.height,
            weight: res.weight,
            species: res.species,
            base_experience: res.base_experience,
          };
          this.pokemonsList.push(pokemon);
        },
        error: (err) => console.log('Não consegui encontrar o Pokémon', err),
      });
    });
  }
}
