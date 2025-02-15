import { Component, OnInit } from "@angular/core";
import { Box } from "../box/box.service";
import { TitleService } from "../common/title.service";
import { BoxListComponent } from "../box/box-list.component";

@Component({
  imports: [BoxListComponent],
  template: `
    <app-box-list></app-box-list>
  `
})
export class DashboardComponent implements OnInit {

  public boxes: Box[] = [];

  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.setTitle('Dashboard');
  }
}
