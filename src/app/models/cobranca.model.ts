import { Beneficiario } from './beneficiario.model';

import * as moment from 'moment'

export class Cobranca {
    constructor(
        public id: number,
        public descricao: string,
        public parcela: number,
        public dataVencimento: string,
        public dataAgendamento: string,
        public dataPagamento: string,
        public valor: number,
        public juros: number,
        public desconto: number,
        public saldo: number,
        public observacao: string,
        public status: string,

        public beneficiario: Beneficiario
    ) {}

    public static getValorTotal(cobranca: Cobranca): number {
        return cobranca.valor + cobranca.juros - cobranca.desconto
    }

    public static getValorPago(cobranca: Cobranca): number {
        return Cobranca.getValorTotal(cobranca) - cobranca.saldo
    }

    public static isPago(cobranca: Cobranca): boolean {
        return cobranca.saldo === 0
    }

    public static transformStatus(status: string): string {
        switch(status) {
            case 'PENDENTE':
                return 'Pendente'
            case 'AGENDADO':
                return 'Agendado'
            case 'PAGO':
                return 'Pago'
            case 'PAGO_PARCIAL':
                return 'Pago parcialmente'
            default:
                return ''
        }
    }

    public static sortByDataVencimento(a: Cobranca, b: Cobranca): number {
        let aVcto = moment(a.dataVencimento, 'DD/MM/YYYY')
        let bVcto = moment(b.dataVencimento, 'DD/MM/YYYY')

        return aVcto.isBefore(bVcto) ? -1 : 1
    }
}

export const STATUS: {label: string, value: any}[] = [
    { label: Cobranca.transformStatus('PENDENTE'), value: 'PENDENTE' },
    { label: Cobranca.transformStatus('AGENDADO'), value: 'AGENDADO' },
    { label: Cobranca.transformStatus('PAGO'), value: 'PAGO' },
    { label: Cobranca.transformStatus('PAGO_PARCIAL'), value: 'PAGO_PARCIAL' }
]