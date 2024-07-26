import { inject, Pipe, PipeTransform } from '@angular/core';
import { OperationName } from '../models/transaction';
import { TransactionsService } from '../services/transactions.service';

@Pipe({
    name: 'operationTitle',
    standalone: true
})
export class OperationTitlePipe implements PipeTransform {
    private transactionService = inject(TransactionsService);

    transform(name: OperationName): string {
        return this.transactionService.operations()?.find(operation => operation.name === name)?.title ?? name;
    }

}
