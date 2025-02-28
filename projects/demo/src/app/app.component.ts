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

  onSubscribeWorstCase(): void {
    const ids = [
      '_worstcasecomponent_get_users',
      '_worstcasecomponent_get_photos',
      '_worstcasecomponent_get_albums',
      '_worstcasecomponent_get_comments',
      '_worstcasecomponent_get_posts',
      '_worstcasecomponent_get_todos'
    ];

    for (const id of ids) {
      this.destroyService.unsubscribe(id);      
    }
  }

  onSubscribeAll(): void {
    this.destroyService.unsubscribeAll();
  }

}
