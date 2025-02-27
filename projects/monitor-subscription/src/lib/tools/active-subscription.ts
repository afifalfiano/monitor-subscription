import { Observable } from "rxjs";
import { LoggerService } from "../services/logger.service";
import { Injector } from "@angular/core";

// const injector = Injector.create({ providers: [LoggerService] });

export function activeSubs<T>(componentName: string, loggerService: LoggerService) {
  // const componentName = context.constructor.name;
  // let loggerService = injector.get(LoggerService)
  // if (context.hasOwnProperty('loggerService')) {
  //   loggerService = context?.loggerService;
  // }
  return (source: Observable<T>): Observable<T> => {
    let count = 0;
    return new Observable<T>((subscriber) => {
      source.subscribe({
        next: (value) => {
          const monitor = {
            component: componentName,
            info: {
              info: 'Observable next.',
              value: value,
              count: count++
            }
          };
          subscriber.next(value);
          loggerService.store(monitor)
        },
        error: (err) => {
          const monitor = {
            component: componentName,
            value: {
              info: 'Observable error.',
              value: err,
              count: count++
            }
          };
          loggerService.store(monitor)
          subscriber.error(err);
        },
        complete: () => {
          const monitor = {
            component: componentName,
            info: {
              info: 'Observable completed.',
              value: null,
              count: count++
            }
          };
          loggerService.store(monitor)
          subscriber.complete();
        }
      });
    });
  };
}