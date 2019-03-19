import { Component } from '@angular/core';
import { Input } from "@angular/core";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { ItemMetadata } from "../../../model/item-metadata";
import { dbg } from "../../../common/logger";

@Component({
    selector: 'app-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent {

    @Input()
    item: ItemMetadata;

    @Output()
    show: EventEmitter<ItemMetadata> = new EventEmitter();

    @Output()
    hide: EventEmitter<ItemMetadata> = new EventEmitter();
    
    toggle(event: Event) {
        event.cancelBubble = true;
        if ((event.srcElement as HTMLInputElement).checked) {
            this.showItem();
        } else {
            this.hideItem();
        }
    }

    showItem() {
        if (!this.item.checked) {
            dbg(">>>>> show item")
            dbg(this.item);
            this.item.checked = true;
            this.show.emit(this.item);
        }
    }

    hideItem() {
        if (this.item.checked) {
            this.item.checked = false;
            this.hide.emit(this.item);
        }
    }
}
