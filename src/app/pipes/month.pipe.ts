import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'month',
    standalone: true
})
export class MonthPipe implements PipeTransform {
    private months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Dec'];

    transform(mo: number): string {
        return this.months[mo];
    }
}