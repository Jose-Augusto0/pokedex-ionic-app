import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}


  getPokemons(pokemonName: string): Observable<any>{
   return this.http
    .get<any>
    (`${this.apiUrl}/${pokemonName}`)

  }

  

}
