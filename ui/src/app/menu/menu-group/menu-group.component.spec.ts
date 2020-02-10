import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGroupComponent } from './menu-group.component';
import { MenuItemComponent } from "./menu-item/menu-item.component";
import { FormsModule } from "@angular/forms";
import { GraphGroupMetadata } from "../../graphs/metadata/graph-group-metadata";

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
        component.groupMetadata = new GraphGroupMetadata("Test Title", false, "Test Name");
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
