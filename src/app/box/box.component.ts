import { Component, input, OnInit } from "@angular/core";
import { Box, BoxService } from "./box.service";

@Component({
  template: `
    <div>Box</div>
    {{ box?.description }}
    <br/>
  `
})
export class BoxComponent implements OnInit {
  readonly slug = input<string>();

  box: Box | undefined;

  constructor(private boxService: BoxService) {}

  ngOnInit(): void {
    const slug = this.slug();
    if (slug) {
      this.boxService.retrieveBox(slug).subscribe(box => {
        this.box = box;
      });
    }
  }
}
