import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];
  favoritoPorGenero: any[] = [];

  constructor( private datalocal : DataLocalService,
               private movieService: MoviesService) {}

  async ionViewWillEnter(){
    //se dispara cada vez que la página vaya a entrar 
    this.peliculas = await this.datalocal.cargarFavoritos(); // recibe arreglo y llena peliculas
    this.generos = await this.movieService.cargarGeneros();
    this.peliculasPorGenero(this.generos, this.peliculas);
  }

  peliculasPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]){
    //barrer cada genero y agrupar las peliculas por cada genero 
    this.favoritoPorGenero = [];
    generos.forEach(genero =>{  //barrer el arreglo de genero
      this.favoritoPorGenero.push({ //inserta en el arreglo un objeto
        genero: genero.name,
        pelicula: peliculas.filter(peli =>{
          return peli.genres.find( genre => genre.id === genero.id); // si lo es lo inserta en el arreglo de peliculas
        }) // retorna elementos que cumplen con dicha condición
      });
    });

    console.log(this.favoritoPorGenero);
  }
}
