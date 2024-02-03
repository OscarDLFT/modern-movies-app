import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, InfiniteScrollCustomEvent, IonList, IonItem, IonSkeletonText, IonAvatar, IonAlert, IonLabel, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent,  } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { MovieResult } from '../services/interfaces';
import { catchError, finalize } from 'rxjs';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonList, 
    IonItem, 
    IonSkeletonText, 
    IonAvatar, 
    IonAlert, 
    IonLabel,
    DatePipe,
    RouterModule,
    IonBadge,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
})
export class HomePage implements OnInit {
  // Variables
  private currentPage: number = 1;
  public error: any = null;
  public loading: boolean = false;
  public movies: MovieResult[] = [];
  public imageBaseUrl: string = 'https://image.tmdb.org/t/p';
  public skeleton: any[] = new Array(5);

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
        this.error = err.error.status_message;
        return this.movies = [];
      })
    )
    .subscribe((movies) => {
        this.movies.push(...movies.results);
        if (event) {
          event.target.disabled = movies.total_pages === this.currentPage;
        }
      },
    );
  }

  loadMore(event: InfiniteScrollCustomEvent): void {
    this.currentPage++;
    this.loadMovies(event);
  }
}
