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
import { Subscription, map, tap } from 'rxjs';

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
  isLoading = false;
  isMouseOver = false;

  timerSubscription!: Subscription;
  isLoadingSubscription!: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public timer: TimerService,
    public randomUserFetcher: FetchRandomUserService
  ) {}

  ngOnInit(): void {
    this.fetchNewUser();
    this.timerSubscription = this.timer.isComplete$.subscribe(() =>
      this.fetchNewUser()
    );
    this.isLoadingSubscription =
      this.randomUserFetcher.loadingHandler.isLoading$.subscribe(
        (isLoading) => (this.isLoading = isLoading)
      );
  }

  onMouseOver() {
    if (!this.isLoading) this.timer.pause();
    this.isMouseOver = true;
    console.log('mouseover');
  }

  onMouseLeave() {
    if (!this.isLoading) this.timer.start();
    this.isMouseOver = false;
  }

  onClick() {
    if (!this.isLoading) this.fetchNewUser();
  }

  fetchNewUser() {
    this.timer.pause();
    this.randomUserFetcher
      .fetchRandomUserData<ApiResponse>({
        inc: 'name,picture',
        noinfo: true,
        cacheBuster: this.cacheBuster++,
      })
      .pipe(map(({ results }) => results[0]))
      .subscribe(({ name: { first: firstName, last: lastName }, picture }) => {
        this.userName = `${firstName} ${lastName}`;
        this.userPicture = picture.large;
        this.timer.reset();
        if (!this.isMouseOver) this.timer.start();
      });
  }
  ngOnDestroy(): void {
    this.timer.stop();
    this.timerSubscription?.unsubscribe();
    this.isLoadingSubscription?.unsubscribe();
  }
}
