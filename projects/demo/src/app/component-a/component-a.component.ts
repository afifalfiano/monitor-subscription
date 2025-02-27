import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { activeSubs, LoggerService } from 'monitor-subscription';
import { interval, map, of, Subject } from 'rxjs';

// @LogObservables()
@Component({
  selector: 'app-component-a',
  standalone: true,
  imports: [],
  templateUrl: './component-a.component.html',
  styleUrl: './component-a.component.scss'
})
export class ComponentAComponent implements OnInit, OnDestroy {

  data1$ = new Subject();
  public staticValue = 'Hello'; // Not an Observable
  public number$ = of(123); // Observable that completes immediately
  public timer$ = interval(1000); // Infinite Observable
  public manual$ = new Subject<string>(); // Manually controlled Observable

  ngOnInit(): void {
    interval(1000).pipe(
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
      activeSubs(this)
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
