import {
  AsyncPipe,
  NgClass,
  NgOptimizedImage,
  isPlatformBrowser,
} from '@angular/common';
import {
  Component,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';
import { LoadingHandler } from '../loading-handler';
import { interval } from 'rxjs';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [NgOptimizedImage, AsyncPipe, NgClass],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent implements OnInit, OnChanges {
  @Input({ required: true }) imageURL!: string;
  @HostBinding('class') hostClass!: string;
  public loader = new LoadingHandler();

  constructor(@Inject(PLATFORM_ID) public platformId: object) {}
  ngOnInit(): void {
    this.loader.isLoading$.subscribe((val) =>
      console.log('image loading status: ', val)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loader.start();
  }

  onLoad() {
    this.loader.finish();
  }
}
