import {IconComponent} from './icon.component';
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {IconType} from "./typings";
import {By} from "@angular/platform-browser";

describe('IconComponent', () => {
    let component: IconComponent;
    let fixture: ComponentFixture<IconComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [IconComponent]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(IconComponent);
            component = fixture.componentInstance;
        });
    });

    it(`icon @Input value should be set as class`, () => {
        component.icon = IconType.PLUS
        fixture.detectChanges();

        expect(hasClassOnIconElement(IconType.PLUS)).toBe(true);
    });

    describe(`"hoverable" @Input`, () => {
        const hoverableClass = 'hoverable';

        it(`should have 'hoverable' when "true"`, () => {
            component.hoverable = true;
            fixture.detectChanges();

            expect(hasClassOnIconElement(hoverableClass)).toBe(true);
        });

        it(`should NOT have 'hoverable' when "false"`, () => {
            component.hoverable = false;
            fixture.detectChanges();

            expect(hasClassOnIconElement(hoverableClass)).toBe(false);
        });

    });

    function hasClassOnIconElement(className) {
        return fixture.debugElement.query(By.css('i')).classes[className] || false;
    }
});
