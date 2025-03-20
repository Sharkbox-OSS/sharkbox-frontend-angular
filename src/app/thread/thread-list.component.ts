import { NgFor } from "@angular/common";
import { Component, inject, input, OnChanges, signal } from "@angular/core";
import { Thread, ThreadService } from "./thread.service";
import { Box } from "../box/box.service";

@Component({
  selector: 'app-thread-list',
  imports: [NgFor],
  template: `
    <div>
      <div
        *ngFor="let item of threads()"
        class="p-4 cursor-pointer"
        tabindex="0"
        role="button"
        (keydown.enter)="goToThread(item)"
        (click)="goToThread(item)"
      >
        <p class="font-bold">{{ item.title }}</p>
        <p class="text-sm">{{ item.description }}</p>
      </div>
    </div>
  `
})
export class ThreadListComponent implements OnChanges {
  readonly threads = signal<Thread[]>([]);
  readonly box = input.required<Box>();
  readonly threadService = inject(ThreadService);

  ngOnChanges(): void {
    if (this.box().slug) {
      this.threadService.getThreadsForBox(this.box().slug).subscribe(threads => {
        this.threads.set(threads);
      });
    }
  }

  goToThread(thread: Thread) {
    console.log('thread', thread);
  }
}
