import { ItemMetadata } from "./item-metadata";

export class ItemGroupMetadata {
    constructor(public title: string, public checked: boolean, public name: string,
                public graphs: ItemMetadata[]) {
    }
}
