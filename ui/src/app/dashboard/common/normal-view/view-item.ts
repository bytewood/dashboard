
import { ViewComponent } from "./view-component";
import { Type } from "@angular/core";

export class ViewItem {
    constructor(public component: Type<ViewComponent>, public attributes?: any) {
    }
}
