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
        fetch(serverUrl + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'isValidate': userInfo.authentication == 1 ? 1 : 0,
                'token': loginState.token || '',
                'memberId': loginState.memberId || '',
                'version':global.version,
                'platform':global.platform
            },
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
                console.error(error)
            });
    }

    static async post(url, params, callback) {
        let loginState = await this.getLoginState();
        let userInfo = await this.getUserInfo();
        fetch(serverUrl + url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'isValidate': userInfo.authentication == 1 ? 1 : 0,
                'token': loginState.token || '',
                'memberId': loginState.memberId || '',
                'version':global.version,
                'platform':global.platform
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