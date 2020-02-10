import { Component, Input, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { MenuItemComponent } from "./menu-item/menu-item.component";
import { UiSyncService } from "../../ui-sync.service";
import { DashboardGroupMetadata } from "../../dashboard/metadata/dashboard-group-metadata";
import { merge, Subscription } from "rxjs";

@Component({
    selector: 'app-menu-group',
    templateUrl: './menu-group.component.html'
})
export class MenuGroupComponent implements OnDestroy {

    @Input()
    groupMetadata: DashboardGroupMetadata;

    @ViewChildren(MenuItemComponent)
    menuItems: QueryList<MenuItemComponent>;

    private _subscriptions: Subscription[] = [];

    constructor(private readonly sync: UiSyncService) {
        this._subscriptions.push(
            this.sync.menuAll$.subscribe(metadata => metadata.selected ? this.selectGroup() : this.unselectGroup()));

        this._subscriptions.push(
            merge(this.sync.dashboardItems$, this.sync.menuItems$).subscribe(_ => this.calculateChecked()));
    }

    toggleGroup(event: Event) {
        event.cancelBubble = true;
        this.toggle((event.target as HTMLInputElement).checked);
    }

    private toggle(selected: boolean) {
        selected ? this.selectGroup() : this.unselectGroup();
    }

    selectGroup() {
        this.groupMetadata.items.forEach(_ => this.sync.selectMenuGroup(this.groupMetadata));
    }

    unselectGroup() {
        this.groupMetadata.items.forEach(_ => this.sync.unselectMenuGroup(this.groupMetadata));
    }

    calculateChecked() {
        this.groupMetadata.selected = this.groupMetadata.items
            .map(i => i.selected)
            .reduce((previous, current) => previous && current);
    }

    ngOnDestroy(): void {
        this._subscriptions.forEach(s => s.unsubscribe());
    }
}
