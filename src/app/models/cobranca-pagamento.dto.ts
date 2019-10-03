import { Cobranca } from './cobranca.model';
import { Conta } from './conta.model';
import { Categoria } from './categoria.model';
import { Subcategoria } from './subcategoria.model';
import { Projeto } from './projeto.model';
import { Fatura } from './fatura.model';

export interface CobrancaPagamentoDTO {
    cobranca: Cobranca
    dataPagamento: string
    conta: Conta
    valorPago: number
    categoria: Categoria
    subcategoria: Subcategoria
    projeto: Projeto
    fatura: Fatura
}