import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  apiTest: string = 'http://localhost:3000/favorites';
  apiUrl: string = 'https://localhost:7135/api/favorites';

  constructor(private http: HttpClient) {}

  sendFavorite(pokemon: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pokemon);
  }

  getFavorites(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  removeFavorite(id: string):Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
