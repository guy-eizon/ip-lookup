import {Component, HostBinding, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ButtonTheme} from "./typings";
import {IconComponent} from "../icon/icon.component";
import {IconType} from "../icon/typings";

@Component({
    selector: 'app-button',
    imports: [CommonModule, IconComponent],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss'
})
export class ButtonComponent {
    @Input() icon: IconType;

    @Input()
    @HostBinding('class') theme: ButtonTheme;

    @HostBinding('class.hoverable') hoverable = true;
}
