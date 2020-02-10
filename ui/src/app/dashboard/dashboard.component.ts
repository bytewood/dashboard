import { Component, OnDestroy, ViewChild } from '@angular/core';
import { DynamicDashboardItemDirective } from "./dashboard-item/dynamic-dashboard-item.directive";
import { UiSyncService } from "../ui-sync.service";
import { merge, Subscription } from "rxjs";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    providers: [UiSyncService]
})
export class DashboardComponent implements OnDestroy {

    @ViewChild(DynamicDashboardItemDirective, {static: false})
    dashboardItems: DynamicDashboardItemDirective;

    private readonly _subscription: Subscription;

    constructor(private readonly sync: UiSyncService) {
        this._subscription = merge(this.sync.dashboardItems$, this.sync.menuItems$).subscribe((metadata) => {
            (metadata.selected)
                ? this.dashboardItems.load(metadata)
                : this.dashboardItems.unload(metadata);
        });
    }

    ngOnDestroy(): void {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }
}
