import { Injectable } from '@angular/core';
import { GraphGroupMetadata } from "./metadata/graph-group-metadata";
import { GraphMetadata } from "./metadata/graph-metadata";
import { Aggregate } from "./aggregrate";
import { GraphTypesService } from "./graph-types.service";
import { AlltimeGraphComponent } from "./alltime-graph/alltime-graph.component";
import { RangedGraphComponent } from "./ranged-graph/ranged-graph.component";

@Injectable({
    providedIn: 'root'
})
export class CustomGraphTypesService extends GraphTypesService {
    constructor() {
        const foreverGroup = new GraphGroupMetadata("Forever", false, "alltime");
        foreverGroup.graphs = [
            new GraphMetadata(foreverGroup, false, "Number Of Transactions", Aggregate.count, "counts", AlltimeGraphComponent),
            new GraphMetadata(foreverGroup, false, "Total Value", Aggregate.sum, "total", AlltimeGraphComponent),
            new GraphMetadata(foreverGroup, false, "Maximum Value", Aggregate.maximum, "maximum", AlltimeGraphComponent)
        ];
        const countsGroup = new GraphGroupMetadata("Counts", false, "counts");
        countsGroup.graphs = [
            new GraphMetadata(countsGroup, false, "Counts for each hour in a day  ", Aggregate.count, "hours", RangedGraphComponent),
            new GraphMetadata(countsGroup, false, "Counts for each Day in a Month ", Aggregate.count, "days", RangedGraphComponent),
            new GraphMetadata(countsGroup, false, "Counts for each Month in a Year", Aggregate.count, "months", RangedGraphComponent)
        ];
        const valuesGroup = new GraphGroupMetadata("Value", false, "value");
        valuesGroup.graphs = [
            new GraphMetadata(valuesGroup, false, "Value for each hour in a day  ", Aggregate.sum, "hours", RangedGraphComponent),
            new GraphMetadata(valuesGroup, false, "Value for each Day in a Month ", Aggregate.sum, "days", RangedGraphComponent),
            new GraphMetadata(valuesGroup, false, "Value for each Month in a Year", Aggregate.sum, "months", RangedGraphComponent)
        ];
        const deltaGroup = new GraphGroupMetadata("Delta", false, "delta");
        deltaGroup.graphs = [
            new GraphMetadata(deltaGroup, false, "Largest for each hour in a day  ", Aggregate.maximum, "hours", RangedGraphComponent),
            new GraphMetadata(deltaGroup, false, "Largest for each Day in a Month ", Aggregate.maximum, "days", RangedGraphComponent),
            new GraphMetadata(deltaGroup, false, "Largest for each Month in a Year", Aggregate.maximum, "months", RangedGraphComponent)
        ];
        super([
            foreverGroup,
            countsGroup,
            valuesGroup,
            deltaGroup
        ]);
    }
}
