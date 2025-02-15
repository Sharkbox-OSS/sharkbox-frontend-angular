import { Component, input, OnInit } from "@angular/core";
import { Box, BoxService } from "./box.service";
import { TitleService } from "../common/title.service";

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

  constructor(private titleService: TitleService, private boxService: BoxService) {}

  ngOnInit(): void {
    const slug = this.slug();
    if (slug) {
      this.boxService.retrieveBox(slug).subscribe(box => {
        this.box = box;
        this.titleService.setTitle(box.name, false);
      });
    }
  }
}
