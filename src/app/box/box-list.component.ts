import { Component, inject } from "@angular/core";
import { BoxService } from "./box.service";
import { Router } from "@angular/router";
import { AsyncPipe, NgFor } from "@angular/common";

@Component({
  selector: 'app-box-list',
  imports: [NgFor, AsyncPipe],
  template: `
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        *ngFor="let box of boxes | async"
        class="rounded-lg ring-2 ring-black bg-white dark:bg-gray-800 p-4 text-gray-900 dark:text-white cursor-pointer"
        tabindex="0"
        role="button"
        (keydown.enter)="goToBox(box.slug)"
        (click)="goToBox(box.slug)"
      >
        <p class="font-bold">{{ box.name }}</p>
        <p class="text-sm">{{ box.description }}</p>
      </div>
    </div>
  `
})
export class BoxListComponent {
  readonly boxService = inject(BoxService);
  readonly router = inject(Router);
  readonly boxes = this.boxService.retrieveBoxes();

  goToBox(slug: string) {
    this.router.navigate(['/box', slug]);
  }
}
