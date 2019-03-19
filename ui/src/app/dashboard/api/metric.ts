// Expecting an array of Metric objects from the backend server api.
export interface Metric {
    interval: number;
    status: string;
    count: number;
    sum: number;
    min: number;
    avg: number;
    max: number;
}
