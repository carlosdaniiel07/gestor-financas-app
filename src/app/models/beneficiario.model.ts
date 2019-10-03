export class Beneficiario {
    constructor(
        public id: number,
        public nome: string,
        public banco: string,
        public agencia: string,
        public conta: string,
        public limite: number,
        public observacao: string,
        public ativo: boolean
    ){}

    public static hasBanco(beneficiario: Beneficiario): boolean {
        return beneficiario.banco !== ''
    }

    public static hasAgencia(beneficiario: Beneficiario): boolean {
        return beneficiario.agencia !== ''
    }

    public static hasConta(beneficiario: Beneficiario): boolean {
        return beneficiario.conta !== ''
    }
}