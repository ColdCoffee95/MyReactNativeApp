const baseUrl = 'http://api.metchange.com/api';
const successCode = 10000;
export default class HttpUtils {
    static getLoginState() {
        return new Promise((resolve,reject)=>{
            storage.load({key: 'loginState'}).then(res => {
                resolve(res);
            }).catch(e => {
                if(e.name == 'NotFoundError'){
                    resolve({})
                }
            })
        })


    }

    static getUserInfo() {
        return new Promise((resolve,reject)=>{
            storage.load({key: 'userInfo'}).then(res => {
                resolve(res);
            }).catch(e => {
                if(e.name == 'NotFoundError'){
                    resolve({})
                }
            })
        })
    }

    static async get(url, params, callback) {
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
        let loginState = await this.getLoginState();
        let userInfo = await this.getUserInfo();
        //fetch请求
        fetch(baseUrl + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'isValidate': userInfo.authentication == 1 ? 1 : 0,
                'token': loginState.token || '',
                'memberId': loginState.memberId || '',
            },
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                callback(responseJSON)
            })
            .catch((error) => {
                console.error(error)
            });
    }

    static async post(url, params, callback) {
        await fetch(baseUrl + url, {
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