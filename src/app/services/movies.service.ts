import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits, Genre } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apikey;


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  generos: Genre[] = [];
  constructor( private http: HttpClient) { }

  private ejecutarQuery<T>( query: string ){
    query = URL + query;
    query+=`&api_key=${apiKey}&language=es&include_image_language=es`;

    return this.http.get<T>(query); 
  }


  getCartelera(){
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() +1, 0).getDate(); // ultimo día del mes
    const mes = hoy.getMonth() +1; // está en base a 0 
    let mesString;

    if(mes < 10){
      mesString = '0' + mes;
    }
    else{
      mesString = mes; 
    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`; //siempre se quiere el primer día
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;     

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  };

  getPopular()
  {
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  getDetallePelicula( id: string ){
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${ id }?a=1`);
  }

  getActoresPelicula( id: string ){
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }

  buscarPeliculas( titulo: string){
     return this.ejecutarQuery(`/search/movie?query=${titulo}`);
  }

  cargarGeneros(): Promise<Genre[]>{
    return new Promise(resolve => {
        this.ejecutarQuery(`/genre/movie/list?a=1`)
        .subscribe(resp => {
        this.generos = resp['genres'];
        resolve(this.generos); // regresa los generos encontrados
      });
    });
  }
}
