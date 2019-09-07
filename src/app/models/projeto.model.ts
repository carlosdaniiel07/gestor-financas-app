export class Projeto {
    constructor(
        public id: number,
        public nome: string,
        public dataInicial: string,
        public dataFinal: string,
        public status: string,
        public orcamento: number,
        public descricao: string,
        public ativo: boolean
    ) { }

    public static transformStatus(projetoStatus: string): string {
        switch (projetoStatus) {
            case 'EM_ANDAMENTO':
                return 'Em andamento'
            case 'FINALIZADO':
                return 'Finalizado'
            case 'PARADO':
                return 'Parado'
            case 'CANCELADO':
                return 'Cancelado'
            default:
                return ''
        }
    }

    public static hasDataFinal(projeto: Projeto): boolean {
        return projeto.dataFinal !== null
    }
}

export const STATUS = [
    {label: Projeto.transformStatus('EM_ANDAMENTO'), value: 'EM_ANDAMENTO'},
    {label: Projeto.transformStatus('FINALIZADO'), value: 'FINALIZADO'},
    {label: Projeto.transformStatus('PARADO'), value: 'PARADO'},
    {label: Projeto.transformStatus('CANCELADO'), value: 'CANCELADO'}
]