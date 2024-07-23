import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BalanceService } from '../../services/balance.service';
import { TransactionsService } from '../../services/transactions.service';
import { OperationTitlePipe } from '../../pipes/operation-title.pipe';
import { TransactionRegisterComponent } from '../../components/transactions/register/register.component';
import { TransactionItemComponent } from '../../components/transactions/item/item.component';

@Component({
    selector: 'app-bank',
    standalone: true,
    imports: [
        CurrencyPipe,
        MatButtonModule,
        MatIconModule,
        OperationTitlePipe,
        TransactionItemComponent,
        TransactionRegisterComponent
    ],
    templateUrl: './bank.component.html',
    styleUrl: './bank.component.scss'
})
export class BankComponent implements OnInit, OnDestroy {
    private balanceService = inject(BalanceService);
    private transactionService = inject(TransactionsService);

    balance = this.balanceService.balance;
    lastTransactions = toSignal(this.transactionService.lastTransactions())

    constructor() {}

    ngOnInit(): void {}

    ngOnDestroy(): void {}
}
