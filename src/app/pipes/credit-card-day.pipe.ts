import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardDay'
})
export class CreditCardDayPipe implements PipeTransform {

  transform(day: number): string {
    return day.toString().padStart(2, '0')
  }
}
