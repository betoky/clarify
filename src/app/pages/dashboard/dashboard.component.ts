import { Component, inject } from '@angular/core';
import { FunctionsService } from '../../services/functions.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    private functionsService = inject(FunctionsService);

    constructor() {
        this.functionsService.sayHello('Toky')
        .then(() => {
            console.log('++ Terminé');
        })
    }
}
