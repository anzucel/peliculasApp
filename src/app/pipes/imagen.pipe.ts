import { Pipe, PipeTransform } from '@angular/core';
//import { url } from 'inspector';
import { environment } from '../../environments/environment';


const URL = environment.imgPath;

@Pipe({
  name: 'imagen' // nombre con el que se llama en html
})

export class ImagenPipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): string {

    //permitirá retornar una imagen
    if(!img){
      return './assets/no-image-banner.jpg'; // si no hay imagen no muestra nada
    }
    const imgUrl = `${ URL }/${ size }${ img }`; 

    return imgUrl;
  }

}
