import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AlltimeGraphComponent} from './alltime-graph.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {FormsModule} from "@angular/forms";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {ApiService} from "../api/api.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {GraphTypesService} from "../graph-types.service";
import {CustomGraphTypesService} from "../custom-graph-types.service";
import {GraphMetadata} from "../metadata/graph-metadata";
import {Aggregate} from "../aggregrate";
import {RangedGraphComponent} from "../ranged-graph/ranged-graph.component";
import { GraphGroupMetadata } from "../metadata/graph-group-metadata";

describe('AlltimeGraphComponent', () => {
    let component: AlltimeGraphComponent;
    let fixture: ComponentFixture<AlltimeGraphComponent>;

    beforeEach(async(() => {
    }));

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AlltimeGraphComponent],
            imports: [
                FormsModule,
                NoopAnimationsModule,
                NgxChartsModule,
                NgbDatepickerModule,
                FontAwesomeModule
            ],
            providers: [
                ApiService,
                HttpClient,
                HttpHandler,
                {provide: GraphTypesService, useClass: CustomGraphTypesService}
            ]
        }).compileComponents();
        const gm = new GraphGroupMetadata("", false, "");
        fixture = TestBed.createComponent(AlltimeGraphComponent);
        component = fixture.componentInstance;
        component.metadata = new GraphMetadata(gm, false, "", Aggregate.count, "days", RangedGraphComponent);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
