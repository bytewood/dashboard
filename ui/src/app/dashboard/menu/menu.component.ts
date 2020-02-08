import { Component } from '@angular/core';
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { ViewChildren } from "@angular/core";
import { QueryList } from "@angular/core";
import { DashboardMetadata } from "../model/dashboard-metadata.service";
import { ItemMetadata } from "../model/item-metadata";
import { ItemGroupMetadata } from "../model/item-group-metadata";
import { MenuGroupComponent } from "./menu-group/menu-group.component";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent {

    checked = false;

    groups: ItemGroupMetadata[];

    @ViewChildren("menuGroup")
    menuGroups: QueryList<MenuGroupComponent>;

    @Output()
    show: EventEmitter<ItemMetadata> = new EventEmitter();

    @Output()
    hide: EventEmitter<ItemMetadata> = new EventEmitter();

    constructor(public graphTypes: DashboardMetadata) {
        this.groups = this.graphTypes.groups;
    }

    onShow(item: ItemMetadata) {
        this.show.emit(item);
    }

    onHide(item: ItemMetadata) {
        this.hide.emit(item);
    }

    toggleAll(event: Event) {
        if ((event.target as HTMLInputElement).checked) {
            this.menuGroups.forEach(g => g.showGroup());
        } else {
            this.menuGroups.forEach((g => g.hideGroup()));
        }
    }

    calculateChecked() {
        this.menuGroups.forEach(g => g.calculateChecked());
        this.checked = this.groups.map(g => g.checked).reduce((p, c) => p && c);
    }
}
