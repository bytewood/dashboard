import { Component } from '@angular/core';
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { NgbDateAdapter } from "@ng-bootstrap/ng-bootstrap";
import { NgbDateNativeAdapter } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    providers: [
        {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}
    ]
})
export class DatePickerComponent {

    model = new Date();

    @Output()
    changed: EventEmitter<Date> = new EventEmitter();

    constructor() {
    }

    onChange(date: Date) {
        this.changed.emit(date);
    }
}
