import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Subject, Subscription, interval, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private subscription!: Subscription;
  isComplete$ = new Subject<boolean>();
  timeElapsed = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject('timedInterval') private timedInterval: number
  ) {
    this.isComplete$.subscribe(() => console.log('The user should reload!'));
  }

  reset() {
    this.timeElapsed = 0;
  }

  start() {
    if (
      isPlatformBrowser(this.platformId) &&
      (!this.subscription || this.subscription?.closed)
    ) {
      this.subscription = interval(1000).subscribe(() => this.countUp());
      console.log('timer started', this.subscription.closed);
    }
  }
  countUp() {
    this.timeElapsed++;
    this.checkCompletion();
  }
  checkCompletion() {
    if (this.timeElapsed >= this.timedInterval) {
      this.isComplete$.next(true);
      this.timeElapsed = 0;
    }
  }

  pause() {
    this.subscription?.unsubscribe();
    console.log('timer stopped', this.subscription?.closed);
  }
  stop() {
    this.pause();
    this.reset();
  }
}
