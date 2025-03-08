import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private readonly data = new Subject<any>();
  private logList: any[] = [];

  integrated(): void {
    console.log('Successfully Integrated Monitor Subscription...')
  }

  log(message: string): void {
    console.log(`LoggerService: ${message}`);
  }

  warn(message: string): void {
    console.warn(`LoggerService Warning: ${message}`);
  }

  error(message: string): void {
    console.error(`LoggerService Error: ${message}`);
  }

  store(value: any): void {
    this.data.next(value);
  }

  resetStore(): void {
    this.logList = [];
  }

  getStore(): Observable<any[]> {
    this.logList = [];
    return this.data.asObservable().pipe(
      map(values => {
        this.logList.push(values)
        return this.logList;
      })
    );
  }
}
