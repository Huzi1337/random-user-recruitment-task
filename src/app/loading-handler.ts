import { BehaviorSubject, Observable, delay, of, switchMap } from 'rxjs';

export class LoadingHandler {
  private _isLoading$ = new BehaviorSubject(false);
  constructor() {
    console.log(this);
  }

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
