import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {IpInputComponent} from "../../ip-input/ip-input.component";
import {CommonModule} from "@angular/common";
import {ButtonComponent} from "../../button/button.component";
import {ButtonTheme} from "../../button/typings";
import {IconComponent} from "../../icon/icon.component";
import {IconType} from "../../icon/typings";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ReplaySubject} from "rxjs";
import {ipValidator} from "../../ip-input/ip.validator";

@Component({
    selector: 'app-ip-locator-form',
    imports: [IpInputComponent, CommonModule, ButtonComponent, IconComponent, ReactiveFormsModule],
    templateUrl: 'ip-locator-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: 'ip-locator-form.component.scss'
})
export class IpLocatorFormComponent {
    readonly shakeAnimationTransitionTime = 500;
    readonly ButtonTheme = ButtonTheme;
    readonly IconType = IconType;

    private _shakeInvalidInputs$ = new ReplaySubject<boolean>(1);
    shakeInvalidInputs$ = this._shakeInvalidInputs$.asObservable();

    form = new FormGroup({
        ips: new FormArray([this.populateNewInput()])
    });

    get ipList() {
        return this.form.get('ips') as FormArray;
    }

    @Output() close = new EventEmitter<void>();

    addInput() {
        this.ipList.markAllAsTouched();
        this.markAllAsDirty();

        if (this.ipList.invalid) {
            this._shakeInvalidInputs$.next(true);
            setTimeout(() => this._shakeInvalidInputs$.next(false), this.shakeAnimationTransitionTime);
            this.newInputRendered(this.getTopInvalidInputIndex());

            return;
        }

        this.addIpToList();
    }

    getControl(index: number) {
        return this.ipList.at(index) as FormControl;
    }

    addIpToList() {
        this.ipList.push(this.populateNewInput());
    }

    newInputRendered(index: number) {
        const inputElement = document.getElementById(this.getInputId(index));

        inputElement.scrollIntoView({behavior: 'smooth'});
        inputElement.querySelector('input').focus();
    }

    onValidInput(index: number) {
        if (this.ipList.controls.length - 1 !== index) {
            return;
        }

        this.addInput();
    }

    getInputId(index: number) {
        return `input-${index}`;
    }

    private populateNewInput() {
        return new FormControl('', [Validators.required, ipValidator()]);
    }

    private getTopInvalidInputIndex() {
        const index = this.ipList.controls.findIndex(control => control.invalid);

        return index !== -1 ? index : null;
    }

    private markAllAsDirty() {
        Object.values(this.ipList.controls).forEach(childControl =>
            childControl.markAsDirty()
        );
    }
}
