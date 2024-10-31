import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  pokemon: any;
  actualTab: number = 0;
  @ViewChild('btnFavorite') btnFavorite!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private service: DataService,
    private favoriteService: FavoritesService
  ) {}

  nextTab(tab: number) {
    this.actualTab = tab;
  }

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('pokeName');
    if (name) {
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
          this.service.getSpecies(pokemon.species.url).subscribe({
            next: (res) => {
              pokemon.description = res.flavor_text_entries[0].flavor_text;
              pokemon.color = res.color.name;
            },
          });
          this.pokemon = pokemon;
        },
        error: (err) => console.log('Pokémon não encontrado', err),
      });
    }
    this.loadFavorite();
  }

  loadFavorite() {
    this.favoriteService.getFavorites().subscribe((res: any) => {
      res.forEach((el: any) => {
        if (this.pokemon.id) {
          if (this.pokemon.id === Number(el.id)) {
            this.btnFavorite.nativeElement.style.color = 'red';
          }
        }
      });
    });
  }

  sendFavorite(pokemon: any) {
    let favoritePokemon: any = {
      id: String(pokemon.id),
      name: pokemon.name,
    };
    this.favoriteService.getFavorites().subscribe((res: any) => {
      let hasPokemon: boolean = res.some(
        (el: any) => pokemon.id === Number(el.id)
      );
      if (!hasPokemon) {
        console.log('pokemon enviado');
        this.favoriteService
          .sendFavorite(favoritePokemon)
          .subscribe(
            () => (this.btnFavorite.nativeElement.style.color = 'red')
          );
      } else {
        console.log('pokemon existente nos favoritos');
        this.removeFavorite(pokemon.id);
      }
    });
  }

  removeFavorite(id: string) {
    this.favoriteService
      .removeFavorite(id)
      .subscribe(() => (this.btnFavorite.nativeElement.style.color = ''));
  }
}
