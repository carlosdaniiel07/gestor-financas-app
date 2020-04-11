export const APP_CONFIG  = {
    apiUrl: 'http://ec2-3-136-235-174.us-east-2.compute.amazonaws.com:8080/api',
    externalsApis: {
        hgBrasil: {
            apiUrl: 'https://api.hgbrasil.com/finance',
            localStorageAddress: 'externalsApis-hgBrasil-key',
            key: localStorage.getItem('externalsApis-hgBrasil-key')
        }
    }
}