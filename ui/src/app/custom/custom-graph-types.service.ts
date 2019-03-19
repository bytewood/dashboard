import { ItemMetadata } from "../dashboard/model/item-metadata";
import { DashboardMetadata } from "../dashboard/model/dashboard-metadata.service";
import { Injectable } from "@angular/core";
import { Aggregate } from "../dashboard/common/aggregrate";
import { ItemGroupMetadata } from "../dashboard/model/item-group-metadata";

@Injectable()
export class CustomGraphTypes extends DashboardMetadata {
    constructor() {
        super([
            new ItemGroupMetadata("Forever", false, "alltime", [
                new ItemMetadata(false, "Number Of Transactions", Aggregate.count, "alltime", "counts"),
                new ItemMetadata(false, "Total Value", Aggregate.sum, "alltime", "total"),
                new ItemMetadata(false, "Maximum Value", Aggregate.maximum, "alltime", "maximum")
            ]),
            new ItemGroupMetadata("Counts", false, "counts", [
                new ItemMetadata(false, "Counts of Hours in Day", Aggregate.count, "counts", "hours"),
                new ItemMetadata(false, "Counts of Days in Month", Aggregate.count, "counts", "days"),
                new ItemMetadata(false, "Counts of Months in Year", Aggregate.count, "counts", "months")
            ]),
            new ItemGroupMetadata("Value", false, "value", [
                new ItemMetadata(false, "Value of Hours in Day", Aggregate.sum, "value", "hours"),
                new ItemMetadata(false, "Value Days in Month", Aggregate.sum, "value", "days"),
                new ItemMetadata(false, "Value Months in Year", Aggregate.sum, "value", "months")
            ]),
            new ItemGroupMetadata("Delta", false, "delta", [
                new ItemMetadata(false, "Largest of Hours in Day", Aggregate.maximum, "delta", "hours"),
                new ItemMetadata(false, "Largest of Days in Month", Aggregate.maximum, "delta", "days"),
                new ItemMetadata(false, "Largest of Months in Year", Aggregate.maximum, "delta", "months")
            ])
        ]);
    }
}
