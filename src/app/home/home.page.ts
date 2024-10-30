import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  pokemonsList: any = [];

  constructor(private service: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getPokemons();
    this.searchPokemon();
  }

  searchPokemon() {
    const searchBox = document.getElementById('searchBox');

    if (searchBox) {
      fromEvent(searchBox, 'input')
        .pipe(
          debounceTime(1000),
          map((event: any) => event.target.value),
          distinctUntilChanged()
        )
        .subscribe((value: string) => {
          if (value) {
            this.service.getPokemons(value.toLowerCase()).subscribe({
              next: (res) => {
                this.pokemonsList = [];
                const pokemon: any = {
                  id: res.id,
                  name: res.name,
                  sprites: res.sprites,
                };
                this.pokemonsList.push(pokemon);
              },
              error: (err) => console.log('Pokémon não encontrado', err),
            });
          } else {
            this.getPokemons();
          }
        });
    }
  }

  detailsPokemon(pokeName: number) {
    this.router.navigate(['/details', pokeName]);
  }

  getPokemons(): void {
    this.service.inicialPokemons$.subscribe((pokemonNames: string[]) => {
      this.pokemonsList = []; 

      pokemonNames.forEach((name) => {
        this.service.getPokemons(name).subscribe({
          next: (res) => {
            const pokemon = {
              id: res.id,
              name: res.name,
              sprites: res.sprites,
            };
            this.pokemonsList.push(pokemon);
          },
          error: (err) => console.log('Não consegui encontrar o Pokémon', err),
        });
      });
    });
  }

  loadMorePokemons(): void {
    this.service.limit(4); 
  }
}
