import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuComponent} from './menu.component';
import {MenuGroupComponent} from "./menu-group/menu-group.component";
import {MenuItemComponent} from "./menu-group/menu-item/menu-item.component";
import {FormsModule} from "@angular/forms";
import {GraphTypesService} from "../graphs/graph-types.service";
import {CustomGraphTypesService} from "../graphs/custom-graph-types.service";

describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MenuComponent,
                MenuGroupComponent,
                MenuItemComponent
            ],
            imports: [
                FormsModule
            ],
            providers: [
                {provide: GraphTypesService, useClass: CustomGraphTypesService}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});



