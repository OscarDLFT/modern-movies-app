import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = environment.apiKey;
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);
  constructor() { }

  getMovies(page: number = 1): Observable<any> {
    return this.http.get(`${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`);
  }

  getMoviesDetail(id: string): Observable<any> {
    return this.http.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  }
}
