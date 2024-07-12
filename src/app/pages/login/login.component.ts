import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { GoogleSignInComponent } from '../../components/ui/google-sign-in/google-sign-in.component';

interface LoginFormGroup {
    email: FormControl<string | null>,
    password: FormControl<string | null>
}

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        GoogleSignInComponent,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatSnackBarModule,
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
    private snackBar = inject(MatSnackBar)

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

    onSignInWithGoogle() {
        this.authService.loginWithGoogle();
    }

    private handleLoginError(error: any) {
        if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found") {
            this.error = "Email ou mots de passe incorrect!"
        } else if (error.code === "auth/network-request-failed") {
            this.snackBar.open('Problème de connexion!!', 'Fermer', {
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
            })
        } else {
            console.error('++', error)
        }
    }
}
