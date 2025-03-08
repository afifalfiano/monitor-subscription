import { CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import { DestroySubscriptionService } from '../../services/destroy-subscription.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [JsonPipe, NgFor, NgIf, CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  streams: any[] = [];
  colorMap = new Map<string, string>();
  destroyList = null;
  subsList: any[] = [];

  constructor(
    private readonly logger: LoggerService,
    private readonly destroyService: DestroySubscriptionService
  ) {}

  ngOnInit(): void {
    this.logger.integrated();
    this.getStreams();
    this.getDestroyList();
  }

  getStreams(): void {
    this.logger.getStore().subscribe({
      next: (data: any) => {
        if (data) {
          this.streams = data;
        }
      }
    })
  }

  doResetLog(): void {
    this.streams = [];
    this.logger.resetStore();
  }

  getColorComopnent(item: any): string {
    if (!item?.component) return '#000000';
    if (this.colorMap.has(item.component)) {
      return this.colorMap.get(item.component)!;
    }
    
    let newColor = '#000000';
    while (true) {
      newColor = `#${Math.floor(Math.random() * 0x888888).toString(16).padStart(6, '0')}`;
      const brightness = parseInt(newColor.substring(1, 3), 16) * 0.299 +
                         parseInt(newColor.substring(3, 5), 16) * 0.587 +
                         parseInt(newColor.substring(5, 7), 16) * 0.114;
      if (brightness < 100) break;
    }
    
    this.colorMap.set(item.component, newColor);
    return newColor;
    
  }

  getDestroyList(): void {
    this.destroyService.getAllDestroy$().subscribe({
      next: data => {
        if (data) {
          this.subsList = data;
        }
      }
    })
  }

  onSubscribe(id: string): void {
    this.subsList = this.subsList.filter(item => item !== id);
    this.destroyService.unsubscribe(id);
  }

  onSubscribeAll(): void {
    this.subsList = [];
    this.destroyService.unsubscribeAll();
  }
}
