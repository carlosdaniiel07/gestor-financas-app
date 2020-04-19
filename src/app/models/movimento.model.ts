import { Conta } from './conta.model';
import { Subcategoria } from './subcategoria.model';
import { Projeto } from './projeto.model';
import { Fatura } from './fatura.model';
import { Categoria } from './categoria.model';

import * as moment from 'moment'
import { Cobranca } from './cobranca.model';

export class Movimento {
    constructor(
        public id: number,
        public descricao: string,
        public tipo: string,
        public dataInclusao: string,
        public dataContabilizacao: string,
        public valor: number,
        public valorTotal: number,
        public acrescimo: number,
        public decrescimo: number,
        public status: string,
        public observacao: string,
        public conta: Conta,
        public categoria: Categoria,
        public subcategoria: Subcategoria,
        public projeto: Projeto,
        public fatura: Fatura,
        public origem: string = null
    ) {}

    public static isCredito(movto: Movimento): boolean {
        return movto.tipo === 'C'
    }

    public static isEfetivado(movto: Movimento): boolean {
        return movto.status === 'EFETIVADO'
    }

    /**
     * Verifica se o movimento foi originado de uma cobrança
     * @param movto 
     */
    public static isCobranca(movto: Movimento): boolean {
        return movto.origem === Cobranca.ORIGEM
    }

    public static hasCartaoCredito(movto: Movimento): boolean {
        return movto.fatura !== null
    }

    public static hasCategoria(movto: Movimento): boolean {
        return movto.categoria !== null
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

    public static getStatusValueByLabel(label: string): string {
        let value: string = ''
        
        STATUS.forEach((item: {label: string, value: any}) => {
            if (item.label === label){
                value = item.value
            }
        })
        
        return value
    }

    public static getValorTotal(movto: Movimento): number {
        return movto.valor + movto.acrescimo - movto.decrescimo
    }

    /**
     * Compara dois objetos do tipo 'Movimento' e retorna o mais recente (se baseia na data de contabilização)
     * @param a 
     * @param b 
     */
    public static sortByDataContabilizacaoDesc(a: Movimento, b: Movimento): number {
        let aData = moment(a.dataContabilizacao, "DD/MM/YYYY")
        let bData = moment(b.dataContabilizacao, "DD/MM/YYYY")

        return aData.isAfter(bData) ? -1 : 1
    }
}

export const STATUS: {label: string, value: any}[] = [
    { label: Movimento.transformStatus('EFETIVADO'), value: 'EFETIVADO' },
    { label: Movimento.transformStatus('PENDENTE'), value: 'PENDENTE' },
    { label: Movimento.transformStatus('AGENDADO'), value: 'AGENDADO' },
]