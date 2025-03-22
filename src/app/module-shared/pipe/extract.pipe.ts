import { Pipe, PipeTransform } from '@angular/core';
import { Ingredients } from '../../core/models/pizza.interface';

@Pipe({
    name: 'extract',
    standalone: false
})
export class ExtractPipe implements PipeTransform {
	transform(value: string[], arr: Ingredients[]): string {
		if (arr.length > 0) {
			const result = arr.filter((el) => el.id == value[0]);
			return result[0].name;
		}
	}
}
