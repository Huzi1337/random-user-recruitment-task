import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchRandomUserService {
  API_URL = 'https://randomuser.me/api';

  constructor(private http: HttpClient) {}

  fetchRandomUserData<T>(params: { [param: string]: string }) {
    return this.http
      .get<T>(this.API_URL, { params })
      .pipe(catchError(this.handleError));
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
