import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { ErrorStateService } from '../../../core/error-state.service';

@Injectable({
  providedIn: 'root',
})
export class FetchRandomUserService {
  API_URL = 'https://randomuser.me/api/1.4/';

  constructor(private http: HttpClient, public errorState: ErrorStateService) {}

  fetchRandomUserData<T>(params: {
    [param: string]: string | boolean | number;
  }) {
    return this.http
      .get<T>(this.API_URL, { params })
      .pipe(catchError(this.handleError.bind(this)));
  }

  private handleError() {
    this.errorState.enableError();
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
