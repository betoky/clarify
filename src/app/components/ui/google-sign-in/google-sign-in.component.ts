import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatRippleModule} from '@angular/material/core';


@Component({
    selector: 'google-sign-in',
    standalone: true,
    imports: [MatRippleModule],
    templateUrl: './google-sign-in.component.html',
    styleUrl: './google-sign-in.component.scss'
})
export class GoogleSignInComponent {
    @Input() disabled = false;
    @Output() click = new EventEmitter<MouseEvent>();

    onClick($event: MouseEvent) {
        this.click.emit($event);
    }
}
