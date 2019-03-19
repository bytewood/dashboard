import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { MenuGroupComponent } from "./menu-group/menu-group.component";
import { MenuItemComponent } from "./menu-group/menu-item/menu-item.component";
import { FormsModule } from "@angular/forms";
import { DashboardMetadata } from "../model/dashboard-metadata.service";
import { ItemGroupMetadata } from "../model/item-group-metadata";

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
                {provide: DashboardMetadata, useClass: TestGraphTypes}
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

class TestGraphTypes extends DashboardMetadata {
    constructor() {
        super([] as ItemGroupMetadata[]);
    }
}


