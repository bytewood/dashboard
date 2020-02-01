import { Component, OnInit } from '@angular/core';
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { ViewChild } from "@angular/core";
import { DashboardItemComponent } from "../common/dashboard-item-component";
import { DashboardService } from "../common/dashboard.service";
import { PieGridComponent } from "@swimlane/ngx-charts";
import { ViewComponent } from "../common/normal-view/view-component";
import { DashboardItemAttributes } from "../common/dashboard-item-attributes";
import { GraphConfig } from "../common/graph-config";

@Component({
    selector: 'app-alltime-graph',
    templateUrl: './alltime-graph.component.html',
    providers: [
        DashboardService
    ]
})
export class AlltimeGraphComponent extends DashboardItemComponent implements ViewComponent, OnInit {

    attributes: DashboardItemAttributes;

    @ViewChild("chart", {static: false})
    chart: PieGridComponent;

    @Output()
    resize: EventEmitter<boolean> = new EventEmitter();

    customColors = GraphConfig.statusColors;

    view = [];

    closeIcon = ['far', 'window-close'];
    _resizeIcon = 'window-maximize';

    constructor(private dataService: DashboardService) {
        super();
    }

    ngOnInit() {
        this.view = [this.attributes.cardWidth, this.attributes.cardHeight];
        this.fetch(new Date());
    }

    private fetch(date: Date) {
        this.title = this.attributes.metadata.title;
        this.dataService.allTime(this, date.toISOString(), "FOREVER", this.attributes.metadata.yAxisFunction);
    }

    get resizeIcon(): string[] {
        return ['far', this._resizeIcon];
    }

    onResize() {
        if (this._resizeIcon === 'window-restore') {
            this._resizeIcon = 'window-maximize';
        } else {
            this._resizeIcon = 'window-restore';
        }
        this.resize.emit(true);
    }
}
