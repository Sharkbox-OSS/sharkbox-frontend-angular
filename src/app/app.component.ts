import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header-component';
import { FooterComponent } from './layout/footer-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <section role="main" class="p-4">
      <router-outlet />
    </section>
    <app-footer></app-footer>
  `
})
export class AppComponent {}
