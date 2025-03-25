import {
  AfterViewInit, OnDestroy, ChangeDetectionStrategy, Component, ElementRef, viewChild, input, output,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SearchComponent implements AfterViewInit, OnDestroy {
  searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  debounceTime = input<number>(500);

  placeholder = input<string>();

  inputId = input<string>(`search-${Date.now()}`);

  onChange = output<string>();

  ngAfterViewInit(): void {
    const inputElement = this.searchInput()?.nativeElement;
    fromEvent(inputElement, 'input')
      .pipe(
        map((event: Event) => (event.target as HTMLInputElement).value),
        debounceTime(this.debounceTime()),
        distinctUntilChanged(),
      )
      .subscribe((searchQuery) => {
        this.onChange.emit(searchQuery);
      });
  }

  ngOnDestroy(): void {
    this.searchInput().nativeElement.value = '';
  }
}
