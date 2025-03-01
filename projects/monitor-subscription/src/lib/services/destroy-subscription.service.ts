import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestroySubscriptionService {
  private readonly destroyMap = new Map<string, Subject<void>>();
  private readonly destroyMap$ = new Subject<Map<string, Subject<void>>>();  

  getDestroy$(id: string): Observable<void> {
    if (!this.destroyMap.has(id)) {
      console.log(`Subscribing ID: ${id}`);
      this.destroyMap.set(id, new Subject<void>());
    }
    this.destroyMap$.next(this.destroyMap);
    return this.destroyMap.get(id)!.asObservable();
  }

  getAllDestroy$(): Observable<Map<string, Subject<void>>> {
    return this.destroyMap$.asObservable();
  }

  unsubscribe(id: string) {
    if (this.destroyMap.has(id)) {
      console.log(`Unsubscribing ID: ${id}`);
      this.destroyMap.get(id)!.next();
      this.destroyMap.get(id)!.complete();
      this.destroyMap.delete(id);
    } else {
      console.warn(`ID: ${id} not found in destroyMap`);
    }
  }

  unsubscribeAll() {
    console.log('Global unsubscribe triggered!');
    this.destroyMap.forEach((destroy$, id) => {
      console.log(`Unsubscribing ID: ${id}`);
      destroy$.next();
      destroy$.complete();
    });
    this.destroyMap.clear();
  }
}
