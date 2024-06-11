import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Subject, Subscription, interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private subscription!: Subscription;
  public isComplete$ = new Subject<boolean>();
  private timeElapsed = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject('timedInterval') private timedInterval: number
  ) {}

  public reset(): void {
    this.timeElapsed = 0;
  }

  public start(): void {
    if (
      isPlatformBrowser(this.platformId) &&
      (!this.subscription || this.subscription?.closed)
    ) {
      this.subscription = interval(1000).subscribe(() => this.countUp());
    }
  }
  private countUp(): void {
    this.timeElapsed++;
    this.checkCompletion();
  }
  private checkCompletion(): void {
    if (this.timeElapsed >= this.timedInterval) {
      this.isComplete$.next(true);
      this.timeElapsed = 0;
    }
  }

  public pause(): void {
    this.subscription?.unsubscribe();
  }
  public stop(): void {
    this.pause();
    this.reset();
  }
}
