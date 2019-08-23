import { Categoria } from './categoria.model';

export interface Subcategoria {
    id: number,
    nome: string,
    editavel: boolean,
    ativo: boolean,
    categoria: Categoria
}