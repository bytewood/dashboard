import { Type } from "@angular/core/src/type";
import { ViewComponent } from "./view-component";

export class ViewItem {
    constructor(public component: Type<ViewComponent>, public attributes?: any) {
    }
}
