import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  streams: any[] = [];
  colorMap = new Map<string, string>();

  constructor(
    private readonly logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.logger.integrated();
    this.getStreams();
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
}
