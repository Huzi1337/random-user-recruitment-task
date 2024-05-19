import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { LoadingHandlerService } from './loading-handler.service';

@Injectable({
  providedIn: 'root',
})
export class FetchRandomUserService {
  API_URL = 'https://randomuser.me/api/1.4/';

  constructor(
    private http: HttpClient,
    private loadingHandler: LoadingHandlerService
  ) {}

  fetchRandomUserData<T>(params: {
    [param: string]: string | boolean | number;
  }) {
    return this.http.get<T>(this.API_URL, { params }).pipe(
      catchError(this.handleError),
      tap(() => {
        console.log('Loading finished');
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An application error has occurred:', error.error);
    } else {
      console.error(`The API returned code ${error.status}`);
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
