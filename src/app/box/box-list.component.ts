import { Component, inject, OnInit, signal } from "@angular/core";
import { Box, BoxService } from "./box.service";
import { RouterLink } from "@angular/router";
import { NgFor, NgIf } from "@angular/common";

@Component({
  selector: 'app-box-list',
  imports: [NgFor, NgIf, RouterLink],
  template: `
    <div *ngFor="let item of boxes(); let last = last">
      <h2>
        <a [routerLink]="['/box', item.slug]">{{ item.name }}</a>
      </h2>
      <p>{{ item.description }}</p>
      <hr *ngIf="!last" />
    </div>
  `
})
export class BoxListComponent implements OnInit {
  boxes = signal<Box[]>([]);

  boxService = inject(BoxService);

  ngOnInit(): void {
    this.boxService.retrieveBoxes().subscribe(boxes => {
      this.boxes.set(boxes);
    });
  }
}
