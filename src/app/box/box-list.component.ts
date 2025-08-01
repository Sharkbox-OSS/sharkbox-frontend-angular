import { Component, inject } from "@angular/core";
import { BoxService } from "./box.service";
import { Router } from "@angular/router";
import { AsyncPipe } from "@angular/common";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { BoxFormComponent } from "./box-form.component";

@Component({
  selector: 'app-box-list',
  imports: [AsyncPipe, BoxFormComponent],
  template: `
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      @for (box of boxes | async; track box) {
        <div
          class="rounded-lg ring-2 ring-black bg-white dark:bg-gray-800 p-4 text-gray-900 dark:text-white cursor-pointer"
          tabindex="0"
          role="button"
          (keydown.enter)="goToBox(box.slug)"
          (click)="goToBox(box.slug)"
          >
          <p class="font-bold">{{ box.name }}</p>
          <p class="text-sm">{{ box.description }}</p>
        </div>
      }
    </div>
    @if ((oidcSecurityService.isAuthenticated$ | async)?.isAuthenticated) {
      <app-box-form></app-box-form>
    }
  `
})
export class BoxListComponent {
  private readonly boxService = inject(BoxService);
  private readonly router = inject(Router);
  readonly oidcSecurityService = inject(OidcSecurityService);
  readonly boxes = this.boxService.retrieveBoxes();

  goToBox(slug: string) {
    this.router.navigate(['/box', slug]);
  }
}
