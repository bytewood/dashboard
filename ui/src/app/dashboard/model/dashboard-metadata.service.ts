import { Injectable } from "@angular/core";
import { ItemGroupMetadata } from "./item-group-metadata";

@Injectable()
export class DashboardMetadata {
    constructor(public groups: ItemGroupMetadata[]) {
    }
}
