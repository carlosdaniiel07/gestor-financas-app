export const APP_CONFIG  = {
    //apiUrl: 'https://api-gestor-financas.herokuapp.com'
    //apiUrl: 'http://localhost:8080'
    apiUrl: 'http://gestor-financas-server.eastus.cloudapp.azure.com:8080/api-gestor-financas',
    externalsApis: {
        hgBrasil: {
            apiUrl: 'https://api.hgbrasil.com/finance',
            localStorageAddress: 'externalsApis-hgBrasil-key',
            key: localStorage.getItem('externalsApis-hgBrasil-key')
        }
    }
}