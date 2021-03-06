//import { Investimento } from './investimento.model';

export class ItemInvestimento {
    constructor(
        public id: number,
        public tipo: string,
        public descricao: string,
        public data: string,
        public valor: number,
        public ir: number,
        public iof: number,
        public outrasTaxas: number,
        public rendimento: number,
        //public investimento: Investimento
    ) {}

    public static isAplicacao(item: ItemInvestimento): boolean {
        return item.tipo === 'APLICACAO' || item.tipo === 'REINVESTIMENTO'
    }

    public static getImpostos(item: ItemInvestimento): number {
        return item.ir + item.iof
    }
}