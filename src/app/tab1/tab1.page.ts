import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula, RespuestaMDB } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];

  constructor( private movieservice: MoviesService) {}

  ngOnInit(){
    // obtiene los valores
    this.movieservice.getCartelera()
    .subscribe( resp => {
      this.peliculasRecientes = resp.results;
    });

    this.getPopulares();
  }

  cargarMas(){
    this.getPopulares();
  }

  getPopulares(){
    this.movieservice.getPopular()
    .subscribe(resp => {
      //console.log('Populares', resp);
      const Temp = [...this.populares, ...resp.results]; // concatenando
      this.populares = Temp; //separa cada uno de los elementos que vienen en esos resultados
      //this.populares = resp.results;
    });
  }
}
