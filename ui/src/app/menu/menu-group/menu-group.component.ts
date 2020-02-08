import { Component } from '@angular/core';
import { Input } from "@angular/core";
import { ViewChildren } from "@angular/core";
import { QueryList } from "@angular/core";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { GraphGroupMetadata } from "../../graphs/metadata/graph-group-metadata";
import { MenuItemComponent } from "./menu-item/menu-item.component";
import { GraphMetadata } from "../../graphs/metadata/graph-metadata";

@Component({
    selector: 'app-menu-group',
    templateUrl: './menu-group.component.html'
})
export class MenuGroupComponent {

    @Input()
    group: GraphGroupMetadata;

    @ViewChildren(MenuItemComponent)
    menuItems: QueryList<MenuItemComponent>;

    @Output()
    show: EventEmitter<GraphMetadata> = new EventEmitter();

    @Output()
    hide: EventEmitter<GraphMetadata> = new EventEmitter();

    constructor() {
    }

    toggleGroup(event: Event) {
        event.cancelBubble = true;
        this.menuItems.forEach(m => ((event.target as HTMLInputElement).checked) ? m.showItem() : m.hideItem());
    }

    onShow(item: GraphMetadata) {
        this.show.emit(item);
    }

    onHide(item: GraphMetadata) {
        this.hide.emit(item);
    }

    showGroup() {
        if (!this.group.checked) {
            this.menuItems.forEach(m => {
                m.showItem();
            });
        }
    }

    hideGroup() {
        if (this.group.checked) {
            this.menuItems.forEach(m => m.hideItem());
        }
    }

    calculateChecked() {
        this.group.checked = this.group.graphs
            .map(i => i.checked)
            .reduce((previous, current) => previous && current);
    }
}
