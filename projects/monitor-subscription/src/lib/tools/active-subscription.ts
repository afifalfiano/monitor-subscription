import { Observable } from "rxjs";
import { LoggerService } from "../services/logger.service";

export function activeSubs<T>(context: any) {
  const loggerService = new LoggerService();
  console.log(loggerService)
  const componentName = context.constructor.name;
  return (source: Observable<T>): Observable<T> => {
    return new Observable<T>((subscriber) => {
      source.subscribe({
        next: (value) => {
          const monitor = {
            component: componentName,
            info: {
              info: 'Observable next.',
              value: value
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
              value: err
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
              value: null
            }
          };
          loggerService.store(monitor)
          subscriber.complete();
        }
      });
    });
  };
}