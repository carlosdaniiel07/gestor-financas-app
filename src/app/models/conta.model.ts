import { TipoConta } from './tipo-conta.model';

export interface Conta {
    id: number,
    nome: string,
    banco: string,
    agencia: string,
    conta: string,
    saldoInicial: number,
    saldo: number,
    compoemSaldo: boolean,
    ativo: boolean,
    tipo: TipoConta
}