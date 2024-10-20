import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  pokemonsList:any = []

  constructor(private service: DataService) {}

  
  ngOnInit(): void {
    this.getPokemons()
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
          console.log(this.pokemonsList)

        },
        error: (err) => console.log('Não consegui encontrar o Pokémon', err),
      });
    });



  }

  
}
