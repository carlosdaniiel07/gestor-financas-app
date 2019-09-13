import { Fatura } from "./fatura.model"
import { Conta } from './conta.model';

export interface PagamentoFaturaDTO {
    fatura: Fatura
    dataPagamento: string
    conta: Conta
    valorPago: number
}