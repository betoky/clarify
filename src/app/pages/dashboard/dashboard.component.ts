import { Component, OnInit, inject } from '@angular/core';
import { FunctionsService } from '../../services/functions.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
    private functionsService = inject(FunctionsService);

    constructor() {}

    ngOnInit(): void {
        this.functionsService.getFullStatsOfYear(2016)
        .then(({data}) => console.log('++ stats 2016', data))
        .catch(e => console.log('++ e 2016', e))
    }
}
