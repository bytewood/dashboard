import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemComponent } from './menu-item.component';
import { FormsModule } from "@angular/forms";
import { ItemMetadata } from "../../../model/item-metadata";

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
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuItemComponent);
        component = fixture.componentInstance;
        component.item = new ItemMetadata(false, "Test Title", undefined, "Test Group", "Test Type");
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
