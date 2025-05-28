import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const INVALID_IP_ERROR_KEY = 'invalidIp'

export function ipValidator(): ValidatorFn {
    const validIpRegex =
        /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;

    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) {
            return null;
        }

        return validIpRegex.test(value) ? null : {[INVALID_IP_ERROR_KEY]: 'Invalid IP address'};
    };
}
