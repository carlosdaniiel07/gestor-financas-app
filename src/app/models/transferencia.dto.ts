import { Conta } from './conta.model';

export interface TransferenciaDTO {
    descricao: string
    valor: number
    taxa: number
    dataContabilizacao: string
    observacao: string
    status: string
    contaOrigem: Conta
    contaDestino: Conta
}