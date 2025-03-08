# Monitor Subscription for Angular

## 📌 Overview

This Angular tool provides advanced functionality for retrieving, monitoring, and subscribing to observables within an application. It allows developers to track the state of observables in real-time, visualize emitted values, and analyze subscription behavior for better debugging and performance optimization..

## 🚀 Features

* Retrieve the current state of an observable.
* Monitor emitted values over time.
* Subscribe to observables and handle real-time data.
* Improve debugging and tracking of reactive streams.
* Unsubscribe current observable with the services.

## 🔄 Compatibility

This tool is compatible with Angular versions **12 to 18**.

## 📦 Installation

```sh
npm install monitor-subscription
```

## 🔧 Usage

### 1️⃣ Import the Services

In your `app.module.ts` or feature module:

```typescript
import { LoggerServices, DestroySubscriptionServices} from 'monitor-subscription';

@NgModule({
  providers: [LoggerServices, DestroySubscriptionServices],
})
export class AppModule {}
```

### 2️⃣ Inject tools on Subscription

```typescript
,import { Component, OnInit } from '@angular/core';
import { activeSubs, DestroySubscriptionService, LoggerService} from 'monitor-subscription';
import { interval } from 'rxjs';

@Component({
  selector: 'app-example',
  template: '<p>Check the console for observable monitoring.</p>'
})
export class ExampleComponent implements OnInit {
  constructor(
	private loggerService: LoggerService,
	private destroyService: DestroySubscriptionService
) {}

  ngOnInit() {
    const myObservable = interval(1000); // Emits values every second  
    const name = this.construcor.name.toLowerCase();
    myObservable.pipe(
     takeUntil(this.destroyService.getDestroy$(name)), // make sure takeUntil always on the first pipe
     activeSubs(name, this.loggerService))
     ).subscribe(value => console.log('value:', value));
  }
}
```

### 3️⃣ Monitoring Logs Observable

```typescript
import { Component, OnInit } from '@angular/core';
import { activeSubs, DestroySubscriptionService, LoggerService} from 'monitor-subscription';
import { interval } from 'rxjs';

@Component({
  selector: 'app-component',
  template: '<p>app component works!/p>'
})
export class AppComponent implements OnInit {
  logs = [];
  constructor(
	private loggerService: LoggerService,
	private destroyService: DestroySubscriptionService
) {}
   
  ngOnInit() {
    this.doMonitorObservables(); // Please run this logger only on development mode. Don't use it on production!
  }
  
  doMonitorObservables(): void {
   this.loggerService.getStore().subscribe({
    next: data => {
      this.logs = data;
      conosle.log(logs, 'logs');
    }
   })
  }
  
}
```

### 4️⃣ Unsubscribe Through Services

```typescript
import { Component, OnInit } from '@angular/core';
import { activeSubs, DestroySubscriptionService, LoggerService} from 'monitor-subscription';
import { interval } from 'rxjs';

@Component({
  selector: 'test-component',
  template: '<button type="button" (click)="doUnsubscribe()">Unsubscribe</button> <p>test component works!/p>'
})
export class TestComponent implements OnInit {
  constructor(
	private destroyService: DestroySubscriptionService
) {}
   
  ngOnInit() {
  }
  
  doUnsubscribe(): void {
     const id = '_appcomponent';
     this.destroyService.unsubscribe(id);
  }
  
}
```

## 🚀 Demo Implementation

Please take a look on this repository for proper implementation [monitor-subscription/projects/demo at main · afifalfiano/monitor-subscription](https://github.com/afifalfiano/monitor-subscription/tree/main/projects/demo)

## 📜 API

| Method/Class                                                              | Description                                                             |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `activeSubs(name: string, loggerService: LoggerService): Observable<T>` | Starts monitoring the given observable and assigns it a reference name. |

### DestroySubscriptionService

Class services that used to unsubscribe the observables

| Method/Class                                                 | Description                                                                                         |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `getDestroy$(id: string): Observable<void>`                | Provides a destroy signal observable for an ID, emits completion for unsubscription management.     |
| `getAllDestroy$(): Observable<Map<string, Subject<void>>>` | Returns an observable map of all active destroy subjects, managing multiple lifecycles efficiently. |
| `unsubscribe(id: string): void`                            | Unsubscribes from the observable by ID, completes the subject, and removes it from `destroyMap`.  |
| `unsubscribeAll(): void`                                   | Unsubscribes all observables, completes subjects, clears `destroyMap`, and logs each ID.          |

### LoggerService

Provide the function to store the current value in observables state.

| Method/Class                     | Description                                                                                     |
| -------------------------------- | ----------------------------------------------------------------------------------------------- |
| `integrated(): void`           | Logs a confirmation message for successful integration, aiding in debugging.                    |
| `log(message: string): void`   | Logs a general message prefixed with `LoggerService:` for event tracking and debugging.       |
| `warn(message: string): void`  | Logs a warning message prefixed with `LoggerService Warning:`, highlighting potential issues. |
| `error(message: string): void` | Logs an error message prefixed with `LoggerService Error:`, for critical failure tracking.    |
| `store(value: any): void`      | Stores a value in `BehaviorSubject`, useful for persisting state changes within the app.      |
| `getStore(): Observable<any>`  | Returns an observable of the stored value, allowing dynamic reactions to data changes.          |

## 📝 Showcase

[Demo](https://youtu.be/jXKSF0-KF3I?si=JXJn8ZBAiUB4tXR9 "Monitor Subscription")

## 📝 License

MIT License

## 🤝 Contribution

Feel free to submit issues or create pull requests to improve this tool!
