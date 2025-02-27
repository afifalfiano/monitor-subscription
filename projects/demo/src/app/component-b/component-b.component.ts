import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { activeSubs, LoggerService } from 'monitor-subscription';
import { interval, map, Subject } from 'rxjs';

@Component({
  selector: 'app-component-b',
  standalone: true,
  imports: [],
  templateUrl: './component-b.component.html',
  styleUrl: './component-b.component.scss'
})
export class ComponentBComponent implements OnInit, OnDestroy {
$data1 = new Subject();
loggerService = inject(LoggerService);
  ngOnInit(): void {
    interval(1000).pipe(
      map(item => {
        return {
          order: 'wasser',
          price: `$${12 + item}`
        }
      }),
      activeSubs(this.constructor.name, this.loggerService)
    ).subscribe({
      next: (data) => {
        // console.log(data, this.constructor.name);
      }
    });
  }

  ngOnDestroy(): void {
    console.log('destroy');
  }
}
