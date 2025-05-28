import {Component, Input} from '@angular/core';
import {IconType} from "./typings";
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-icon',
    templateUrl: 'icon.component.html',
    imports: [
        NgClass,
    ]
})
export class IconComponent {
    @Input() icon: IconType;
    @Input() hoverable = false;
}
