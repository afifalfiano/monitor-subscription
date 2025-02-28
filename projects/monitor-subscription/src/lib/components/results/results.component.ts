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
  colorMap = new Map<string, string>(); // Store colors for each component

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
          console.log(this.streams);
          
        }
      }
    })
  }

  doResetLog(): void {
    this.streams = [];
  }


  getColorComopnent(item: any): string {
    if (!item?.component) return '#000000'; // Default color if no component

    // If the component already has a color assigned, return it
    if (this.colorMap.has(item.component)) {
      return this.colorMap.get(item.component)!;
    }
  
    // Generate a new random HEX color
    const newColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  
    // Store the color for this component
    this.colorMap.set(item.component, newColor);
  
    return newColor;
  }
}
