export class Categoria {

    constructor(
        public id: number, 
        public nome: string, 
        public tipo: string, 
        public editavel: boolean, 
        public ativo: boolean
    ) {}

    public static isCredito(categoria: Categoria): boolean {
        return categoria.tipo === 'C'
    }
}