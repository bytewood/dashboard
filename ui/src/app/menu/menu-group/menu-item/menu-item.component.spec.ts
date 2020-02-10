import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemComponent } from './menu-item.component';
import { FormsModule } from "@angular/forms";
import { GraphTypesService } from "../../../graphs/graph-types.service";
import { CustomGraphTypesService } from "../../../graphs/custom-graph-types.service";
import { GraphMetadata } from "../../../graphs/metadata/graph-metadata";
import { Aggregate } from "../../../graphs/aggregrate";
import { RangedGraphComponent } from "../../../graphs/ranged-graph/ranged-graph.component";
import { GraphGroupMetadata } from "../../../graphs/metadata/graph-group-metadata";

describe('MenuItemComponent', () => {
    let component: MenuItemComponent;
    let fixture: ComponentFixture<MenuItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MenuItemComponent
            ],
            imports: [
                FormsModule
            ],
            providers: [
                {provide: GraphTypesService, useClass: CustomGraphTypesService}
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        const gm = new GraphGroupMetadata("", false, "");
        fixture = TestBed.createComponent(MenuItemComponent);
        component = fixture.componentInstance;
        component.metadata = new GraphMetadata(gm, false, "", Aggregate.count, "days", RangedGraphComponent);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
