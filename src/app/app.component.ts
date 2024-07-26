import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, take } from 'rxjs/operators';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, MatProgressSpinnerModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    private authService = inject(AuthService);
    isLoading = toSignal(this.authService.isLoggedIn$.pipe(take(1), map(() => false)), { initialValue: true });


    constructor() {
        if (!environment.production) {
            console.debug("Clarify is running in " + environment.runningMode + " mode.")
        }
    }
}
