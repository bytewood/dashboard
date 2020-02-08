import {Injectable} from "@angular/core";
import {GraphGroupMetadata} from "./metadata/graph-group-metadata";

@Injectable({
    providedIn: 'root'
})
export abstract class GraphTypesService {
    protected constructor(public groups: GraphGroupMetadata[]) {
    }
}
