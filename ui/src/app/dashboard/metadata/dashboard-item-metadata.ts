import { Type, ViewRef } from "@angular/core";
import { DashboardItemComponent } from "../dashboard-item/dashboard-item.component";
import { DashboardGroupMetadata } from "./dashboard-group-metadata";


export abstract class DashboardItemMetadata {
    viewRef: ViewRef;

    protected constructor(public group: DashboardGroupMetadata, public selected, public title: string,
                          public type: string, public componentType: Type<DashboardItemComponent>) {
    }
}
