# Monitor Subscription for Angular

## 📌 Overview

This Angular tool provides functionality to retrieve, monitor, and subscribe to observables within an application. It helps developers track the state of observables and their emitted values in real-time.

## 🚀 Features

* Retrieve the current state of an observable.
* Monitor emitted values over time.
* Subscribe to observables and handle real-time data.
* Improve debugging and tracking of reactive streams.
* Unsubscribe current observable based on the services.

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
import { Component, OnInit } from '@angular/core';
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
     activeSubs(name, this.loggerService))
     takeUntil(this.destroyService.getDestroy$(name))
     ).subscribe(value => console.log('value:', value));
  }
}
```

### 3️⃣Monitoring Logs Observable

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
      this.logs.push(data);
      conosle.log(logs, 'logs');
    }
   })
  }
  
}
```


## 📜 API 

### `activeSubs(name: string, loggerService: LoggerService): Observable<T>`

* Starts monitoring the given observable and assigns it a reference name.

### `DestroySubscriptionService `

Class services that used to unsubscribe the observables

#### `<span>monitor(observable: Observable<T>, name: string): void</span>`

* Registers an observable to be monitored, associating it with a unique reference name.
* Helps in tracking the data flow and debugging reactive streams efficiently.

#### `<span>getCurrentValue(name: string): Observable<T></span>`

* Retrieves the latest value emitted by a monitored observable.
* Useful for fetching real-time updates on demand.

#### `<span>subscribeTo(name: string, callback: (value: T) => void): Subscription</span>`

* Subscribes to a monitored observable and executes a callback function whenever new data is emitted.
* Ensures the latest values are processed automatically.

#### `<span>getDestroy$(id: string): Observable<void></span>`

* Provides a destroy signal observable for a specific ID.
* If the ID does not exist, it creates a new subject.
* Emits a completion signal when the observable needs to be unsubscribed.
* Useful for managing component lifecycles and preventing memory leaks.

#### `<span>getAllDestroy$(): Observable<Map<string, Subject<void>>></span>`

* Returns an observable containing a map of all active destroy subjects.
* Allows tracking and handling of multiple observable lifecycles efficiently.

#### `<span>unsubscribe(id: string): void</span>`

* Unsubscribes from the observable associated with the provided ID.
* Completes the subject and removes it from the `<span>destroyMap</span>`.
* Logs an error message if the ID does not exist in the map.
* Helps manage individual observable cleanup effectively.

#### `<span>unsubscribeAll(): void</span>`

* Unsubscribes all observables currently stored in `<span>destroyMap</span>`.
* Completes all subjects and clears the map to free up resources.
* Logs each ID being unsubscribed for better debugging and tracking.
* Prevents potential memory leaks by ensuring no stale subscriptions remain.

### `LoggerService`

Provide the function to store the current value in observables state.

#### `integrated(): void`

* Logs a confirmation message indicating successful integration of the monitoring system.
* Useful for debugging and ensuring the monitoring tool is initialized correctly.

#### `log(message: string): void`

* Logs a general message to the console prefixed with `<span>LoggerService:</span>`.
* Helps in tracking events and debugging application state changes.

#### `warn(message: string): void`

* Logs a warning message to the console prefixed with `<span>LoggerService Warning:</span>`.
* Useful for highlighting potential issues without stopping execution.

#### `error(message: string): void`

* Logs an error message to the console prefixed with `<span>LoggerService Error:</span>`.
* Helps track critical failures and debugging severe issues.

#### `store(value: any): void`

* Stores a value in a `<span>BehaviorSubject</span>`, making it available for future retrieval.
* Useful for persisting state changes within the application.

#### `getStore(): Observable<any>`

* Returns an observable of the stored value.
* Allows components and services to react to stored data changes dynamically.

## 📝 Showcase



## 📝 License

MIT License

## 🤝 Contribution

Feel free to submit issues or create pull requests to improve this tool!
