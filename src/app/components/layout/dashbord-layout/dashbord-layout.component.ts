import { AfterViewInit, Component, ElementRef, signal, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';


import { HeaderComponent } from '../../header/header.component';

@Component({
    selector: 'app-dashbord-layout',
    standalone: true,
    imports: [HeaderComponent, MatListModule, MatSidenavModule, RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './dashbord-layout.component.html',
    styleUrl: './dashbord-layout.component.scss',
    host: {
        "[style.--container-height]": "containerHeight()"
    }
})
export class DashbordLayoutComponent implements AfterViewInit {
    @ViewChild("header") header?: ElementRef<HTMLDivElement>;
    private containerHeight = signal('auto');

    ngAfterViewInit(): void {
        if (this.header) {
            const h = window.innerHeight - this.header.nativeElement.offsetHeight;
            this.containerHeight.set(h + 'px')
        }
    }
}
