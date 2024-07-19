import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { OperationsService } from '../../services/operations.service';
import { BottomSheetComponent } from '../../models/bottom-sheet';

@Component({
    selector: 'app-salary',
    standalone: true,
    imports: [MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatIconModule, MatInputModule, ReactiveFormsModule],
    templateUrl: './salary.component.html',
    styleUrl: './salary.component.scss'
})
export class SalaryComponent implements OnInit, BottomSheetComponent {
    private operationService = inject(OperationsService);
    private _submitted$ = new Subject<void>();
    submitted$ = this._submitted$.asObservable();
    error = signal<Error|null>(null);
    form = new FormGroup({
        amount: new FormControl<number | null>(null, { validators: [Validators.required] }),
        company: new FormControl<string | null>(null, { validators: [Validators.required] }),
        date: new FormControl<Date | null>(null, { validators: [Validators.required] }),
        note: new FormControl<string | null>(null),
        remember: new FormControl(false)
    })

    ngOnInit(): void {
        const savedInfo = localStorage.getItem('salaryInfo');
        if (savedInfo) {
            const salaryInfo = JSON.parse(savedInfo);
            this.form.patchValue(salaryInfo);
        }
    }

    onSubmit() {
        if (this.form.valid) {
            const {amount, company, date, note, remember} = this.form.value;
            if (remember) {
                localStorage.setItem('salaryInfo', JSON.stringify({amount, company, remember}));
            } else {
                localStorage.removeItem('salaryInfo');
            }
            this.operationService.saveSalary(amount!, date!, company!, note ?? undefined)
            .then(() => this._submitted$.next())
            .catch((error: any) => {
                this.error.set(error);
                this._submitted$.error(error);
            })
        }
    }
}
