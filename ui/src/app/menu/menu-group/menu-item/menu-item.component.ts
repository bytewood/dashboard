import { Component, Input, OnDestroy } from '@angular/core';
import { DashboardItemMetadata } from "../../../dashboard/metadata/dashboard-item-metadata";
import { UiSyncService } from "../../../ui-sync.service";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";

@Component({
    selector: 'app-menu-item',
    templateUrl: './menu-item.component.html'
})
export class MenuItemComponent implements OnDestroy {

    @Input()
    metadata: DashboardItemMetadata;

    private readonly _subscriptions: Subscription[] = [];

    constructor(private readonly sync: UiSyncService) {
        this._subscriptions.push(
            this.sync.menuGroups$
                .pipe(filter(groupMetadata => this.metadata.group.title === groupMetadata.title))
                .subscribe(groupMetadata => groupMetadata.selected ? this.selectItem() : this.unselectItem()));

        this._subscriptions.push(
            this.sync.dashboardItems$
                .pipe(filter(metadata => this.metadata.title === metadata.title))
                .subscribe(metadata => this.metadata.selected = metadata.selected));
    }

    toggle(event: Event) {
        event.cancelBubble = true;
        (event.target as HTMLInputElement).checked ? this.selectItem() : this.unselectItem();
    }

    selectItem() {
        this.sync.selectMenuItem(this.metadata);
    }

    unselectItem() {
        this.sync.unselectMenuItem(this.metadata);
    }

    ngOnDestroy(): void {
        this._subscriptions.forEach(s => s.unsubscribe());
    }
}
