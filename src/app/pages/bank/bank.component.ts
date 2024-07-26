import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

import { environment } from '../../../environments/environment';
import { DummyService } from '../../services/dummy.service';

import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { BalanceService } from '../../services/balance.service';
import { OperationTitlePipe } from '../../pipes/operation-title.pipe';
import { TransactionsService } from '../../services/transactions.service';
import { TransactionRegisterComponent } from '../../components/transactions/register/register.component';
import { TransactionItemComponent } from '../../components/transactions/item/item.component';
import { Transaction } from '../../models/transaction';
import { TransactionListComponent } from '../../components/transactions/list/list.component';

@Component({
    selector: 'app-bank',
    standalone: true,
    imports: [
        CurrencyPipe,
        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        OperationTitlePipe,
        ReactiveFormsModule,
        TransactionItemComponent,
        TransactionListComponent,
        TransactionRegisterComponent
    ],
    templateUrl: './bank.component.html',
    styleUrl: './bank.component.scss'
})
export class BankComponent implements OnInit {
    private balanceService = inject(BalanceService);
    private transactionService = inject(TransactionsService);
    private dummyService = inject(DummyService);

    readonly isLocalMode = environment.runningMode === 'local';
    balance = this.balanceService.balance;
    listMode: 'last' | 'all' = 'last';
    lastTransactions = toSignal(this.transactionService.lastTransactions());

    readonly range = new FormGroup({
        start: new FormControl<Date>(new Date()),
        end: new FormControl<Date >(new Date()),
    });

    ngOnInit(): void {
        this.transactionService.getTransactionByOperation('withdral')
        // .then(data => console.log(data.data()))
    }

    onFilter() {
        // console.log('++ Range', this.range.value);
    }
    toggleListMode() {
        this.listMode = this.listMode === 'last' ? 'all' : 'last';
    }
    generateFakeTransactions() {
        this.dummyService.generateTransactions(50).then(data => {
            data.forEach(doc => {
                console.log("++ Transaction generated", doc.id);
            })
        })
    }
}
