import {Type, ViewRef} from "@angular/core";
import {DashboardItemMetadata} from "../../dashboard/dashboard-item/dashboard-item-metadata";
import {DashboardItemComponent} from "../../dashboard/dashboard-item/dashboard-item.component";

export class GraphMetadata extends DashboardItemMetadata  {
    constructor(public checked: boolean, title: string, public yAxisFunction: Function,
                public group: string, public type: string, clazz: Type<DashboardItemComponent>) {
        super(title, clazz);
    }
}
