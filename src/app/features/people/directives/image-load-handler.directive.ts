import {
  Directive,
  HostListener,
  Inject,
  Input,
  PLATFORM_ID,
} from '@angular/core';
import { LoadingHandlerService } from '../../../core/loading-handler.service';
import { isPlatformBrowser } from '@angular/common';
import { TimerService } from '../services/timer.service';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[appImageLoadHandler]',
  standalone: true,
})
export class ImageLoadHandlerDirective {
  @Input({ required: true }) isMouseOver$!: BehaviorSubject<boolean>;

  constructor(
    private loader: LoadingHandlerService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private timer: TimerService
  ) {}

  @HostListener('load') onImageLoad() {
    this.loader.finish();
    if (isPlatformBrowser(this.platformId)) {
      this.timer.reset();
      if (!this.isMouseOver$.getValue()) this.timer.start();
    }
  }
}
