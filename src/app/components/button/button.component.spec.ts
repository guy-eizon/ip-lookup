import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ButtonComponent} from './button.component';
import {IconType} from "../icon/typings";
import {By} from "@angular/platform-browser";
import {IconComponent} from "../icon/icon.component";

describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ButtonComponent]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ButtonComponent);
            component = fixture.componentInstance;
        });
    });

    describe('when "icon" Input', () => {
        describe(`exists`, () => {
            beforeEach(() => {
                component.icon = IconType.X;
                fixture.detectChanges();
            });

            it('should render icon element', () => {
                assertIconExistence(true);
            });
        });

        describe(`does not exist`, () => {
            beforeEach(() => {
                component.icon = null;
                fixture.detectChanges();
            });

            it('should NOT render icon element', () => {
                assertIconExistence(false);
            });
        });

        function assertIconExistence(exists: boolean) {
            const iconElement = fixture.debugElement.query(By.directive(IconComponent));

            if (exists) {
                expect(iconElement).toBeTruthy();

                return;
            }
            expect(iconElement).toBeFalsy();
        }
    });
});
