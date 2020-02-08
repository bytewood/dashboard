import {Component, OnInit} from '@angular/core';
import {DashboardItemMetadata} from "./dashboard-item-metadata";

@Component({
    selector: 'app-item',
    template: '',
    styles: []
})
export abstract class DashboardItemComponent implements OnInit {
    private readonly RESTORE_ICON = ['far', 'window-restore'];
    private readonly MINIMIZE_ICON = ['far', 'window-minimize'];
    private readonly MAXIMIZE_ICON = ['far', 'window-maximize'];
    private readonly CLOSE_ICON = ['far', 'window-close'];

    private _maximized = false;

    protected cardWidth = window.innerWidth / 3;
    protected cardHeight = this.cardWidth / 1.618;

    data: any;
    metadata: DashboardItemMetadata;

    closeIcon = this.CLOSE_ICON;
    minimizeIcon = this.MINIMIZE_ICON;
    resizeIcon = this.MAXIMIZE_ICON;

    previousView = [];
    view = [];

    protected constructor() {
    }

    onResize() {
        if (this._maximized) {
            this._maximized = false;
            this.resizeIcon = this.MAXIMIZE_ICON;
            this.view = this.previousView;
        } else {
            this._maximized = true;
            this.resizeIcon = this.RESTORE_ICON;
            this.previousView = this.view;
            this.view = [window.innerWidth - 84, this.cardHeight];
        }
    }

    ngOnInit(): void {
        this.previousView = this.view = [this.cardWidth, this.cardHeight];
    }
}
