import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { LoggerService, DestroySubscriptionService, activeSubs } from 'monitor-subscription';
import { interval, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-worst-case',
  standalone: true,
  imports: [],
  templateUrl: './worst-case.component.html',
  styleUrl: './worst-case.component.scss'
})
export class WorstCaseComponent {
  httpClient = inject(HttpClient);
  loggerService = inject(LoggerService);
  destroyService = inject(DestroySubscriptionService);
  ngOnInit(): void {
    this.getData('users');
    this.getData('photos');
    this.getData('albums');
    this.getData('comments');
    this.getData('posts');
    this.getData('todos');
  }


  getData(title: string): void {
    const id = `${this.constructor.name.toLowerCase()}_get_${title}`
    const url = 'https://jsonplaceholder.typicode.com/' + title;
    interval(2000).pipe(
      switchMap(() => this.httpClient.get(url)),
    ).pipe(
      takeUntil(this.destroyService.getDestroy$(id)),
      activeSubs(id, this.loggerService),
    ).subscribe({
      next: data => {
        // console.log(data)
      }
    });
  }

}
