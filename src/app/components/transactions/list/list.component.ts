import { Component, inject, OnInit } from '@angular/core';
import { TransactionsService } from '../../../services/transactions.service';

@Component({
    selector: 'app-transaction-list',
    standalone: true,
    imports: [],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss'
})
export class TransactionListComponent implements OnInit {
    private transactionService = inject(TransactionsService);
    totalItem?: number;

    ngOnInit(): void {
        this.transactionService.getTotalNumber().then(value => this.totalItem = value);
        this.transactionService.getTransactions()
        .then(data => console.log('++ ASC', data.map(d => d.date.toDateString())))
        this.transactionService.getTransactions({sortby: 'DESC'})
        .then(data => console.log('++ DESC', data.map(d => d.date.toDateString())))
        this.transactionService.getTransactions({max: 51, sortby: 'DESC'})
        .then(data => console.log('++ ALL', data.map(d => d.date.toDateString())))
    }

}
