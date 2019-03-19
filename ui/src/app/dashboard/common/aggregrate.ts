import { Metric } from "../api/metric";

export class Aggregate {
    static count(i: Metric) {
        return i.count;
    }

    static sum(i: Metric) {
        return i.sum;
    }

    static minimum(i: Metric) {
        return i.min;
    }

    static average(i: Metric) {
        return i.avg;
    }

    static maximum(i: Metric) {
        return i.max;
    }
}
