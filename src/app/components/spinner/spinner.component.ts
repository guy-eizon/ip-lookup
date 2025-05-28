import {Component, HostBinding, Input} from '@angular/core';

@Component({
    selector: 'app-spinner',
    template: '',
    styleUrl: 'spinner.component.scss'
})
export class SpinnerComponent {
    @Input() dimension: number;

    @HostBinding('style.width') get width() {
        return `${this.dimension}px`;
    }

    @HostBinding('style.height') get height() {
        return `${this.dimension}px`;
    }
}
