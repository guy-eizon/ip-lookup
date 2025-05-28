import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, interval, map, Observable, shareReplay, takeUntil, tap} from "rxjs";
import {IpApiResponse} from "./typings";

@Injectable({
    providedIn: 'root',
})
export class IpLocatorService {

    secondsInterval$ = interval(1000)
        .pipe(
            shareReplay(1)
        );

    constructor(private http: HttpClient) {
    }

    getCountryByIp(ip: string) {
        return this.http.get(`https://ipapi.co/${ip}/json/`)
            .pipe(
                tap((ipData) => {
                    if ((ipData as IpApiResponse).error) {
                        throw (ipData as IpApiResponse).reason;
                    }
                }),
                catchError(() => {
                    throw 'Something went wrong, please try again later';
                })
            );
    }

    getFlagSrcUrl(countryCode: string) {
        return `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`
    }

    getCountryClockStream(rawOffset: string, destroyed$: Observable<boolean>) {
        const offset = this.getCountryTimeOffsetInMillis(rawOffset)

        return this.secondsInterval$
            .pipe(
                takeUntil(destroyed$),
                map(() => {
                    return new Date(Date.now() + offset).toUTCString().split(' ')[4];
                }),
            )
    }

    getCountryTimeOffsetInMillis(rawOffset: string) {
        const offsetSign = rawOffset[0] === '+' ? 1 : -1;
        const hours = +rawOffset.substring(1, 3);
        const minutes = +rawOffset.substring(3, 5);

        return (offsetSign * hours * 60 * 60 * 1000) + (offsetSign * minutes * 60 * 1000);
    }
}
