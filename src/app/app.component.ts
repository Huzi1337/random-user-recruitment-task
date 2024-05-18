import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TimerService } from './timer.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'DataedoRecruitmentTask';
  count = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public timer: TimerService
  ) {}
  ngOnInit(): void {
    this.timer.start();
  }
}
