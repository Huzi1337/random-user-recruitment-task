import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import {
  AsyncPipe,
  NgClass,
  NgIf,
  NgOptimizedImage,
  isPlatformBrowser,
  isPlatformServer,
} from '@angular/common';
import { TimerService } from '../timer.service';
import { FetchRandomUserService } from '../fetch-random-user.service';
import { BehaviorSubject, Subscription, map, tap } from 'rxjs';

import { LoadingHandlerService } from '../loading-handler.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ErrorComponent } from '../error/error.component';

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
  imports: [
    AsyncPipe,
    NgIf,
    NgOptimizedImage,
    SpinnerComponent,
    NgClass,
    ErrorComponent,
  ],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
})
export class PeopleComponent implements OnInit, OnDestroy {
  cacheBuster = 0;
  userName: string | undefined;
  nextUserName: string | undefined;
  userPicture: string | undefined;
  isError = false;

  isMouseOver$ = new BehaviorSubject(false);

  timerSubscription!: Subscription;
  isMouseOverSubscription!: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public timer: TimerService,
    public randomUserFetcher: FetchRandomUserService,
    public loader: LoadingHandlerService
  ) {}

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) this.serverSideInit();
    else this.clientSideInit();
  }
  serverSideInit() {
    this.loader.start();
    this.fetchNewUser();
  }
  clientSideInit() {
    this.loader.finish();
    if (!this.userName || !this.userPicture) this.fetchNewUser();
    this.cacheBuster++;
    this.timerSubscription = this.timer.isComplete$.subscribe(() => {
      this.timer.pause();
      this.fetchNewUser();
    });

    this.isMouseOverSubscription = this.isMouseOver$.subscribe(
      (isMouseOver) =>
        !this.loader.isLoading &&
        (isMouseOver ? this.timer.pause() : this.timer.start())
    );
  }

  fetchNewUser() {
    this.loader.start();
    this.randomUserFetcher
      .fetchRandomUserData<ApiResponse>({
        inc: 'name,picture',
        noinfo: true,
        cacheBuster: this.cacheBuster++,
      })
      .pipe(map(({ results }) => results[0]))
      .subscribe(
        ({
          name: { first: firstName, last: lastName },
          picture: { large: userPicture },
        }) => {
          const fullName = `${firstName} ${lastName}`;
          isPlatformServer(this.platformId)
            ? this.serverSideUserDataHandler(fullName, userPicture)
            : this.clientSideUserDataHandler(fullName, userPicture);
        },
        () => (this.isError = true)
      );
  }

  serverSideUserDataHandler(name: string, picture: string) {
    this.userName = name;
    this.userPicture = picture;
  }
  clientSideUserDataHandler(name: string, picture: string) {
    const nextImage = new Image();
    nextImage.src = picture;

    this.nextUserName = name;
    this.userPicture = picture;
  }

  onImageLoad() {
    this.loader.finish();
    this.userName = this.nextUserName;
    if (isPlatformBrowser(this.platformId)) {
      this.timer.reset();
      if (!this.isMouseOver$.getValue()) this.timer.start();
    }
  }

  onMouseOver() {
    this.isMouseOver$.next(true);
  }

  onMouseLeave() {
    this.isMouseOver$.next(false);
  }

  onClick() {
    if (!this.loader.isLoading) this.fetchNewUser();
  }

  ngOnDestroy(): void {
    this.timer.stop();
    this.timerSubscription?.unsubscribe();
    this.isMouseOverSubscription?.unsubscribe();
  }
}
