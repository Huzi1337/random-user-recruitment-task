import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorStateService {
  public isError$ = new BehaviorSubject(false);

  enableError() {
    this.isError$.next(true);
  }

  disableError() {
    this.isError$.next(false);
  }

  get isError() {
    return this.isError$.getValue();
  }
}
