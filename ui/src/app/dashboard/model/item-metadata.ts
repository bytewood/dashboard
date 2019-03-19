import { ViewRef } from "@angular/core";

export class ItemMetadata {
    viewRef: ViewRef;
    constructor(public checked: boolean, public title: string, public yAxisFunction: Function,
                public group: string, public type: string) {
    }
}
