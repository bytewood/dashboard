import { ItemMetadata } from "../model/item-metadata";

export class DashboardItemAttributes {
    cardWidth = (window.screen.width - 200) / 3;
    cardHeight = this.cardWidth / 1.618;

    constructor(public metadata: ItemMetadata) {
    }
}
