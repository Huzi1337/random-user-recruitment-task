import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorStateService } from '../../../core/error-state.service';

interface UserData {
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

interface ApiResponse {
  results: UserData[];
}

@Injectable({
  providedIn: 'root',
})
export class FetchRandomUserService {
  private API_URL = 'https://randomuser.me/api/1.4/';
  private PARAMS = {
    inc: 'name,picture',
    noinfo: true,
    cacheBuster: 0,
  };

  constructor(private http: HttpClient, public errorState: ErrorStateService) {}

  public fetchRandomUserData() {
    this.PARAMS.cacheBuster++;
    return this.http
      .get<ApiResponse>(this.API_URL, { params: this.PARAMS })
      .pipe(
        map(({ results }) => results[0]),
        map(({ name: { first, last }, picture: { large } }) => ({
          name: `${first} ${last}`,
          picture: large,
        })),

        catchError(this.handleError.bind(this))
      );
  }

  private handleError() {
    this.errorState.enableError();
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
