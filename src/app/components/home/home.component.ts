import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  //styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  newReleases: any[] = [];
  showLoading: boolean;

  errorLoading: boolean;
  messageErrorService: string;

  constructor( private spotify: SpotifyService ) {

    this.errorLoading = false;
    this.showLoading = true;
    this.spotify.getNewReleases()
    .subscribe( ( data: any ) => {
      this.newReleases = data;
      this.showLoading = false;
    }, (errorService) => { //segundo parametro del suscribe para ser controlado
      this.errorLoading = true;
      this.showLoading = false;
      this.messageErrorService = errorService.error.error.message;
    });

  }
}
