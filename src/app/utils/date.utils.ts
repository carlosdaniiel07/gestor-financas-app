import * as momentjs from 'moment'

export class DateUtils {

    // Converte uma data JSON para o formato 'dd/MM/yyyy'
    public static toApiPattern(jsonDate: string): string {
        if (jsonDate !== null && jsonDate.length >= 10) {
            let split = jsonDate.substring(0, 10).split('-')
            return `${split[2]}/${split[1]}/${split[0]}`
        } else {
            return ''
        }
    }

    /*
        Retorna uma data futura (data atual + 10 anos) no formato yyyy-mm-dd. Esse valor de retorno deve ser usado 
        na propriedade 'max' do componente ion-datetime
    */
    public static getDatePickerMaxDate(): string {
        return momentjs().add('10', 'years').format('YYYY-MM-DD')
    }

    /*
        Retorna a data atual no formato yyyy-mm-dd. Esse valor de retorno deve ser usado 
        na propriedade 'min' do componente ion-datetime
    */
    public static getDatePickerMinDate(): string {
        return momentjs().format('YYYY-MM-DD')
    }
}