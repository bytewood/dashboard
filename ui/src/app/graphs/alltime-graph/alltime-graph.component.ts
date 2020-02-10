import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ApiService } from "../api/api.service";
import { PieGridComponent } from "@swimlane/ngx-charts";
import { GraphConfig } from "../graph-config";
import { DashboardItemComponent } from "../../dashboard/dashboard-item/dashboard-item.component";
import { GraphMetadata } from "../metadata/graph-metadata";
import { UiSyncService } from "../../ui-sync.service";

@Component({
    selector: 'app-alltime-graph',
    templateUrl: './alltime-graph.component.html',
    providers: [
        ApiService
    ]
})
export class AlltimeGraphComponent extends DashboardItemComponent implements OnInit {

    @ViewChild("chart", {static: false})
    chart: PieGridComponent;

    @Output()
    resize: EventEmitter<boolean> = new EventEmitter();

    customColors = GraphConfig.statusColors;

    constructor(private readonly dataService: ApiService, sync: UiSyncService) {
        super(sync);
    }

    ngOnInit() {
        this.fetch(new Date());
    }

    private fetch(date: Date) {
        this.dataService.allTime(this, date.toISOString(), "FOREVER", this.graphMetadata().yAxisFunction);
    }

    graphMetadata(): GraphMetadata {
        return this.metadata as GraphMetadata;
    }
}
