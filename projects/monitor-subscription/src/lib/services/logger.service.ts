import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private readonly data = new BehaviorSubject(null);

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

  getStore(): Observable<any> {
    return this.data.asObservable();
  }
}
