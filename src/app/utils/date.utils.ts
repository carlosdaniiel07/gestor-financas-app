import * as momentjs from 'moment'

export class DateUtils {

    // Converte uma data JSON para o formato 'dd/MM/yyyy'
    public static toApiPattern(jsonDate: string): string {
        if (jsonDate !== null) {
            if(jsonDate.length > 10){
                let split = jsonDate.substring(0, 10).split('-')
                return `${split[2]}/${split[1]}/${split[0]}`
            } else {
                // Caso já esteja no formato dd/MM/yyyy
                return jsonDate
            }
        } else {
            return ''
        }
    }

    // Converte uma data JSON para o formato de referência do cartão de crédito (MMM/yyyy)
    public static getReference(jsonDate: string): string {
        if (jsonDate !== null && jsonDate.length >= 10){
            let ano: string = jsonDate.substring(0, 4)
            let mes: string = jsonDate.substring(5, 7)
            
            return this.getMonthShortNames()[Number.parseInt(mes) - 1] + '/' + ano
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

    /*
        Retorna a representação abreviativa dos meses no formato pt-br. Esse valor de retorno deve ser usado 
        na propriedade 'monthShortNames' do componente ion-datetime
    */
    public static getMonthShortNames(): string[] {
        return [
            'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez' 
        ]
    }

    /**
     * Retorna a data atual no formato JSON
     */
    public static getNowAsJson(): string {
        return new Date().toJSON()
    }

    /**
     * Retorna a data no formato yyyy-mm-dd a partir de uma data composta (ex: 2019-11-09T16:14:16.620-03:00)
     * @param data
     */
    public static getDate(data: string): string {
        return (data !== null && data.length >= 10) ? data.substr(0, 10) : ''
    }
    
    /**
     * Verifica se uma data é passada (inferior a data atual)
     * @param data 
     */
    public static isPassado(data: string): boolean {
        let dataObj = momentjs(this.getDate(data))
        return momentjs().isAfter(dataObj)
    }

    /**
     * Verifica se uma data é futura (superior a data atual)
     * @param data 
     */
    public static isFuturo(data: string): boolean {
        let dataObj = momentjs(this.getDate(data))
        return momentjs().isBefore(dataObj)
    }

    /**
     * Retorna o mês atual no 'formato moment'. O mês de janeiro equivale ao número 0 e dezembro ao número 11
     */
    public static getMomentMonth(): number {
        return momentjs().month()
    }

    /**
     * Retorna o ano atual
     */
    public static getYear(): number {
        return momentjs().year()
    }

    /**
     * Retorna um objeto contendo o 'range' de um mês (primeiro e último dia do mês)
     */
    public static getMonthRange(month: number, year: number):
        {month: number, minDate: string, maxDate: string} {
        if (month === -1){
            month = 11
            year -= 1
        }

        if (month === 12) {
            month = 0
            year += 1
        }

        // Incrementa o mês, já que no MomentJS o mesmo começa com 0
        month += 1

        const minDate = momentjs(`01/${month}/${year}`, 'DD/MM/YYYY')
        const maxDate = momentjs(minDate).endOf('month')

        return {
            month: month,
            minDate: minDate.format('YYYY-MM-DD'),
            maxDate: maxDate.format('YYYY-MM-DD')
        }
    }

    /**
     * Retorna a data atual no formato de milissegundos
     */
    public static getNow(): number {
        return new Date().getTime()
    }
}