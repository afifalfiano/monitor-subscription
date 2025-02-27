import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  logger = inject(LoggerService);
  streams: any[] = [];

  ngOnInit(): void {
    this.logger.integrated();
    this.getStreams();
  }

  getStreams(): void {
    this.logger.getStore().subscribe({
      next: (data: any) => {
        if (data) {
          this.streams.push(data);
          // console.log(this.streams);
          
        }
      }
    })
  }
}
