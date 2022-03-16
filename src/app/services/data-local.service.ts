import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor( private storage: Storage,
               private toastCtrl: ToastController) {
    this.initDB();
    this.cargarFavoritos();
   }

  private _storage: Storage | null = null;

    // se inicia la base de datos
  async initDB(){
    const storage = await this.storage.create();
    this._storage = storage;
  }
  
  guardarPelicula( pelicula: PeliculaDetalle){

    let existe = false;
    let mensaje ='';
    //barrer arreglo 
    for (const peli of this.peliculas){
      if(peli.id === pelicula.id){
        existe = true;
        break;
      }
    }

    if(existe){
      // regresa arreglo con todas las peliculas exceptuando la que existe. 
      this.peliculas= this.peliculas.filter(peli => peli.id !== pelicula.id); 
      mensaje = 'Removido de favoritos';  

    }
    else{
      //guardar en la db 
      this.peliculas.push(pelicula);
      mensaje = 'Agregada a favoritos';
    }

    // toast para mostrar el mensaje
    this.presentToast(mensaje);
    this.storage.set('peliculas', this.peliculas);

    return !existe;
  }

  async presentToast( mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 1500
    });
    toast.present();
  }

  //las que se tienen guardadas en el storage
  async cargarFavoritos(){
    //se llama justo cuando el constructor o servicio es inicilaizado
    //retorne promesa con los favoritos ya cargados
    const peliculas = await this.storage.get('peliculas'); // regresa un null si no existe
    this.peliculas = peliculas || []; // si es null manda un arreglo vacío
    return this.peliculas;
  }

  async existePelicula(id){
    //espera a cargar la parte de favoritos
    await this.cargarFavoritos();
    const existe = this.peliculas.find(peli => peli.id === id); //si existe retorna todo el objeto de la pelicula, sino, undefine
    return (existe) ? true : false; // si existe, retorna true, sino false
  }
}
