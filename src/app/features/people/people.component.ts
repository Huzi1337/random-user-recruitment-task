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
    NgIf,
    NgOptimizedImage,
    SpinnerComponent,
    NgClass,
    ErrorComponent,
    MouseOverDirective,
    ImageLoadHandlerDirective,
  ],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
})
export class PeopleComponent implements OnInit, OnDestroy {
  public name!: string;
  public picture!: string;

  public isMouseOver$ = new BehaviorSubject(false);

  private fetchSubscription!: Subscription;
  private timerSubscription!: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public timer: TimerService,
    public randomUserFetcher: FetchRandomUserService,
    public loader: LoadingHandlerService,
    public errorState: ErrorStateService
  ) {}

  public ngOnInit(): void {
    this.fetchNewUser();
    if (isPlatformServer(this.platformId)) this.serverSideInit();
    if (isPlatformBrowser(this.platformId)) this.clientSideInit();
  }

  private serverSideInit(): void {
    this.loader.start();
  }

  private clientSideInit(): void {
    this.loader.finish();
    this.timerSubscription = this.timer.isComplete$.subscribe(() => {
      this.timer.pause();
      this.fetchNewUser();
    });
  }

  private fetchNewUser(): void {
    this.fetchSubscription = this.randomUserFetcher
      .fetchRandomUserData()
      .subscribe(({ name, picture }) => {
        this.name = name;
        this.picture = picture;
        this.fetchSubscription?.unsubscribe();
      });
  }

  public onClick(): void {
    if (!this.loader.isLoading) this.fetchNewUser();
  }

  public ngOnDestroy(): void {
    this.timer.stop();
    this.timerSubscription?.unsubscribe();
    this.fetchSubscription?.unsubscribe();
  }
}
