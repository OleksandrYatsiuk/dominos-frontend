import { Pipe, PipeTransform } from '@angular/core';
import { ILanguage } from '@core/models/language';
import { LangService } from '@core/services/lang.service';

@Pipe({
  name: 'lang',
  standalone: true
})
export class LangPipe implements PipeTransform {
  constructor(private _ls: LangService) { }
  transform(value: ILanguage, ...args: unknown[]): string {
    return value ? value[this._ls.getLang()] : '';
  }

}
