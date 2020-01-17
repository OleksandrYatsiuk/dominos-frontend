import { Pipe, PipeTransform } from '@angular/core';
import { Root } from './root.service';



@Pipe({
    name: "pizzaFilter"
})
export class PizzaFilterPipe implements PipeTransform {
    transform(root: Root[], search = ""): Root[] {
        if (!search.trim()) {
            return root;
        }
        return root.filter(pizza => {
            return pizza.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        })
    }
} 