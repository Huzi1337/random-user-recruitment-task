import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { TimerService } from '../timer.service';
import { FetchRandomUserService } from '../fetch-random-user.service';
import { Subscription, map } from 'rxjs';

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
  selector: 'app-people',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgOptimizedImage],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
})
export class PeopleComponent implements OnInit, OnDestroy {
  cacheBuster = 0;
  userName: string | undefined;
  userPicture: string | undefined;
  timerSubscription!: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public timer: TimerService,
    public fetchRandomUser: FetchRandomUserService
  ) {}

  ngOnInit(): void {
    this.timer.start();
    this.fetchNewUser();
    this.timerSubscription = this.timer.isComplete$.subscribe(() =>
      this.fetchNewUser()
    );
  }

  fetchNewUser() {
    console.log('fetching');
    this.fetchRandomUser
      .fetchRandomUserData<ApiResponse>({
        inc: 'name,picture',
        noinfo: true,
        cacheBuster: this.cacheBuster++,
      })
      .pipe(map(({ results }) => results[0]))
      .subscribe(({ name: { first: firstName, last: lastName }, picture }) => {
        this.userName = `${firstName} ${lastName}`;
        this.userPicture = picture.large;
      });
  }
  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }
}
