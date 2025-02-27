import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { activeSubs, DestroySubscriptionService, LoggerService } from 'monitor-subscription';
import { interval, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-component-c',
  standalone: true,
  imports: [],
  templateUrl: './component-c.component.html',
  styleUrl: './component-c.component.scss'
})
export class ComponentCComponent implements OnInit, OnDestroy {
$data1 = new Subject();
loggerService = inject(LoggerService);
destroyService = inject(DestroySubscriptionService);
  ngOnInit(): void {
    const name = this.constructor.name;
    interval(1000).pipe(
      map(item => {
        return {
          username: 'paijo',
          email: 'paijo@yopmail.com'
        }
      }),
      takeUntil(this.destroyService.getDestroy$(name)),
      activeSubs(this.constructor.name, this.loggerService),
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
