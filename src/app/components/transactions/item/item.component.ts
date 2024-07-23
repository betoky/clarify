import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Transaction } from '../../../models/transaction';
import { OperationTitlePipe } from '../../../pipes/operation-title.pipe';
import { MonthPipe } from '../../../pipes/month.pipe';

@Component({
    selector: 'app-transaction-item',
    standalone: true,
    imports: [CurrencyPipe, MatButtonModule, MonthPipe, OperationTitlePipe],
    templateUrl: './item.component.html',
    styleUrl: './item.component.scss'
})
export class TransactionItemComponent {
    @Input({ required: true }) transaction!: Transaction;
    @Output() watch = new EventEmitter<string>();
}
