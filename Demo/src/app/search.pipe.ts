import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './models/item';

@Pipe({
  name: 'itemFilter'
})
export class SearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {

      if(!value)return null;
      if(!args)return value;

      args = args.toLowerCase();

      return value.filter(function(item){
          return JSON.stringify(item).toLowerCase().includes(args);
      });
  }
}
