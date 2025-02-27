import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ResultsComponent } from 'monitor-subscription';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ResultsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'demo';

}
