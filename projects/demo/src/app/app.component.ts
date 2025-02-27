import { JsonPipe } from '@angular/common';
import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoggerService } from 'monitor-subscription';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, JsonPipe],
  providers: [LoggerService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  title = 'demo';
  logger = inject(LoggerService);

  streams: any[] = [];

  ngOnInit(): void {
    this.logger.log('use library');
    // get this issue in here, can't auto subscribe
    this.logger.getStore().subscribe({
      next: (data: any) => {
        if (data) {
          this.streams.push(data);
          console.log(this.streams, 'streams')
        }
      }
    })
  }
}
