import { Component, inject } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { SalaryComponent } from '../salary/salary.component';
import { DepositComponent } from '../deposit/deposit.component';
import { WithdralComponent } from '../withdral/withdral.component';
import { AgiosComponent } from '../agios/agios.component';
import { CreditCardComponent } from '../credit-card/credit-card.component';
import { BottomSheetComponent } from '../../../models/bottom-sheet';

@Component({
    selector: 'app-transaction-register',
    standalone: true,
    imports: [MatButtonModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class TransactionRegisterComponent {
    private bottomSheet = inject(MatBottomSheet);


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

    openAGIOSComponent() {
        const agiosComp = this.bottomSheet.open(AgiosComponent);
        this.listenToCloseBottomSheet(agiosComp);
    }

    openCreditCardComponent() {
        const creditCardComp = this.bottomSheet.open(CreditCardComponent);
        this.listenToCloseBottomSheet(creditCardComp);
    }

    private listenToCloseBottomSheet(component: MatBottomSheetRef<BottomSheetComponent, any>) {
        const sub = component.instance.submitted$.subscribe({
            next: () => {
                sub.unsubscribe();
                component.dismiss();
            }
        })
    }

    // cardPayment() {
    //     this.operationService.cardPayment(150000, new Date(), 'TPE', undefined, 'Fête de mère à Extra Pizza')
    //     .then(async data => {
    //         const newDoc = await this.transactionService.getDoc(data.id);
    //         console.log("++ card payment successfully", newDoc.data())
    //     })
    // }
}
