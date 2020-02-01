import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { ViewChild } from "@angular/core";
import { DashboardService } from "../common/dashboard.service";
import { DashboardItemComponent } from "../common/dashboard-item-component";
import { BarVertical2DComponent } from "@swimlane/ngx-charts";
import { DashboardItemAttributes } from "../common/dashboard-item-attributes";
import { GraphConfig } from "../common/graph-config";

@Component({
    selector: 'app-ranged-graph',
    templateUrl: './ranged-graph.component.html',
    providers: [
        DashboardService
    ]
})
export class RangedGraphComponent extends DashboardItemComponent implements OnInit {

    private _maximized = false;
    attributes: DashboardItemAttributes;

    @ViewChild("parent", {static: false})
    private parent: HTMLElement;

    @ViewChild("chart", {static: false})
    private chart: BarVertical2DComponent;

    @Input()
    after: string;

    previousView = [];
    view = [];

    showXAxis = true;
    showYAxis = true;
    gradient = true;
    showLegend = false;
    showXAxisLabel = false;
    showYAxisLabel = false;

    customColors = GraphConfig.statusColors;

    closeIcon  = ['far', 'window-close'];
    resizeIcon = ['far', 'window-maximize'];

    constructor(private dataService: DashboardService) {
        super();
    }

    ngOnInit() {
        this.previousView = this.view = [this.attributes.cardWidth, this.attributes.cardHeight];
        this.fetch(new Date());
    }

    private fetch(date: Date) {
        this.title = this.attributes.metadata.title;
        this.dataService.metrics(this, date.toISOString(), this.attributes.metadata.type.toUpperCase(),
            this.attributes.metadata.yAxisFunction);
    }

    onDateChanged(date: Date) {
        this.fetch(date);
    }

    onResize() {
        if (this._maximized) {
            this._maximized = false;
            this.resizeIcon = ['far', 'window-maximize'];
            this.view = this.previousView;
        } else {
            this._maximized = true;
            this.resizeIcon = ['far', 'window-restore'];
            this.previousView = this.view;
            this.view = [window.screen.width - 84, this.attributes.cardHeight];
        }
    }
}
