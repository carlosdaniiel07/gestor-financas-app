import { Cobranca } from './cobranca.model';
import { Conta } from './conta.model';
import { Categoria } from './categoria.model';
import { Subcategoria } from './subcategoria.model';
import { Projeto } from './projeto.model';

export interface CobrancaRemocaoDTO {
    cobranca: Cobranca
    conta: Conta
    categoria: Categoria
    subcategoria: Subcategoria
    projeto: Projeto
}