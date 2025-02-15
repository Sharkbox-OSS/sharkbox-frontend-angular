import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private title: Title) {}

  setTitle(value: string, usePrefix = true): void {
    if (usePrefix) {
      this.title.setTitle(`Sharkbox - ${value}`);
    } else {
      this.title.setTitle(value);
    }
  }
}
