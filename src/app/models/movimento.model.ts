import { Conta } from './conta.model';
import { Subcategoria } from './subcategoria.model';
import { Projeto } from './projeto.model';
import { Fatura } from './fatura.model';

export class Movimento {
    constructor(
        public id: number,
        public descricao: string,
        public tipo: string,
        public dataInclusao: string,
        public dataContabilizacao: string,
        public valor: number,
        public acrescimo: number,
        public decrescimo: number,
        public status: string,
        public observacao: string,
        public conta: Conta,
        public subcategoria: Subcategoria,
        public projeto: Projeto,
        public fatura: Fatura
    ) {}

    public static isCredito(movto: Movimento): boolean {
        return movto.tipo === 'C'
    }

    public static isEfetivado(movto: Movimento): boolean {
        return movto.status === 'EFETIVADO'
    }

    public static hasCartaoCredito(movto: Movimento): boolean {
        return movto.fatura !== null
    }

    public static hasCategoria(movto: Movimento): boolean {
        return movto.subcategoria !== null
    }

    public static hasConta(movto: Movimento): boolean {
        return movto.conta !== null
    }

    public static transformStatus(status: string): string {
        switch(status) {
            case 'EFETIVADO':
                return 'Efetivado'
            case 'PENDENTE':
                return 'Pendente'
            case 'AGENDADO':
                return 'Agendado'
            default:
                return ''
        }
    }
}

export const STATUS: {label: string, value: any}[] = [
    { label: Movimento.transformStatus('EFETIVADO'), value: 'EFETIVADO' },
    { label: Movimento.transformStatus('PENDENTE'), value: 'PENDENTE' },
    { label: Movimento.transformStatus('AGENDADO'), value: 'AGENDADO' },
]