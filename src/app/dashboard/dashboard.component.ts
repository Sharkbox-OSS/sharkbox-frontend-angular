import { Component, OnInit } from "@angular/core";
import { Box, BoxService } from "../box/box.service";
import { NgFor } from "@angular/common";

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

  constructor(private boxService: BoxService) {}

  ngOnInit(): void {
    this.boxService.retrieveBoxes().subscribe(boxes => {
      this.boxes = boxes;
    });
  }
}
