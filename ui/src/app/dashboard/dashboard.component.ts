import { Component } from '@angular/core';
import { ViewChild } from "@angular/core";
import { Type } from "@angular/core";
import { ItemMetadata } from "./model/item-metadata";
import { AlltimeGraphComponent } from "./alltime-graph/alltime-graph.component";
import { DashboardItemAttributes } from "./common/dashboard-item-attributes";
import { NormalViewDirective } from "./common/normal-view/normal-view.directive";
import { RangedGraphComponent } from "./ranged-graph/ranged-graph.component";
import { ViewComponent } from "./common/normal-view/view-component";
import { MenuComponent } from "./menu/menu.component";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

    @ViewChild("menu")
    menu: MenuComponent;

    @ViewChild(NormalViewDirective) dashboardItems: NormalViewDirective;

    constructor() {
    }

    onShow(metadata: ItemMetadata) {
        this.dashboardItems.load(this.componentFor(metadata), new DashboardItemAttributes(metadata));
        this.menu.calculateChecked();
    }

    onHide(metadata: ItemMetadata) {
        this.dashboardItems.unload(new DashboardItemAttributes(metadata));
        this.menu.calculateChecked();
    }

    private componentFor(graph: ItemMetadata): Type<ViewComponent> {
        switch (graph.group) {
            case "alltime":
                return AlltimeGraphComponent;
            default:
                return RangedGraphComponent;
        }
    }
}
