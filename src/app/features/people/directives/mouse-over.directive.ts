import { Directive, HostListener, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimerService } from '../services/timer.service';

@Directive({
  selector: '[appMouseOver]',
  standalone: true,
})
export class MouseOverDirective {
  @Input({ required: true }) public isMouseOver$!: BehaviorSubject<boolean>;

  constructor(private timer: TimerService) {}

  @HostListener('mouseover') public onMouseEnter(): void {
    this.isMouseOver$.next(true);
    this.timer.pause();
  }

  @HostListener('mouseleave') public onMouseLeave(): void {
    this.isMouseOver$.next(false);
    this.timer.start();
  }
}
