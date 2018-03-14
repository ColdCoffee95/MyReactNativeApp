const baseUrl = 'http://192.168.41.78:9003/api';
const successCode = 10000;
export default class HttpUtils {

    static get(url, params, callback) {
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        //fetch请求
        fetch(baseUrl + url, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                callback(responseJSON)
            })
            .catch((error) => {
                console.error(error)
            });
    }

    static post(url, params, callback) {
        fetch(baseUrl + url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'isValidate': 1,
                'token': storage.load({key: 'loginState'}).then(res => res.token) || '',
                'memberId': storage.load({key: 'loginState'}).then(res => res.memberId) || '',
            },
            body: JSON.stringify(params)
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                switch (responseJSON.code) {
                    case successCode:
                        callback(responseJSON);
                        break;
                    default:
                        alert(responseJSON.message)
                }
            })
            .catch((error) => {
                console.error("error = " + error)
            });
    }
}