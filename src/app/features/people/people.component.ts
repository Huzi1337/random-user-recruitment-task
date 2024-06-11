import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import {
  AsyncPipe,
  JsonPipe,
  NgClass,
  NgIf,
  NgOptimizedImage,
  isPlatformBrowser,
  isPlatformServer,
} from '@angular/common';
import { TimerService } from './services/timer.service';
import { FetchRandomUserService } from './services/fetch-random-user.service';
import { BehaviorSubject, Subscription } from 'rxjs';

import { LoadingHandlerService } from '../../core/loading-handler.service';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { ErrorComponent } from '../../shared/components/error/error.component';
import { ErrorStateService } from '../../core/error-state.service';
import { MouseOverDirective } from './directives/mouse-over.directive';
import { ImageLoadHandlerDirective } from './directives/image-load-handler.directive';

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
    JsonPipe,
    MouseOverDirective,
    ImageLoadHandlerDirective,
  ],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
})
export class PeopleComponent implements OnInit, OnDestroy {
  name!: string;
  picture!: string;

  public isMouseOver$ = new BehaviorSubject(false);

  fetchSubscription!: Subscription;
  timerSubscription!: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public timer: TimerService,
    public randomUserFetcher: FetchRandomUserService,
    public loader: LoadingHandlerService,
    public errorState: ErrorStateService
  ) {}

  ngOnInit(): void {
    this.fetchNewUser();
    if (isPlatformServer(this.platformId)) this.serverSideInit();
    if (isPlatformBrowser(this.platformId)) this.clientSideInit();
  }
  serverSideInit() {
    this.loader.start();
  }
  clientSideInit() {
    this.loader.finish();
    this.timerSubscription = this.timer.isComplete$.subscribe(() => {
      this.timer.pause();
      this.fetchNewUser();
    });
  }

  fetchNewUser() {
    this.loader.start();
    this.fetchSubscription = this.randomUserFetcher
      .fetchRandomUserData()
      .subscribe(({ name, picture }) => {
        this.name = name;
        this.picture = picture;
        this.fetchSubscription?.unsubscribe();
      });
  }

  onClick() {
    if (!this.loader.isLoading) this.fetchNewUser();
  }

  ngOnDestroy(): void {
    this.timer.stop();
    this.timerSubscription?.unsubscribe();
    this.fetchSubscription?.unsubscribe();
  }
}
