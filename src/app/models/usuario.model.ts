export class Usuario {
    constructor(
        public id: number,
        public nome: string,
        public login: string,
        public senha: string,
        public email: string,
        public tipo: string,
        public ativo: boolean
    ) 
    {}

    public static transformTipo(tipo: string): string {
        switch(tipo) {
            case 'USUARIO':
                return 'Usuário comum'
            case 'ADM':
                return 'Administrador'
            default:
                return ''
        }
    }
}