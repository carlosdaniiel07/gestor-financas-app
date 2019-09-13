export class Cartao {
    constructor(
        public id: number,
        public nome: string,
        public bandeira: string,
        public diaFechamento: number,
        public diaPagamento: number,
        public limite: number,
        public ativo: boolean
    ) {}
}