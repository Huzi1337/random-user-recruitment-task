import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  AsyncPipe,
  NgIf,
  NgOptimizedImage,
  isPlatformServer,
} from '@angular/common';
import { TimerService } from './timer.service';
import { FetchRandomUserService } from './fetch-random-user.service';
import { map } from 'rxjs';

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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, NgIf, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'DataedoRecruitmentTask';

  fetchedImages = 0;
  userName: string | undefined;
  userPicture: string | undefined;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public timer: TimerService,
    public fetchRandomUser: FetchRandomUserService
  ) {}
  ngOnInit(): void {
    this.timer.start();
    this.fetchNewUser();
  }

  fetchNewUser() {
    console.log('fetching');
    this.fetchRandomUser
      .fetchRandomUserData<ApiResponse>({
        inc: 'name,picture',
        noinfo: true,
        random: this.fetchedImages++,
      })
      .pipe(map(({ results }) => results[0]))
      .subscribe(({ name: { first: firstName, last: lastName }, picture }) => {
        this.userName = `${firstName} ${lastName}`;
        this.userPicture = picture.large;
      });
  }
}
