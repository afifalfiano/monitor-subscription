import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { activeSubs, LoggerService } from 'monitor-subscription';
import { interval, map, Subject } from 'rxjs';

@Component({
  selector: 'app-component-c',
  standalone: true,
  imports: [],
  templateUrl: './component-c.component.html',
  styleUrl: './component-c.component.scss'
})
export class ComponentCComponent implements OnInit, OnDestroy {
$data1 = new Subject();
  ngOnInit(): void {
    interval(1000).pipe(
      map(item => {
        return {
          username: 'paijo',
          email: 'paijo@yopmail.com'
        }
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
