import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pares'
})
export class ParesPipe implements PipeTransform {

  transform( arr: any[] ): any[] {

    const pares = arr.reduce( (result, value, index, array) => { // permite crear arreglo de 2 

      if ( index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []);

    return pares;
 }
}
