import { Component } from '@angular/core';
import { Input } from "@angular/core";
import { ViewChildren } from "@angular/core";
import { QueryList } from "@angular/core";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { ItemGroupMetadata } from "../../model/item-group-metadata";
import { MenuItemComponent } from "./menu-item/menu-item.component";
import { ItemMetadata } from "../../model/item-metadata";

@Component({
    selector: 'app-menu-group',
    templateUrl: './menu-group.component.html',
    styleUrls: ['./menu-group.component.css']
})
export class MenuGroupComponent {

    @Input()
    group: ItemGroupMetadata;

    @ViewChildren(MenuItemComponent)
    menuItems: QueryList<MenuItemComponent>;

    @Output()
    show: EventEmitter<ItemMetadata> = new EventEmitter();

    @Output()
    hide: EventEmitter<ItemMetadata> = new EventEmitter();

    constructor() {
    }

    toggleGroup(event: Event) {
        event.cancelBubble = true;
        this.menuItems.forEach(m => ((event.srcElement as HTMLInputElement).checked) ? m.showItem() : m.hideItem());
    }

    onShow(item: ItemMetadata) {
        this.show.emit(item);
    }

    onHide(item: ItemMetadata) {
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
