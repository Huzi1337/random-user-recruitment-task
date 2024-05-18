import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { TimerService } from './timer.service';
import { FetchRandomUserService } from './fetch-random-user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, NgIf, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'DataedoRecruitmentTask';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public timer: TimerService,
    public fetchRandomUser: FetchRandomUserService
  ) {}
}
