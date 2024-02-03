import { Component, Input, OnInit, WritableSignal, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MovieService } from '../services/movie.service';
import { MovieResult } from '../services/interfaces';
import { addIcons } from 'ionicons';
import { cashOutline, calendarOutline } from 'ionicons/icons';
import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    // IonicModule, 
    CommonModule, 
    FormsModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonList, 
    IonItem, 
    IonLabel,
    DatePipe,
    CurrencyPipe,
    IonText,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonIcon,
  ]
})
export class DetailsPage implements OnInit {
  // VARIABLES
  public imageBaseUrl: string = 'https://image.tmdb.org/t/p';
  public movie: WritableSignal<MovieResult | null> = signal(null);

  // INPUTS
  @Input() 
  set id(movieId: string) {
    this._movieService.getMoviesDetail(movieId)
    .subscribe((movie) => {
      this.movie.set(movie);
    })
  }

  constructor(
    private _movieService: MovieService,
  ) { }

  ngOnInit(): void {
    addIcons({cashOutline, calendarOutline});
  }

}
