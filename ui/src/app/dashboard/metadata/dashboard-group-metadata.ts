import { DashboardItemMetadata } from "./dashboard-item-metadata";

export class DashboardGroupMetadata {
    constructor(public selected: boolean, public title: string, public items?: DashboardItemMetadata[]) {
    }
}
