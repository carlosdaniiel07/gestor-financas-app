import { ModalidadeInvestimento } from './modalidade-investimento.model';
import { Corretora } from './corretora.model';

export interface InvestimentoDTO {
    descricao: string,
    tipo: string,
    dataAplicacao: string,
    dataVencimento: string,
    modalidade: ModalidadeInvestimento,
    corretora: Corretora,
    valorAplicado: number,
    obs: string
}