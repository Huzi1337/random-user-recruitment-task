import { Directive, HostListener, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimerService } from '../services/timer.service';

@Directive({
  selector: '[appMouseOver]',
  standalone: true,
})
export class MouseOverDirective {
  @Input({ required: true }) isMouseOver$!: BehaviorSubject<boolean>;

  constructor(private timer: TimerService) {}

  @HostListener('mouseover') onMouseEnter() {
    this.isMouseOver$.next(true);
    this.timer.pause();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isMouseOver$.next(false);
    this.timer.start();
  }
}
