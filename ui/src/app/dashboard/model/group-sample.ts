import { SeriesSample } from "./series-sample";

export class GroupSample {
    series: SeriesSample[] = [];

    constructor(public name: string) {
    }

    addSeries(name: string, value: string | number): void {
        this.series.push(new SeriesSample(name, value));
    }
}
