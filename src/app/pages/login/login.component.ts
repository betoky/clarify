import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

interface LoginFormGroup {
    email: FormControl<string | null>,
    password: FormControl<string | null>
}

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterLink
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    form: FormGroup<LoginFormGroup> = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });
    error: string | null = null;
    hidePassword = signal(true);
    private authService = inject(AuthService);

    submit() {
        const { email, password } = this.form.value;
        if (this.form.valid && email && password) {
            this.authService.loginWithEmail(email, password)
                .catch(error => this.handleLoginError(error))
        }
    }

    togglePassword(event: MouseEvent) {
        event.stopPropagation();
        this.hidePassword.set(!this.hidePassword());
    }

    private handleLoginError(error: any) {
        if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found") {
            this.error = "Email ou mots de passe incorrect!"
        } else {
            console.error('++', error)
        }
    }
}
