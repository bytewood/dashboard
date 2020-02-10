import { Component, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { MenuGroupComponent } from "./menu-group/menu-group.component";
import { GraphTypesService } from "../graphs/graph-types.service";
import { UiSyncService } from "../ui-sync.service";
import { Subscription } from "rxjs";
import { DashboardAllMetadata } from "../dashboard/metadata/dashboard-all-metadata";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent implements OnDestroy {

    metadata: DashboardAllMetadata;

    @ViewChildren(MenuGroupComponent)
    menuGroups: QueryList<MenuGroupComponent>;

    private readonly _subscription: Subscription;

    constructor(private readonly graphTypes: GraphTypesService, private readonly sync: UiSyncService) {
        this.metadata = new DashboardAllMetadata(false, this.graphTypes.groups);

        this._subscription = this.sync.menuGroups$.subscribe(_ => this.calculateChecked());
    }

    toggleAll(event: Event) {
        this.toggle((event.target as HTMLInputElement).checked);
    }

    calculateChecked() {
        const selected = this.metadata.groups
            .map(g => g.selected)
            .reduce((previous, current) => previous && current);

        if (selected !== this.metadata.selected) {
            this.metadata.selected = selected;
            this.toggle(this.metadata.selected);
        }
    }

    private toggle(selected) {
        (selected)
            ? this.selectAll()
            : this.unselectAll();
    }

    private selectAll() {
        this.metadata.groups.forEach(_ => this.sync.selectAll(this.metadata));
    }

    private unselectAll() {
        this.metadata.groups.forEach(_ => this.sync.unselectAll(this.metadata));
    }

    ngOnDestroy(): void {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }
}
