import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Subject, Subscription, interval } from 'rxjs';

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
    this.timeElapsed = this.timedInterval;
  }

  start() {
    if (isPlatformBrowser(this.platformId)) {
      this.subscription = interval(1000).subscribe(() => this.countUp());
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
    this.subscription.unsubscribe();
  }
}
