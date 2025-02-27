import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  data = new BehaviorSubject('test');
  // todo:
  // think how we can get subscription value form the instance component without declare services logger on that component
  // the purpose is to emit or listen from subscription

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

  getStore(): Observable<any> {
    return this.data.asObservable();
  }
}
