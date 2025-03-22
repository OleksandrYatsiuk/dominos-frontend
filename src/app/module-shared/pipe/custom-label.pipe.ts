import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customLabel',
    standalone: false
})
export class CustomLabelPipe implements PipeTransform {

  transform(value: any): any {
    return (value.charAt(0).toUpperCase() + value.slice(1)).replace(/([a-z])([A-Z])/g, '$1 $2');
  }
}
