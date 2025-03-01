import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DestroySubscriptionService, ResultsComponent } from 'monitor-subscription';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ResultsComponent, NgIf, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit {
  title = 'demo';
  destroyList = null;
  subsList: any = [];
  constructor(
    private readonly destroyService: DestroySubscriptionService,
    private readonly cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.getDestroyList();
  }

  getDestroyList(): void {
    this.destroyService.getAllDestroy$().subscribe({
      next: data => {
        if (data) {
          this.subsList = Array.from(data.keys());
          this.cdr.detectChanges();
        }
      }
    })
  }

  onSubscribe(id: string): void {
    this.destroyService.unsubscribe(id);
  }

  onSubscribeAll(): void {
    this.destroyService.unsubscribeAll();
  }

}
