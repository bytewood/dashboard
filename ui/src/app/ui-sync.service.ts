import { Injectable, OnDestroy } from '@angular/core';
import { DashboardItemMetadata } from "./dashboard/metadata/dashboard-item-metadata";
import { Subject } from "rxjs";
import { DashboardGroupMetadata } from "./dashboard/metadata/dashboard-group-metadata";
import { DashboardAllMetadata } from "./dashboard/metadata/dashboard-all-metadata";


function itemUnselected(metadata: DashboardItemMetadata) {
    return !metadata.selected;
}

function groupUnselected(metadata: DashboardGroupMetadata) {
    return !metadata.selected;
}

@Injectable({
    providedIn: 'root'
})
export class UiSyncService implements OnDestroy {
    menuItemSource = new Subject<DashboardItemMetadata>();
    menuGroupSource = new Subject<DashboardGroupMetadata>();
    menuAllSource = new Subject<DashboardAllMetadata>();
    dashboardItemsSource = new Subject<DashboardItemMetadata>();

    menuItems$ = this.menuItemSource.asObservable();
    menuGroups$ = this.menuGroupSource.asObservable();
    menuAll$ = this.menuAllSource.asObservable();
    dashboardItems$ = this.dashboardItemsSource.asObservable();

    constructor() {
    }

    selectMenuItem(metadata: DashboardItemMetadata) {
        if (itemUnselected(metadata)) {
            metadata.selected = true;
            this.menuItemSource.next(metadata);
        }
    }

    unselectMenuItem(metadata: DashboardItemMetadata) {
        if (metadata.selected) {
            metadata.selected = false;
            this.menuItemSource.next(metadata);
        }
    }

    selectMenuGroup(metadata: DashboardGroupMetadata) {
        if (groupUnselected(metadata)) {
            metadata.selected = true;
            this.menuGroupSource.next(metadata);
        }
    }

    unselectMenuGroup(metadata: DashboardGroupMetadata) {
        if (metadata.selected) {
            metadata.selected = false;
            this.menuGroupSource.next(metadata);
        }
    }

    selectAll(metadata: DashboardAllMetadata) {
        if (!metadata.selected) {
            metadata.selected = true;
            this.menuAllSource.next(metadata);
        }
    }

    unselectAll(metadata: DashboardAllMetadata) {
        if (metadata.selected) {
            metadata.selected = false;
            this.menuAllSource.next(metadata);
        }
    }

    openDashboardItem(metadata: DashboardItemMetadata) {
        if (itemUnselected(metadata)) {

            metadata.selected = true;
            this.dashboardItemsSource.next(metadata);
        }
    }

    closeDashboardItem(metadata: DashboardItemMetadata) {
        if (metadata.selected) {
            metadata.selected = false;
            this.dashboardItemsSource.next(metadata);

        }
    }

    ngOnDestroy(): void {
        this.menuItemSource.complete();
        this.menuGroupSource.complete();
        this.dashboardItemsSource.complete();
    }
}

