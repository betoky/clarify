import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BalanceService } from '../../services/balance.service';
import { SalaryComponent } from '../../components/transactions/salary/salary.component';
import { DepositComponent } from '../../components/transactions/deposit/deposit.component';
import { WithdralComponent } from '../../components/transactions/withdral/withdral.component';
import { BottomSheetComponent } from '../../models/bottom-sheet';

@Component({
    selector: 'app-bank',
    standalone: true,
    imports: [CurrencyPipe, MatBottomSheetModule, MatButtonModule, MatIconModule, SalaryComponent, DepositComponent],
    templateUrl: './bank.component.html',
    styleUrl: './bank.component.scss'
})
export class BankComponent {
    private balanceService = inject(BalanceService);
    private bottomSheet = inject(MatBottomSheet);

    balance = this.balanceService.balance;

    openSalaryComponent() {
        const salaryComp = this.bottomSheet.open(SalaryComponent);
        this.listenToCloseBottomSheet(salaryComp);
    }

    openDepositComponent() {
        const depositComp = this.bottomSheet.open(DepositComponent);
        this.listenToCloseBottomSheet(depositComp);
    }
    
    openWithdralComponent() {
        const withdralComp = this.bottomSheet.open(WithdralComponent);
        this.listenToCloseBottomSheet(withdralComp);
    }

    private listenToCloseBottomSheet(component: MatBottomSheetRef<BottomSheetComponent, any>) {
        const sub = component.instance.submitted$.subscribe({
            next: () => {
                sub.unsubscribe();
                component.dismiss();
            }
        })
    }

    // recordBankCharges() {
    //     this.operationService.recordBankCharge(27000, new Date(), 'AGIOS 17/07')
    //     .then(async data => {
    //         const newDoc = await this.transactionService.getDoc(data.id);
    //         console.log("++ record successfully", newDoc.data())
    //     })
    // }

    // cardPayment() {
    //     this.operationService.cardPayment(150000, new Date(), 'TPE', undefined, 'Fête de mère à Extra Pizza')
    //     .then(async data => {
    //         const newDoc = await this.transactionService.getDoc(data.id);
    //         console.log("++ card payment successfully", newDoc.data())
    //     })
    // }
}
