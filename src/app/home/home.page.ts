import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, InfiniteScrollCustomEvent, IonList, IonItem, IonSkeletonText, IonAvatar, IonAlert,  } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { MovieResult } from '../services/interfaces';
import { catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonSkeletonText, IonAvatar, IonAlert],
})
export class HomePage implements OnInit {
  // Variables
  private currentPage: number = 1;
  public error: any = null;
  public loading: boolean = false;
  public movies: MovieResult[] = [];
  public imageBaseUrl: string = 'https://image.tmdb.org/t/p';

  constructor(
    private _movieService: MovieService,
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(event?: InfiniteScrollCustomEvent): void {
    this.error = null;
    if (!event) {
      this.loading = true;
    }
    this._movieService.getMovies(this.currentPage)
    .pipe(
      finalize(() => {
        this.loading = false;
        if (event) {
          event.target.complete();
        }
      }),
      catchError((err: any) => {
        console.log(err);
        this.error = err.error.status_message;
        return [];
      })
    )
    .subscribe({
      next: (movies) => {
        this.movies.push(...movies.results);
        if (event) {
          event.target.disabled = movies.total_pages === this.currentPage;
        }
      },
    }
    );
  }
}
