import { Component, inject, OnInit, signal } from "@angular/core";
import { Box, BoxService } from "./box.service";
import { RouterLink } from "@angular/router";
import { NgFor, NgIf } from "@angular/common";
import { DataViewModule } from "primeng/dataview";

@Component({
  selector: 'app-box-list',
  imports: [NgFor, NgIf, RouterLink, DataViewModule],
  template: `
    <p-dataview #dv [value]="boxes()" [paginator]="true" [rows]="5">
      <ng-template #list let-items>
        <div *ngFor="let item of items; let last = last">
          <h2>
            <a [routerLink]="['/box', item.slug]">{{ item.name }}</a>
          </h2>
          <p>{{ item.description }}</p>
          <hr *ngIf="!last" />
        </div>
      </ng-template>
    </p-dataview>
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
