import {Injectable} from '@angular/core';
import {GraphGroupMetadata} from "./metadata/graph-group-metadata";
import {GraphMetadata} from "./metadata/graph-metadata";
import {Aggregate} from "./aggregrate";
import {GraphTypesService} from "./graph-types.service";
import {AlltimeGraphComponent} from "./alltime-graph/alltime-graph.component";
import {RangedGraphComponent} from "./ranged-graph/ranged-graph.component";

@Injectable({
    providedIn: 'root'
})
export class CustomGraphTypesService extends GraphTypesService {
    constructor() {
        super( [
            new GraphGroupMetadata("Forever", false, "alltime", [
                new GraphMetadata(false, "Number Of Transactions", Aggregate.count, "alltime", "counts", AlltimeGraphComponent),
                new GraphMetadata(false, "Total Value", Aggregate.sum, "alltime", "total", AlltimeGraphComponent),
                new GraphMetadata(false, "Maximum Value", Aggregate.maximum, "alltime", "maximum", AlltimeGraphComponent)
            ]),
            new GraphGroupMetadata("Counts", false, "counts", [
                new GraphMetadata(false, "Counts for each hour in a day  ", Aggregate.count, "counts", "hours", RangedGraphComponent),
                new GraphMetadata(false, "Counts for each Day in a Month ", Aggregate.count, "counts", "days", RangedGraphComponent),
                new GraphMetadata(false, "Counts for each Month in a Year", Aggregate.count, "counts", "months", RangedGraphComponent)
            ]),
            new GraphGroupMetadata("Value", false, "value", [
                new GraphMetadata(false, "Value for each hour in a day  ", Aggregate.sum, "value", "hours", RangedGraphComponent),
                new GraphMetadata(false, "Value for each Day in a Month ", Aggregate.sum, "value", "days", RangedGraphComponent),
                new GraphMetadata(false, "Value for each Month in a Year", Aggregate.sum, "value", "months", RangedGraphComponent)
            ]),
            new GraphGroupMetadata("Delta", false, "delta", [
                new GraphMetadata(false, "Largest for each hour in a day  ", Aggregate.maximum, "delta", "hours", RangedGraphComponent),
                new GraphMetadata(false, "Largest for each Day in a Month ", Aggregate.maximum, "delta", "days", RangedGraphComponent),
                new GraphMetadata(false, "Largest for each Month in a Year", Aggregate.maximum, "delta", "months", RangedGraphComponent)
            ])
        ]);
    }
}
