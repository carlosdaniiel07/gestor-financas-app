import { Conta } from './conta.model';
import { Categoria } from './categoria.model';
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
        public categoria: Categoria,
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
        return movto.categoria !== null
    }
}