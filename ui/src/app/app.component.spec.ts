import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BrowserModule } from "@angular/platform-browser";
import { DashboardModule } from "./dashboard/dashboard.module";

describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                DashboardComponent
            ],
            imports: [
                BrowserModule,
                DashboardModule
            ]
        }).compileComponents();

        it('should create the app', async(() => {
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
        }));
        it(`should have as title 'ui'`, async(() => {
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;
            expect(app.title).toEqual('ui');
        }));
    });
});
