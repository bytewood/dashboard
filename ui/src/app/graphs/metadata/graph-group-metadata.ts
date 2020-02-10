import { GraphMetadata } from "./graph-metadata";
import { DashboardGroupMetadata } from "../../dashboard/metadata/dashboard-group-metadata";

export class GraphGroupMetadata extends DashboardGroupMetadata {

    constructor(title: string, selected: boolean, public name: string) {
        super(selected, title);
    }

    set graphs(graphs: GraphMetadata[]) {
        this.items = graphs;
    }
}
