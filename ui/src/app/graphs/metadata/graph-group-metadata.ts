import { GraphMetadata } from "./graph-metadata";

export class GraphGroupMetadata {
    constructor(public title: string, public checked: boolean, public name: string,
                public graphs: GraphMetadata[]) {
    }
}
