import {Type, ViewRef} from "@angular/core";
import {DashboardItemComponent} from "./dashboard-item.component";


export abstract class DashboardItemMetadata {
    viewRef: ViewRef;
    constructor(public title: string, public componentType: Type<DashboardItemComponent>) {
    }
}
