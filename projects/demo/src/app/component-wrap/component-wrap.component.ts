import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-component-wrap',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './component-wrap.component.html',
  styleUrl: './component-wrap.component.scss'
})
export class ComponentWrapComponent {

}
