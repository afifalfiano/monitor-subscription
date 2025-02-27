import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface UnsubscribeEntry {
  id: string;
  destroy$: Subject<void>;
}

@Injectable({
  providedIn: 'root'
})
export class DestroySubscriptionService {
  private destroyMap = new Map<string, Subject<void>>(); // Store subjects by ID

  // Get or create a destroy$ for a specific ID
  getDestroy$(id: string): Observable<void> {
    if (!this.destroyMap.has(id)) {
      this.destroyMap.set(id, new Subject<void>());
    }
    return this.destroyMap.get(id)!.asObservable();
  }

  // ✅ Stops and removes a specific observable by ID
  unsubscribe(id: string) {
    if (this.destroyMap.has(id)) {
      console.log(`Unsubscribing ID: ${id}`);
      this.destroyMap.get(id)!.next(); // Emit complete signal
      this.destroyMap.get(id)!.complete(); // Cleanup
      this.destroyMap.delete(id); // Remove from map
    } else {
      console.warn(`ID: ${id} not found in destroyMap`);
    }
  }

  // ✅ Stops and removes all observables globally
  unsubscribeAll() {
    console.log('Global unsubscribe triggered!');
    this.destroyMap.forEach((destroy$, id) => {
      console.log(`Unsubscribing ID: ${id}`);
      destroy$.next();
      destroy$.complete();
    });
    this.destroyMap.clear(); // Clear all entries
  }
}
