import { TipoConta } from './tipo-conta.model';

export interface ContaDTO {
    nome: string,
    banco: string,
    agencia: string,
    conta: string,
    saldoInicial: number,
    tipo: TipoConta
}