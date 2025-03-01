import { CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
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
  subsList: string[] = [];

  constructor(
    private readonly logger: LoggerService,
    private readonly destroyService: DestroySubscriptionService,
    private readonly cdr: ChangeDetectorRef
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
          this.streams.push(data);
        }
      }
    })
  }

  doResetLog(): void {
    this.streams = [];
  }

  getColorComopnent(item: any): string {
    if (!item?.component) return '#000000';
    if (this.colorMap.has(item.component)) {
      return this.colorMap.get(item.component)!;
    }
    const newColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    this.colorMap.set(item.component, newColor);  
    return newColor;
  }

  getDestroyList(): void {
    this.destroyService.getAllDestroy$().subscribe({
      next: data => {
        if (data) {
          this.subsList = Array.from(data.keys());
          this.cdr.detectChanges();
        }
      }
    })
  }

  onSubscribe(id: string): void {
    this.destroyService.unsubscribe(id);
  }

  onSubscribeAll(): void {
    this.destroyService.unsubscribeAll();
  }
}
