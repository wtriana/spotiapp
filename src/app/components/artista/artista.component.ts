import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent  {

  artista: any = {};
  canciones: any[] = [];
  showLoading: boolean;
  constructor(private router:ActivatedRoute,
    private _spotifyService: SpotifyService) {
      this.showLoading = true;
      this.router.params.subscribe( (params: any) => {
        this.getArtist(params['artistId']);
        this.getTopTracks(params['artistId']);
      });

  }

  getArtist(artistID: string){
    this.showLoading = true;
    this._spotifyService.getArtistById(artistID)
    .subscribe( (dataResponse: any) => {
      this.artista = dataResponse;
      this.showLoading = false;
      console.log(this.artista);
    });
  }

  getTopTracks(artistaID: string){
    this._spotifyService.getTopTrackByArtistId(artistaID)
    .subscribe((dataResponse: any) => {
      this.canciones = dataResponse;
      console.log(dataResponse);
    });

  }
}
