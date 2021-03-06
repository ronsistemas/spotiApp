import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  
  constructor( private http: HttpClient ) { 
  }

  //Función Query para no repetir toda la variable en las llamadas get
  getQuery( query: string ) {
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      Authorization: 'Bearer BQApNnXbD2wDKU_W4yKNuCClduQqN8xjmWxrkDP0Xpm7TwbfuwmhYSLyV5SUVx0YCnLNDRWCoCvauwfw6HI'
    });
    return this.http.get(url, {headers});
  }

  //El código comentado en las siguientes funciones ya no es necesario ya que la función getQuery lo sustituye
  //FUNCIÓN PARA OBTENCIÓN DE NUEVOS LANZAMIENTOS
  getNewReleases() {
   /*  const headers = new HttpHeaders({
      Authorization: 'Bearer BQB9L-WIYlTqpHUTzYPQBx26mMByM-WmGgInSKmHk3hw2rEXB_HbfOEIVjLTWPc-l6tK2EYgh_r_a1wgQaA'
    }); */
    return this.getQuery('browse/new-releases')
    // Pipe que extrae la información necesaria del objeto que se recibe y lo almacena en un array
    .pipe( map( data => data['albums'].items ));
    /* this.http.get('https://api.spotify.com/v1/browse/new-releases', { headers })
      .pipe( map( data => data['albums'].items )); */
  }

    //FUNCIÓN PARA OBTENCIÓN DE ARTISTAS EN LA BÚSQUEDA
  getArtistas( termino: string ) {

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
    .pipe( map( data => data['artists'].items) );

    /* const headers = new HttpHeaders({
      Authorization: 'Bearer BQAwea3_QJlvres61IRvKEirhTo6qrAyDtI59Zsd-fvALdtgyNw4OD_tAmvhTZpfrHx8-zUAYAAk4ROLoMWegqj86qcP3RODlH7M0uHtVXjki1gxGM4PfS3kYXhSiV4XVLtsOZaxUb5iOQ'
    }); */
    /* return this.http.get(`https://api.spotify.com/v1/search?q=${ termino }&type=artist&limit=15`, { headers })
    .pipe( map( data => data['artists'].items) ); */
}

getArtista( id: string ) {
  return this.getQuery(`artists/${id}`);
  //.pipe( map( data => data['artists']) );
}

getTopTracks( id: string ) {
  return this.getQuery(`artists/${id}/top-tracks?country=es`)
  .pipe( map( data => data['tracks']) );
}

getLists() {
  return this.getQuery('users/1153958854/playlists')
  .pipe( map( data => data['items'] ) );

  }

}

