import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { TransactionsService } from '../../services/transactions.service';
import { OperationTitlePipe } from '../../pipes/operation-title.pipe';

@Component({
    selector: 'app-transactions',
    standalone: true,
    imports: [CurrencyPipe, DatePipe, OperationTitlePipe],
    templateUrl: './transactions.component.html',
    styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
    private transactionService =  inject(TransactionsService);
    transactions = toSignal(this.transactionService.lastTransactions());
}
