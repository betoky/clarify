import { Component, inject, OnInit, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { OperationsService } from '../../../services/operations.service';
import { BottomSheetComponent } from '../../../models/bottom-sheet';

@Component({
    selector: 'app-agios',
    standalone: true,
    imports: [MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatIconModule, MatInputModule, ReactiveFormsModule],
    templateUrl: './agios.component.html',
    styleUrl: './agios.component.scss'
})
export class AgiosComponent implements OnInit, BottomSheetComponent {
    private operationService = inject(OperationsService);
    private _submitted$ = new Subject<void>();
    submitted$ = this._submitted$.asObservable();
    error = signal<Error | null>(null);
    form = new FormGroup({
        amount: new FormControl<number | null>(null, { validators: [Validators.required] }),
        bank: new FormControl<string | null>(null, { validators: [Validators.required] }),
        date: new FormControl<Date | null>(null, { validators: [Validators.required] }),
        remember: new FormControl(false)
    })

    ngOnInit(): void {
        const savedInfo = localStorage.getItem('ag');
        if (savedInfo) {
            const salaryInfo = JSON.parse(savedInfo);
            this.form.patchValue(salaryInfo);
        }
    }

    onSubmit() {
        if (this.form.valid) {
            const {amount, bank, date, remember} = this.form.value;
            if (remember) {
                localStorage.setItem('ag', JSON.stringify({amount, bank, remember}));
            } else {
                localStorage.removeItem('ag');
            }
            const note = `AGIOS ${bank} ${date!.getDate()}/${date!.getMonth() + 1}/${date!.getFullYear()}`;
            this.operationService.recordBankCharge(amount!, date!, 'AGIOS', note)
            .then(() => this._submitted$.next())
            .catch((error: any) => {
                this.error.set(error);
                this._submitted$.error(error);
            })
        }
    }
}
