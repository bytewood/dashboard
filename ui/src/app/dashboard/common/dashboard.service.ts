import { Injectable } from '@angular/core';
import { DashboardItemComponent } from "./dashboard-item-component";
import { GroupSample } from "../model/group-sample";
import { HttpClient } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { Sample } from "../model/sample";
import { environment } from "../../../environments/environment";
import { dbg } from "./logger";

@Injectable()
export class DashboardService {

    constructor(private http: HttpClient) {
    }

    metrics(component: DashboardItemComponent, after: string, chronoUnit: string, yAxisFunc: Function) {
        this.fetch(after, chronoUnit).pipe(take(1)).subscribe(
            (data) => {
                dbg(data);
                component.data = this.toGroupSeries(data.metrics, yAxisFunc);
            },
            (error) => console.log(error)
        );
    }

    allTime(component: DashboardItemComponent, after: string, chronoUnit: string, yAxisFunc: Function) {
        this.fetch(after, chronoUnit).pipe(take(1)).subscribe(
            (data) => {
                dbg(data);
                component.data = this.toSeries(data.metrics, yAxisFunc);
            },
            (error) => console.log(error)
        );
    }

    fetch(after, chronoUnit): Observable<any> {
        const headers = new HttpHeaders()
            .append("Accept", "application/hal+json");

        const params = new HttpParams()
            .append("after", after)
            .append("chronounit", chronoUnit);

        return this.http.get<any>(environment.apiUrl + "/metrics", {
            headers: headers,
            params: params
        });
    }

    toGroupSeries(data: any[], yAxisFunc): GroupSample[] {
        const samples = {};

        data.forEach(i => {
                let sample: GroupSample;
                if (Object.keys(samples).indexOf("" + i.interval) < 0) {
                    sample = samples["" + i.interval] = new GroupSample("" + i.interval);
                } else {
                    sample = samples["" + i.interval];
                }
                sample.addSeries(i.status, yAxisFunc(i));
            }
        );

        const o: GroupSample[] = [];
        Object.values(samples).forEach(i => o.push(i as GroupSample));

        dbg(o);
        return o;
    }

    toSeries(data: any[], yAxisFunc): Sample[] {
        const o: Sample[] = [];
        data.forEach(i => o.push(new Sample(i.status, yAxisFunc(i))));
        dbg(o);
        return o;
    }
}
