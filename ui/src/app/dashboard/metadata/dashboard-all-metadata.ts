import { DashboardGroupMetadata } from "./dashboard-group-metadata";

export class DashboardAllMetadata {
    constructor(public selected: boolean, public groups: DashboardGroupMetadata[]) {
    }
}
