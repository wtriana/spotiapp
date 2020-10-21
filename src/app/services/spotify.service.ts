import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token: string = 'BQCQEW13n_a2bVK8apQpQL_d015NcYyi796XPMUc1AR27h3y75EGsvpNlfPgaFIagxhOj-rF1GNXk3wjd9A';

  postToken = {
    grant_type : 'client_credentials',
    client_id: '6b3e674e5dfd4aa092d75c104549c05a',
    client_secret: 'ec7fd000cec64b4f9ec8ddc65a581379'
  };

  constructor(private http: HttpClient) {
    //this.getToken(); //no funciona el post porque se debe hacer desde un servidor y no desde un local
  }

  getToken(){
    const url: string = 'https://accounts.spotify.com/api/token';
    console.log("holasssssssssssssssssssss funcion getToken => "+url);
    this.http.post(url, this.postToken)
    .subscribe( (data: any) => {
      console.log(data);
      this.token = data.access_token
    });
  }

  getQuery(query: string){
    const url: string = `https://api.spotify.com/v1/${ query }`;
    //console.log(`url=> ${ url }`);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get(url, { headers });
  }

  //pipe si necesitamos mapear los datos
  getNewReleases()
  {
    return this.getQuery('browse/new-releases?limit=20')
    .pipe( map( (dataResponse: any) => dataResponse['albums'].items));
  }

  //pipe si necesitamos mapear los datos
  getArtists( termino: String ){
    return this.getQuery(`search?q=${ termino }&type=artist&limit=10`)
    .pipe( map( (dataResponse: any) => dataResponse['artists'].items ));
  }

  //si los datos ya estan listos para trabajar
  getArtistById( artistID: string){
    return this.getQuery(`artists/${ artistID }`);
  }

  getTopTrackByArtistId(artistID: string){
    return this.getQuery(`artists/${ artistID }/top-tracks?market=ES`)
    .pipe( map( (dataResponse: any) => dataResponse['tracks'] ));
  }

}
