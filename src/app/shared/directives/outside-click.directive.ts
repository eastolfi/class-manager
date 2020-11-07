import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[cmOutsideClick]'
})
export class OutsideClickDirective {

    @Output()
    public clickOutside = new EventEmitter<void>();

    constructor(private readonly elementRef: ElementRef) { }

    @HostListener('document:click', ['$event.target'])
    public onClick(target: EventTarget) {
        const clickedInside = this.elementRef.nativeElement.contains(target);

        if (!clickedInside) {
            this.clickOutside.next();
        }
    }

}
