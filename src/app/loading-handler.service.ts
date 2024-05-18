import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingHandlerService {
  private _isLoading$ = new BehaviorSubject(false);

  isLoading$: Observable<boolean> = this._isLoading$.pipe(
    switchMap((isLoading) =>
      isLoading ? of(true).pipe(delay(1000)) : of(false)
    )
  );

  start() {
    this._isLoading$.next(true);
  }
  finish() {
    this._isLoading$.next(false);
  }
}
