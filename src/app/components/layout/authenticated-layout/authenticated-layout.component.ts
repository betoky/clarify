import { AfterViewInit, Component, ElementRef, signal, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { HeaderComponent } from '../../header/header.component';
import { BreakpointDirective } from '../../directives/breakpoint.directive';

@Component({
    selector: 'app-authenticated-layout',
    standalone: true,
    imports: [BreakpointDirective, HeaderComponent, MatIconModule, MatListModule, MatSidenavModule, RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './authenticated-layout.component.html',
    styleUrl: './authenticated-layout.component.scss',
    host: {
        "[style.--container-height]": "containerHeight()"
    }
})
export class AuthenticatedLayoutComponent implements AfterViewInit {
    @ViewChild("header") header?: ElementRef<HTMLDivElement>;
    private containerHeight = signal('auto');

    ngAfterViewInit(): void {
        this.calculMainContentSize();
    }
    
    onBreakPointChange() {
        this.calculMainContentSize();
    }

    private calculMainContentSize() {
        if (this.header) {
            const h = window.innerHeight - this.header.nativeElement.offsetHeight;
            this.containerHeight.set(h + 'px')
        }
    }
}
