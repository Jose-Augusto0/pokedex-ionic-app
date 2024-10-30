import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl: string = 'https://pokeapi.co/api/v2/pokemon';
  private pageLimit = new BehaviorSubject<number>(16);
  pageLimit$ = this.pageLimit.asObservable();
  private inicialPokemons = new BehaviorSubject<string[]>([]);
  inicialPokemons$ = this.inicialPokemons.asObservable();

  constructor(private http: HttpClient) {
    this.loadPokemons();
  }

  limit(increment: number): void {
    const newLimit = this.pageLimit.value + increment;
    this.pageLimit.next(newLimit);
    this.loadPokemons();
  }

  private loadPokemons(): void {
    this.test().subscribe((res: any) => {
      const pokemonNames = res.results.map((el: any) => el.name);
      this.inicialPokemons.next(pokemonNames);
    });
  }

  getPokemons(pokemonName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${pokemonName}`);
  }

  test(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}?limit=${this.pageLimit.value}&offset=0`
    );
  }

  getSpecies(speciesUrl: string): Observable<any> {
    return this.http.get<any>(speciesUrl);
  }
}
