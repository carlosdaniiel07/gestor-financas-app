import { Conta } from './conta.model';
import { Categoria } from './categoria.model';
import { Subcategoria } from './subcategoria.model';
import { Projeto } from './projeto.model';
import { Fatura } from './fatura.model';

export interface MovimentoDTO {
    descricao: string
    tipo: string
    dataContabilizacao: string
    valor: number
    acrescimo: number
    decrescimo: number
    status: string
    observacao: string

    conta: Conta
    categoria: Categoria
    subcategoria: Subcategoria
    projeto: Projeto
    fatura: Fatura
}