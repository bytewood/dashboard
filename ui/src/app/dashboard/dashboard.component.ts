import {Component, ViewChild} from '@angular/core';
import {GraphMetadata} from "../graphs/metadata/graph-metadata";
import {DynamicDashboardItemDirective} from "./dashboard-item/dynamic-dashboard-item.directive";
import {MenuComponent} from "../menu/menu.component";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

    @ViewChild("menu", {static: false})
    menu: MenuComponent;

    @ViewChild(DynamicDashboardItemDirective, {static: false}) dashboardItems: DynamicDashboardItemDirective;

    constructor() {
    }

    onShow(metadata: GraphMetadata) {
        this.dashboardItems.load(metadata);
    }

    onHide(metadata: GraphMetadata) {
        this.dashboardItems.unload(metadata);
    }
}
