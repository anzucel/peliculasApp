import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  buscando = false;
  ideas: string[] = ['SpiderMan', 'Avengers', 'El señor de los anillos', 'Harry Potter']
  peliculas: Pelicula[] = [];

  constructor( private MoviesServicie : MoviesService,
               private modalCtrl: ModalController) {}

  buscar( event ){
    const valor: string = event.detail.value;

    if(valor.length === 0){
      this.buscando = false;
      this.peliculas=[];
      return;
    }
    console.log(valor);
    this.buscando = true;
    this.MoviesServicie.buscarPeliculas(valor)
    .subscribe(resp =>{
      console.log(resp);
      this.peliculas = resp['results'];
      this.buscando = false;
    });
  }

  async Detalle( id: string ){
    const modal =  await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps:{  //objetos que se quieren mandar, arreglo de info
        id
      }
    });
    modal.present();
  }
}
