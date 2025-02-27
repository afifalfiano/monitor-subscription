import { Component, inject} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DestroySubscriptionService, ResultsComponent } from 'monitor-subscription';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ResultsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'demo';
  destroyService = inject(DestroySubscriptionService);

  onSubscribeC(): void {
    this.destroyService.unsubscribe("_ComponentCComponent");
  }

  onSubscribeB(): void {
    this.destroyService.unsubscribe("_ComponentBComponent");
  }

  onSubscribeA(): void {
    this.destroyService.unsubscribe('_ComponentAComponent');
  }

}
