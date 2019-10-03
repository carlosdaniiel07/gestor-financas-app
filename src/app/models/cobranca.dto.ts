import { Beneficiario } from './beneficiario.model';

export interface CobrancaDTO {
    descricao: string
    parcela: number
    dataVencimento: string
    valor: number
    juros: number
    desconto: number
    observacao: string
    beneficiario: Beneficiario
}