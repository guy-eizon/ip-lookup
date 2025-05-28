import {IpLocatorService} from './ip-locator.service';
import {HttpClient} from "@angular/common/http";
import {mockResponse} from "./ip-data.mock";
import {catchError, EMPTY, of, Subject, tap} from "rxjs";

describe('LocatorServiceService', () => {
    let service: IpLocatorService;
    const ipMock = '173.232.232.34'
    const httpMock = {
        get: () => of(mockResponse),
    } as unknown as HttpClient;


    beforeEach(() => {
        service = new IpLocatorService(httpMock);
    });

    describe('getCountryByIp', () => {
        it(`should call "ipapi" API to get ip data`, () => {
            const getSpy = jest.spyOn(httpMock, 'get')

            service.getCountryByIp(ipMock);

            expect(getSpy).toHaveBeenCalledWith(`https://ipapi.co/${ipMock}/json/`);
        });

        it(`should invoke error when having on "error" on response`, (done) => {
            const errorReason = 'Something went wrong, please try again later';
            jest.spyOn(httpMock, 'get').mockReturnValue(of({
                ...mockResponse,
                error: true,
                reason: errorReason
            }))
            try {
                service.getCountryByIp(ipMock)
                    .pipe(
                        catchError((err: string) => {
                            expect(err).toBe(errorReason);
                            done();

                            return EMPTY
                        })
                    ).subscribe();
            } catch (error) {
                expect(error).toBe(true);
            }
        });
    });

    describe('getFlagSrcUrl', () => {
        it(`should call "flagcdn" API to get country flag`, () => {
            const countryCodeMock = 'coUntRyCode';

            expect(service.getFlagSrcUrl(countryCodeMock)).toBe(`https://flagcdn.com/w80/${countryCodeMock.toLowerCase()}.png`);
        })

    });

    describe('getCountryTimeOffsetInMillis', () => {
        it(`should calculate clock for country offset`, (done) => {
            const _destroyed$ = new Subject<boolean>();
            const offset = '+0300';

            const torqUnixInterviewTime = 1748516400000;
            const torqInterviewHour = '14:00:00';

            jest.spyOn(Date, 'now').mockReturnValue(torqUnixInterviewTime);

            service.getCountryClockStream(offset, _destroyed$)
                .pipe(
                    tap((countryClock: string) => {
                        expect(countryClock).toBe(torqInterviewHour);
                        done();
                    })
                )
                .subscribe();
        });
    });
});
