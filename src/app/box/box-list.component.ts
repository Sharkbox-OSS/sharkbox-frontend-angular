import { Component, OnInit } from "@angular/core";
import { Box, BoxService } from "./box.service";
import { JsonPipe } from "@angular/common";

@Component({
  imports: [JsonPipe],
  template: `
    <div>Boxes</div>
    {{ boxes | json }}
  `
})
export class BoxListComponent implements OnInit {
  boxes: Box[] = [];

  constructor(private boxService: BoxService) {}

  ngOnInit(): void {
    this.boxService.retrieveBoxes().subscribe(boxes => {
      console.log(boxes);
      this.boxes = boxes;
    });
  }
}
