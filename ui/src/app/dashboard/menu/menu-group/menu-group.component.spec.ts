import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGroupComponent } from './menu-group.component';
import { MenuItemComponent } from "./menu-item/menu-item.component";
import { FormsModule } from "@angular/forms";
import { ItemGroupMetadata } from "../../model/item-group-metadata";

describe('MenuGroupComponent', () => {
    let component: MenuGroupComponent;
    let fixture: ComponentFixture<MenuGroupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MenuGroupComponent,
                MenuItemComponent
            ],
            imports: [
                FormsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuGroupComponent);
        component = fixture.componentInstance;
        component.group = new ItemGroupMetadata("Test Title", false, "Test Name", null);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
