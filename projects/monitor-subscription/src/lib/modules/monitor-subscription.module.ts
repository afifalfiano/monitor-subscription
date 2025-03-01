import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from '../../public-api';

@NgModule({
  imports: [ResultsComponent, CommonModule],
  exports: [ResultsComponent]
})
export class MonitorSubscriptionModule { }
