import { Component, input, OnInit } from "@angular/core";
import { Box, BoxService } from "./box.service";
import { TitleService } from "../common/title.service";
import { ThreadListComponent } from "../thread/thread-list.component";

@Component({
  template: `
    <h1>{{ box.name }}</h1>
    <p>{{ box.description }}</p>
    <app-thread-list [box]="box"></app-thread-list>
  `,
  imports: [ThreadListComponent]
})
export class BoxComponent implements OnInit {
  readonly slug = input.required<string>();

  box: Box = {} as Box;

  constructor(private titleService: TitleService, private boxService: BoxService) {}

  ngOnInit(): void {
    this.boxService.retrieveBox(this.slug()).subscribe(box => {
      this.box = box;
      this.titleService.setTitle(box.name, false);
    });
  }
}
