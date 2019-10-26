import { Conta } from './conta.model';

export class Transferencia {

    constructor(
        public id: number,
        public descricao: string,
        public valor: number,
        public taxa: number,
        public dataInclusao: string,
        public dataContabilizacao: string,
        public observacao: string,
        public status: string,
        public contaOrigem: Conta,
        public contaDestino: Conta
    )
    {}

    public static transformStatus(status: string): string {
        switch(status) {
            case 'EFETIVADO':
                return 'Efetivado'
            case 'AGENDADO':
                return 'Agendado'
            case 'ESTORNADO':
                return 'Estornado'
            default:
                return ''
        }
    }

    public static getValorTotal(transferencia: Transferencia): number {
        return transferencia.valor + transferencia.taxa
    }

    public static isEfetivado(transferencia: Transferencia): boolean {
        return transferencia.status === 'EFETIVADO'
    }

    public static isAgendado(transferencia: Transferencia): boolean {
        return transferencia.status === 'AGENDADO'
    }

    public static isEstornado(transferencia: Transferencia): boolean {
        return transferencia.status === 'ESTORNADO'
    }
}

export const STATUS: {label: string, value: any}[] = [
    { label: Transferencia.transformStatus('EFETIVADO'), value: 'EFETIVADO' },
    { label: Transferencia.transformStatus('AGENDADO'), value: 'AGENDADO' },
    { label: Transferencia.transformStatus('ESTORNADO'), value: 'ESTORNADO' },
]