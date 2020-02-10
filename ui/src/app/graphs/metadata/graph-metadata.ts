import { Type } from "@angular/core";
import { DashboardItemMetadata } from "../../dashboard/metadata/dashboard-item-metadata";
import { DashboardItemComponent } from "../../dashboard/dashboard-item/dashboard-item.component";
import { Selectable } from "../../common/selectable";
import { GraphGroupMetadata } from "./graph-group-metadata";

export class GraphMetadata extends DashboardItemMetadata implements Selectable {
    constructor(parent: GraphGroupMetadata, selected: boolean, title: string, public yAxisFunction: Function,
                type: string, clazz: Type<DashboardItemComponent>) {
        super(parent, selected, title, type, clazz);
    }
}
