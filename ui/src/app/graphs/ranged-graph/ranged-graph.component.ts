import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api/api.service";
import { GraphConfig } from "../graph-config";
import { DashboardItemComponent } from "../../dashboard/dashboard-item/dashboard-item.component";
import { GraphMetadata } from "../metadata/graph-metadata";
import { UiSyncService } from "../../ui-sync.service";

@Component({
    selector: 'app-ranged-graph',
    templateUrl: './ranged-graph.component.html',
    providers: [
        ApiService
    ]
})
export class RangedGraphComponent extends DashboardItemComponent implements OnInit {

    showXAxis = true;
    showYAxis = true;
    gradient = true;
    showLegend = false;
    showXAxisLabel = false;
    showYAxisLabel = false;

    customColors = GraphConfig.statusColors;

    constructor(private dataService: ApiService, sync: UiSyncService) {
        super(sync);
    }

    ngOnInit() {
        this.fetch(new Date());
    }

    private fetch(date: Date) {
        this.dataService.metrics(this, date.toISOString(), this.graphMetadata().type.toUpperCase(),
            this.graphMetadata().yAxisFunction);
    }

    onDateChanged(date: Date) {
        this.fetch(date);
    }

    graphMetadata(): GraphMetadata {
        return this.metadata as GraphMetadata;
    }
}
