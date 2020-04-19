import { Cartao } from './cartao.model';

export class Fatura {
    constructor(
        public id: number,
        public referencia: string,
        public vencimento: string,
        public dataPagamento: string,
        public valor: number,
        public valorPago: number,
        public status: string,
        public cartao: Cartao
    ) { }

    public static transformStatus(faturaStatus: string): string {
        switch (faturaStatus) {
            case 'NAO_FECHADA':
                return 'Não fechada'
            case 'PENDENTE':
                return 'Pendente'
            case 'PAGO':
                return 'Pago'
            case 'PAGO_PARCIAL':
                return 'Pago parcialmente'
            default:
                return ''
        }
    }

    public static isPago(fatura: Fatura): boolean {
        return fatura.status === 'PAGO' || fatura.status === 'PAGO_PARCIAL'
    }
}