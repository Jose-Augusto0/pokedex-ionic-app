import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  pokemon: any;
  actualTab: number = 0;

  constructor(private route: ActivatedRoute, private service: DataService) {}

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
          this.pokemon = pokemon;
        },
        error: (err) => console.log('Pokémon não encontrado', err),
      });
    }
  }
}
