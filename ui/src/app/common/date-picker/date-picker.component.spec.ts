import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DatePickerComponent} from './date-picker.component';
import {NgbDateAdapter} from "@ng-bootstrap/ng-bootstrap";
import {NgbDateNativeAdapter} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";

describe('DatePickerComponent', () => {
    let component: DatePickerComponent;
    let fixture: ComponentFixture<DatePickerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DatePickerComponent],
            imports: [
                FormsModule,
                NgbDatepickerModule
            ],
            providers: [
                {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatePickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
