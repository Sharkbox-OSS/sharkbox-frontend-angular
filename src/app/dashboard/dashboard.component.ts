import { Component, OnInit } from "@angular/core";
import { Box, BoxService } from "../box/box.service";
import { NgFor } from "@angular/common";
import { TitleService } from "../common/title.service";

@Component({
  imports: [NgFor],
  template: `
    <h1>Dashboard</h1>
    <div *ngFor="let box of boxes">
      <h2>{{ box.name }}</h2>
      <p>{{ box.description }}</p>
    </div>
  `
})
export class DashboardComponent implements OnInit {

  public boxes: Box[] = [];

  constructor(private titleService: TitleService, private boxService: BoxService) {}

  ngOnInit(): void {
    this.boxService.retrieveBoxes().subscribe(boxes => {
      this.boxes = boxes;
      this.titleService.setTitle('Dashboard');
    });
  }
}
