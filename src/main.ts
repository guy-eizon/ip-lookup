import {Component} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {IpLocatorFormComponent} from "./app/components/ip-locator-form/ip-locator-form/ip-locator-form.component";
import {IpLocatorService} from "./app/services/locator/ip-locator.service";
import {provideHttpClient} from "@angular/common/http";
import {ButtonComponent} from "./app/components/button/button.component";
import {NgIf} from "@angular/common";
import {ButtonTheme} from "./app/components/button/typings";

@Component({
    selector: 'app-root',
    imports: [
        IpLocatorFormComponent,
        ButtonComponent,
        NgIf
    ],
    styles: [':host {position: relative}'],
    template: `
        <app-button [theme]="ButtonTheme.Gray"
                    (click)="openIpLocator()">
            IP Lookup
        </app-button>
        <app-ip-locator-form *ngIf="dialogMode" (close)="closeIpLocator()">
        </app-ip-locator-form>
    `,
})
export class App {
    readonly ButtonTheme = ButtonTheme;

    dialogMode = false;

    openIpLocator() {
        this.dialogMode = true;
    }

    closeIpLocator() {
        this.dialogMode = false;
    }

}

bootstrapApplication(
    App,
    {
        providers: [
            IpLocatorService,
            provideHttpClient()
        ],
    }
);
