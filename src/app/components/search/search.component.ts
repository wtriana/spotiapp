import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  showLoading: boolean = false;
  artists: any[] = [];
  constructor( private spotify: SpotifyService) { }

  buscar( termino: String ){
    this.showLoading = true;
    if (termino.length > 2){
      this.spotify.getArtists( termino )
      .subscribe( ( data: any ) => {
        this.artists = data;
        this.showLoading = false;
      });
    } else {
      this.artists = [];
      this.showLoading = false;
    }
  }

}
