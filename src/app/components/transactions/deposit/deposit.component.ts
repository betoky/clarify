import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { OperationsService } from '../../../services/operations.service';
import { BottomSheetComponent } from '../../../models/bottom-sheet';

@Component({
    selector: 'app-deposit',
    standalone: true,
    imports: [MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatIconModule, MatInputModule, ReactiveFormsModule],
    templateUrl: './deposit.component.html',
    styleUrl: './deposit.component.scss'
})
export class DepositComponent implements BottomSheetComponent {
    private operationService = inject(OperationsService);
    private _submitted$ = new Subject<void>();
    submitted$ = this._submitted$.asObservable();
    error = signal<Error | null>(null);
    form = new FormGroup({
        amount: new FormControl<number | null>(null, { validators: [Validators.required] }),
        agency: new FormControl<string | null>(null, { validators: [Validators.required] }),
        date: new FormControl<Date | null>(null, { validators: [Validators.required] }),
        note: new FormControl<string | null>(null)
    })

    deposit() {
        if (this.form.valid) {
            const { agency, amount, date, note } = this.form.value;
            this.operationService.depositMoney(amount!, date!, agency!, note ?? undefined)
                .then(() => this._submitted$.next())
                .catch((error: any) => {
                    this.error.set(error);
                    this._submitted$.error(error);
                })
        }
    }
}
