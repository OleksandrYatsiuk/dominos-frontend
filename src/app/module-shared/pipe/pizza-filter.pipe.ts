import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pizzaFilter',
    standalone: false
})
export class PizzaFilterPipe implements PipeTransform {
  transform(root: any[], search = ''): any[] {
    if (!search.trim()) {
      return root;
    }
    return root.filter(pizza => {
      return pizza.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }
}
