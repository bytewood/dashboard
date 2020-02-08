import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../api/api.service";
import {BarVertical2DComponent} from "@swimlane/ngx-charts";
import {GraphConfig} from "../graph-config";
import {DashboardItemComponent} from "../../dashboard/dashboard-item/dashboard-item.component";
import {GraphMetadata} from "../metadata/graph-metadata";

@Component({
    selector: 'app-ranged-graph',
    templateUrl: './ranged-graph.component.html',
    providers: [
        ApiService
    ]
})
export class RangedGraphComponent extends DashboardItemComponent implements OnInit {

    @ViewChild("parent", {static: false})
    private parent: HTMLElement;

    @ViewChild("chart", {static: false})
    private chart: BarVertical2DComponent;

    @Input()
    after: string;

    showXAxis = true;
    showYAxis = true;
    gradient = true;
    showLegend = false;
    showXAxisLabel = false;
    showYAxisLabel = false;

    customColors = GraphConfig.statusColors;

    constructor(private dataService: ApiService) {
        super();
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
