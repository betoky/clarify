import { Component, inject, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BottomSheetComponent } from '../../../models/bottom-sheet';
import { OperationsService } from '../../../services/operations.service';
import { WithdralType } from '../../../models/transaction';

@Component({
    selector: 'app-withdral',
    standalone: true,
    imports: [MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatIconModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
    templateUrl: './withdral.component.html',
    styleUrl: './withdral.component.scss'
})
export class WithdralComponent implements BottomSheetComponent {
    private operationService = inject(OperationsService);
    private _submitted$ = new Subject<void>();
    submitted$ = this._submitted$.asObservable();
    error = signal<Error | null>(null);
    form = new FormGroup({
        amount: new FormControl<number | null>(null, { validators: [Validators.required] }),
        type: new FormControl<WithdralType>('gab', { nonNullable: true, validators: [Validators.required] }),
        location: new FormControl<string | null>(null, { validators: [Validators.required] }),
        date: new FormControl<Date | null>(null, { validators: [Validators.required] }),
        note: new FormControl<string | null>(null)
    })

    withdraw() {
        if (this.form.valid) {
            const { location, type, amount, date, note } = this.form.value;
            this.operationService.withdrawMoney(amount!, date!, type!, location!, note ?? undefined)
                .then(() => this._submitted$.next())
                .catch((error: any) => {
                    this.error.set(error);
                    this._submitted$.error(error);
                })
        }
    }
}
