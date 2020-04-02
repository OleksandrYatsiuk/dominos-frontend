import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHeadlerService {
  private msg = new BehaviorSubject<any>(null);
  errorMessage = this.msg.asObservable();
  constructor() { }

  public hasError(error: object) {
    this.msg.next(error)
  }
}
