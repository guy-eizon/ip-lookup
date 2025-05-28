import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {IpLocatorFormComponent} from './ip-locator-form.component';
import {By} from "@angular/platform-browser";
import {IpInputComponent} from "../../ip-input/ip-input.component";

describe('IpLocatorFormComponent', () => {
    let component: IpLocatorFormComponent;
    let fixture: ComponentFixture<IpLocatorFormComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [IpLocatorFormComponent, IpInputComponent]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(IpLocatorFormComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
    });

    describe('on initialization', () => {
        it('form should have 1 input', () => {
            expect(component.getControl(0)).toBeTruthy();
        });
    })


    describe('interaction', () => {
        describe('when "X" button clicked', () => {
            it(`should close form dialog`, () => {
                const closeEventSpy = jest.spyOn(component.close, 'emit');
                fixture.debugElement.query(By.css('.close-icon')).nativeElement.click();

                expect(closeEventSpy).toHaveBeenCalled();
            });
        })

        describe('when Add button clicked', () => {
            beforeEach(() => {
                jest.spyOn(component, 'newInputRendered').mockImplementation();
            });

            it(`should close form dialog when clicked`, () => {
                const addInputSpy = jest.spyOn(component, 'addInput');
                fixture.debugElement.query(By.css('.add-button')).nativeElement.click();

                expect(addInputSpy).toHaveBeenCalled();
            });

            describe('when addInput functionality', () => {

                it(`should mark all inputs as touched to trigger validation`, () => {
                    expect(component.ipList.touched).toEqual(false);
                    expect(component.ipList.dirty).toEqual(false);

                    component.addInput();

                    expect(component.ipList.touched).toEqual(true);
                    expect(component.ipList.dirty).toEqual(true);
                })

                describe('when an input is invalid', () => {
                    it(`should not allow add new input to form`, () => {
                        expect(component.ipList.length).toEqual(1);
                        component.addInput();

                        expect(component.ipList.length).toEqual(1);
                    });

                    it(`should shake errors on invalid inputs`, fakeAsync(() => {
                        let iteration = 1;

                        component.addInput();

                        component.shakeInvalidInputs$
                            .subscribe((shouldShake) => {
                                if (iteration === 1) {
                                    expect(shouldShake).toBe(true);
                                }

                                if (iteration === 2) {
                                    expect(shouldShake).toBe(false);
                                }

                                iteration++;
                            });
                    }));
                })
            })
        })
    })
});
