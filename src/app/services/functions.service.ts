import { Injectable, inject } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { TransactionFire } from '../models/transaction';

@Injectable({
    providedIn: 'root'
})
export class FunctionsService {
    private functions = inject(Functions);

    getFullStatsOfYear = (year: number) => {
        return httpsCallable<number, TransactionFire[]>(this.functions, 'fullStatsOfYear')(year);
    }
}
