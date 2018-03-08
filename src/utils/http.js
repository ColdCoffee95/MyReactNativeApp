const baseUrl = 'http://192.168.41.78:9010/api'
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
            .then((response) => {
                callback(response)
            })
            .catch((error) => {
                alert(error)
            });
    }

    static post(url, params, callback) {
        fetch(baseUrl + url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                callback(responseJSON)
            })
            .catch((error) => {
                console.log("error = " + error)
            });
    }
}