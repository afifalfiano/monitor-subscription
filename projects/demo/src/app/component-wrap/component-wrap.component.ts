import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { activeSubs, DestroySubscriptionService, LoggerService } from 'monitor-subscription';
import { interval, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-component-wrap',
  standalone: true,
  templateUrl: './component-wrap.component.html',
  styleUrl: './component-wrap.component.scss',
})
export class ComponentWrapComponent {
  
}
