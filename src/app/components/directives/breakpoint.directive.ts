import { Directive, EventEmitter, OnInit, Output } from '@angular/core';

export type BreakpointName = 'xs' | 'sm' | 'md' | 'lg' | 'lg' | 'xl' | 'xxl';

@Directive({
    standalone: true,
    selector: '[appBreakpoint]',
    host: {
        "(window:resize)": "onResize($event.target.innerWidth)"
    }
})
export class BreakpointDirective implements OnInit {

    @Output() breakpointChange = new EventEmitter<BreakpointName>();

    private currentBreakPoint?: BreakpointName;

    private breakpoints: {[key in BreakpointName]: number} = {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1400
    };

    private breakpointsArray = Object.keys(this.breakpoints).reverse() as BreakpointName[];

    ngOnInit() {
        this.currentBreakPoint = this.getBreakpointNameOf(window.innerWidth);
    }

    onResize(width: number) {
        const breakpoint = this.getBreakpointNameOf(width);

        if (this.currentBreakPoint !== breakpoint) {
            this.breakpointChange.emit(breakpoint);
            this.currentBreakPoint = breakpoint;
        }
    }

    
    getBreakpointNameOf(width: number): BreakpointName {
        const breakpoint = this.breakpointsArray.find(key => width >= this.breakpoints[key]);
        return breakpoint || 'xs';
    }
}
