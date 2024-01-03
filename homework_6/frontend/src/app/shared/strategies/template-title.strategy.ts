import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";

@Injectable({ providedIn: "root" })
export class TemplateTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }
  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (!title) {
      return this.title.setTitle(`Just chat`);
    }

    return this.title.setTitle(`Just chat | ${title}`);
  }
}
