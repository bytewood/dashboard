import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GraphMetadata} from "../../../graphs/metadata/graph-metadata";
import {dbg} from "../../../common/logger";

@Component({
    selector: 'app-menu-item',
    templateUrl: './menu-item.component.html'
})
export class MenuItemComponent {

    @Input()
    item: GraphMetadata;

    @Output()
    show: EventEmitter<GraphMetadata> = new EventEmitter();

    @Output()
    hide: EventEmitter<GraphMetadata> = new EventEmitter();

    toggle(event: Event) {
        event.cancelBubble = true;
        if ((event.target as HTMLInputElement).checked) {
            this.showItem();
        } else {
            this.hideItem();
        }
    }

    showItem() {
        if (!this.item.checked) {
            dbg(">>>>> show item");
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
