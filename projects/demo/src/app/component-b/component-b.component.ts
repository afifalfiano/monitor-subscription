import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { activeSubs, DestroySubscriptionService, LoggerService } from 'monitor-subscription';
import { interval, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-component-b',
  standalone: true,
  imports: [],
  templateUrl: './component-b.component.html',
  styleUrl: './component-b.component.scss'
})
export class ComponentBComponent implements OnInit, OnDestroy {
destroyService = inject(DestroySubscriptionService);
loggerService = inject(LoggerService);
  ngOnInit(): void {
    const name = this.constructor.name;
    interval(1000).pipe(
      map(item => {
        return {
          order: 'wasser',
          price: `$${12 + item}`
        }
      }),
      takeUntil(this.destroyService.getDestroy$(name)),
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
