import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { activeSubs, DestroySubscriptionService, LoggerService } from 'monitor-subscription';
import { interval, map, of, Subject, takeUntil } from 'rxjs';

// @LogObservables()
@Component({
  selector: 'app-component-a',
  standalone: true,
  imports: [],
  templateUrl: './component-a.component.html',
  styleUrl: './component-a.component.scss'
})
export class ComponentAComponent implements OnInit, OnDestroy {
  loggerService = inject(LoggerService);
  destroyService = inject(DestroySubscriptionService);
  ngOnInit(): void {
    const name = this.constructor.name.toLowerCase();
    interval(1000).pipe(
      takeUntil(this.destroyService.getDestroy$(name)),
      map(item => {
        return [
          {
            course: 'Halo',
          },
          {
            course: 'Belajar'
          }
        ]
      }),
      activeSubs(name, this.loggerService)
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
