import {AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {IpLocatorService} from "../../services/locator/ip-locator.service";
import {BehaviorSubject, catchError, EMPTY, finalize, Observable, ReplaySubject, Subject, switchMap, tap} from "rxjs";
import {IpApiResponse} from "../../services/locator/typings";
import {CommonModule} from "@angular/common";
import {SpinnerComponent} from "../spinner/spinner.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {INVALID_IP_ERROR_KEY} from "./ip.validator";

@Component({
    selector: 'app-ip-input',
    imports: [CommonModule, SpinnerComponent, ReactiveFormsModule],
    templateUrl: 'ip-input.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: 'ip-input.component.scss'
})
export class IpInputComponent implements AfterViewInit, OnDestroy {
    readonly INVALID_IP_ERROR_KEY = INVALID_IP_ERROR_KEY;

    private _countryTime$ = new ReplaySubject<string>(1);
    countryTime$ = this._countryTime$.asObservable();

    private _loading$ = new BehaviorSubject<boolean>(false);
    loading$ = this._loading$.asObservable();

    private _destroyed$ = new Subject<boolean>();
    destroyed$ = this._destroyed$.asObservable();
    countryCode: string;

    @Input() control: FormControl;
    @Input() shakeInputStream: Observable<boolean>;

    @Output() rendered = new EventEmitter<void>();

    constructor(private ipLocatorService: IpLocatorService) {
    }

    requiredError() {
        return this.control.touched &&
            this.control.dirty &&
            this.control.errors?.['required'];
    }

    invalidError() {
        return this.control.touched &&
            this.control.errors?.[this.INVALID_IP_ERROR_KEY];
    }

    ngAfterViewInit() {
        this.rendered.emit();
    }

    ngOnDestroy() {
        this._destroyed$.next(true);
        this._destroyed$.complete();
    }

    onChange(ip: string) {
        if (!this.control.touched) {
            this.control.markAsTouched();
        }

        if (this.control.invalid) {
            return;
        }

        this.getCountryByIp(ip);
    }

    getFlagSrc() {
        return this.ipLocatorService.getFlagSrcUrl(this.countryCode)
    }

    private getCountryByIp(ip: string) {
        this._loading$.next(true);

        this.ipLocatorService.getCountryByIp(ip)
            .pipe(
                tap((ipData: any) => {
                    this.setCountryDetails(ipData);
                }),
                catchError((err: string) => {
                    this.control.setErrors({[this.INVALID_IP_ERROR_KEY]: err});

                    return EMPTY;
                }),
                switchMap(this.setCountryDetails.bind(this)),
                finalize(() => this._loading$.next(false))
            )
            .subscribe()
    }

    private setCountryDetails(ipData: IpApiResponse) {
        this.countryCode = ipData.country_code;

        return this.ipLocatorService.getCountryClockStream(ipData.utc_offset, this.destroyed$)
            .pipe(
                tap((countryClock: string) => {
                    this._countryTime$.next(countryClock);
                    this._loading$.next(false);
                }),
            )
    }
}