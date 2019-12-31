import { ModalidadeInvestimento } from './modalidade-investimento.model';
import { Corretora } from './corretora.model';
import { ItemInvestimento } from './item-investimento.model';

export class Investimento {
    constructor(
        public id: number,
        public descricao: string,
        public tipo: string,
        public dataAplicacao: string,
        public dataReinvestimento: string,
        public dataResgate: string,
        public dataVencimento: string,
        public modalidade: ModalidadeInvestimento,
        public corretora: Corretora,
        public itens: ItemInvestimento[],
        public valorAplicado: number,
        public valorAtual: number,
        public valorResgatado: number,
        public obs: string
    ) {}

    public static getRendimentoAtual(investimento: Investimento): number {
        return investimento.itens !== null && investimento.itens.length > 0 ? investimento.itens.map((x: ItemInvestimento) => x.rendimento).reduce((acumulado, atual) => acumulado + atual) : 0
    }

    public static hasResgate(investimento: Investimento): boolean {
        return investimento.dataResgate !== null && investimento.valorResgatado !== 0
    }

    public static transformStatus(value: string): string {
        if(value === 'RENDA_FIXA') {
            return 'Renda fixa'
        } else if (value === 'RENDA_VARIAVEL') {
            return 'Renda variável'
        } else {
            return ''
        }
    }
}

export const TIPO_INVESTIMENTO: {label: string, value: any}[] = [
    { label: Investimento.transformStatus('RENDA_FIXA'), value: 'RENDA_FIXA' },
    { label: Investimento.transformStatus('RENDA_VARIAVEL'), value: 'RENDA_VARIAVEL' }
]