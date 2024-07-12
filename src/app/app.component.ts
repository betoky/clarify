import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ RouterOutlet, MatProgressSpinnerModule ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    isLoading = this.authService.loadForAuthenticatedUser;

    constructor(private authService: AuthService) {
        if (!environment.production) {
            console.debug("Clarify is running in " + environment.runningMode + " mode.")
        }
    }
}
