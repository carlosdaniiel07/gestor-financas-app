export interface Corretora {
    id: number,
    nome: string,
    banco: string,
    agencia: string,
    conta: string,
    valorAplicado: number,
    rendimentoTotal: number,
    ativo: boolean
}