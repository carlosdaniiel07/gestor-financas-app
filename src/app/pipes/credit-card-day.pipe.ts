import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardDay'
})
export class CreditCardDayPipe implements PipeTransform {

  transform(day: number): string {
    let dayAsString: string = day.toString()
    return (dayAsString.length === 2) ? dayAsString : `0${dayAsString}`
  }
}
