import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api';

@Pipe({
    name: 'translateOptions'
})
export class TranslateOptionsPipe implements PipeTransform {
    constructor(private _ts: TranslateService) {

    }
    transform(value: SelectItem[] | any[], key = 'label'): any[] {

        if (Array.isArray(value)) {
            return value.map(el => ({ ...el, [`${key}`]: this._ts.instant(el[`${key}`]) }));
        }
        return value;
    }

}
