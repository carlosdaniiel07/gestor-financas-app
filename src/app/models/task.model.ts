import * as moment from 'moment'

export interface Task {
    id: number,
    nome: string,
    origem: string,
    dataExecucao: string,
    obs: string,
    executado: boolean
}

export const sortByDataExecucaoDesc = (a: Task, b: Task) => {
    let aData = moment(a.dataExecucao, 'DD/MM/YYYY')
    let bData = moment(b.dataExecucao, 'DD/MM/YYYY')

    return aData.isAfter(bData) ? 1 : -1
}
