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

    describe(`"clickable" @Input`, () => {
        const clickableClass = 'clickable';

        it(`should have 'clickable' when "true"`, () => {
            component.clickable = true;
            fixture.detectChanges();

            expect(hasClassOnIconElement(clickableClass)).toBe(true);
        });

        it(`should NOT have 'clickable' when "false"`, () => {
            component.clickable = false;
            fixture.detectChanges();

            expect(hasClassOnIconElement(clickableClass)).toBe(false);
        });

    });

    function hasClassOnIconElement(className) {
        return fixture.debugElement.query(By.css('i')).classes[className] || false;
    }
});
